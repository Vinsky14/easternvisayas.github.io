import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WeatherToday from './weathertoday'

import {
  municipalitiesReceived,
  municipalityReceived,
} from '@/store/municipalities/municipalitySlice'

import {
  provinceReceived,
  provinceReset,
} from '@/store/provinces/provinceSlice'

import { fetchTendayWeather } from '@/store/weather/tenday/tendayThunks'
import { ADAPTER_STATES } from '@/store/constants'
import { nameToIcon } from '@/components/weather_services/ten_day_forecast/legends_data'

const defaultSelectOptions = {
  sel_municipality: null,
  sel_province: '',
  loading: true,
  error: '',
}
const defaultWeather = {
  icon: 'https://openweathermap.org/img/wn/10d@2x.png',
  temp: '00',
  pressure: '0000 hPa',
  humidity: '0%',
  wind: '00 meter/sec',
}

function WeatherTodayContainer({
  record,
  isSmallScreen,
  onSelectMunicipality,
}) {
  const [sel_options, setSelOptions] = useState(defaultSelectOptions)
  const [weather, setWeather] = useState(defaultWeather)
  const [forecast, setForecastData] = useState([])

  const [pageInitialized, setPageInitialized] = useState(false)

  const dispatch = useDispatch()

  const {
    ids: provinceIds,
    entities: provinces,
    municipalities,
    province,
  } = useSelector((state) => {
    return state.provinces
  })

  const { municipality } = useSelector((state) => {
    return state.municipalities
  })

  const {
    ids: tenIds,
    entities: tendayweather,
    status: tenStatus,
  } = useSelector((state) => state.tendayweather)

  useEffect(() => {
    dispatch(municipalityReceived(null))
  }, [dispatch])

  useEffect(() => {
    if (provinceIds.length > 0) {
      dispatch(provinceReceived(Object.values(provinces)[0]))
      dispatch(fetchTendayWeather(Object.values(provinces)[0].label))
        .unwrap()
        .then(() => {
          setPageInitialized(true)
        })
    }
  }, [dispatch, provinceIds, provinces])

  useEffect(() => {
    // Build the municipalities list from the 10-day weather data's municipalities
    if (
      tenIds.length > 0 &&
      tenStatus === ADAPTER_STATES.FULLFILLED &&
      pageInitialized &&
      province !== null
    ) {
      let currentMuni = null

      if (municipality) {
        currentMuni = municipality
      } else {
        const provinceName = Object.keys(municipalities).find(
          (item) => item === province.label,
        )

        if (provinceName) {
          if (municipalities[provinceName].length > 0) {
            currentMuni = municipalities[provinceName][0]
          }
        }
      }

      dispatch(municipalitiesReceived(municipalities[province.label] || []))
      dispatch(municipalityReceived(currentMuni))
    }
  }, [
    dispatch,
    tenIds,
    tendayweather,
    tenStatus,
    pageInitialized,
    municipality,
    municipalities,
    province,
  ])

  useEffect(() => {
    // Build the weather data format for the daily cards
    if (municipality !== null && pageInitialized) {
      setSelOptions((prev) => ({
        ...prev,
        sel_province: province,
        sel_municipality: municipality,
      }))
    }
  }, [
    dispatch,
    municipality,
    province,
    tendayweather,
    tenStatus,
    pageInitialized,
  ])

  // Process and format the fetched municipality 10-day weather info
  useEffect(() => {
    if (
      tenStatus === ADAPTER_STATES.FULLFILLED &&
      sel_options.sel_municipality !== null &&
      forecast.length === 0
    ) {
      try {
        onSelectMunicipality(
          sel_options.sel_municipality.label,
          sel_options.sel_province.label,
        )

        const municipalityWeather = Object.values(tendayweather).find(
          (record) =>
            record.municipality === sel_options.sel_municipality.label,
        )

        if (municipalityWeather) {
          const response = JSON.parse(municipalityWeather.data)

          const icon =
            nameToIcon.rainfall[response[0].rainfall] !== undefined
              ? `images/icons/weather/${
                  nameToIcon.rainfall[response[0].rainfall]
                }`
              : 'images/icons/weather/blank_weather.png'

          // Format the selected municipality's current (today) weather data
          const dateNow = new Date().toDateString()
          const mNowDay = response.find(
            (day) =>
              day.day_format === dateNow.substring(0, dateNow.length - 5),
          )
          const todayData = mNowDay || response[0]

          const today = {
            icon,
            temp: Math.round(todayData.tmean),
            precipitation: null,
            humidity: `${nearestHundredths(todayData.humidity)}%`,
            datenow: dateNow,
            wind: `${nearestHundredths(todayData.wspeed)} mps`,
            description: `${toCamelCase(todayData.rainfall)}, ${toCamelCase(
              todayData.cover,
            )}`,
          }

          // Format the selected municipality's 7-day weather forecast data
          const dailies = []

          response.forEach((item) => {
            const date = new Date(
              `${item.day_format}, ${new Date().getFullYear()}`,
            )
            const obj = {
              day: item.day_format,
              wind_speed: nearestHundredths(item.wspeed),
              temp_mean: nearestHundredths(item.tmean),
              icon:
                item.rainfall !== undefined
                  ? `images/icons/weather/${nameToIcon.rainfall[item.rainfall]}`
                  : 'images/icons/weather/blank_weather.png',
              date: date.toLocaleDateString('en-US'),
              description: '',
            }

            dailies.push(obj)
          })

          setWeather(today)
          setForecastData(dailies)
          setSelOptions((prev) => ({ ...prev, loading: false, error: '' }))
        }
      } catch (err) {
        setSelOptions((prev) => ({
          ...prev,
          loading: false,
          error: err.message,
        }))
      }
    }
  }, [
    tenStatus,
    tendayweather,
    provinces,
    forecast,
    sel_options.sel_municipality,
    sel_options.sel_province.label,
    onSelectMunicipality,
  ])

  // Fetch a municipality's current weather data and 7-day weather forecast
  const fetchWeatherData = useCallback(
    async (municipality, currentProvince) => {
      const _municipalities = municipalities[currentProvince.label]

      const record = _municipalities.find((x) => x.label === municipality)

      if (record === undefined) {
        return
      }

      setForecastData([])

      setSelOptions({
        ...sel_options,
        sel_municipality: record,
        sel_province: currentProvince,
        loading: true,
        error: '',
      })
      dispatch(fetchTendayWeather(currentProvince.label))
    },
    [municipalities, sel_options, dispatch],
  )

  const handleItemChange = async (e, newValue) => {
    const { label, from } = newValue

    if (label) {
      switch (from) {
        case 'province':
          dispatch(provinceReceived(newValue))
          dispatch(fetchTendayWeather(label))
          dispatch(municipalitiesReceived([]))
          break
        case 'municipality':
          dispatch(
            municipalityReceived({
              id: newValue.id,
              label: newValue.label,
              iscalendar: newValue.iscalendar,
            }),
          )

          if (newValue.id === undefined) {
            setSelOptions({
              ...sel_options,
              sel_municipality: null,
              loading: false,
            })
            setWeather(defaultWeather)
            setForecastData([])
            onSelectMunicipality(null)
            return
          }

          fetchWeatherData(newValue.label, newValue?.province)
          break
        default:
          break
      }
    } else {
      switch (from) {
        case 'province':
          dispatch(provinceReset())
          dispatch(municipalitiesReceived([]))
          break
        case 'municipality':
          dispatch(municipalityReceived(null))
          break
        default:
          break
      }
    }
  }

  const nearestHundredths = (value) =>
    Math.round((value + Number.EPSILON) * 100) / 100

  const toCamelCase = (string) =>
    string
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')

  return (
    <WeatherToday
      sel_options={sel_options}
      weather={weather}
      forecast={forecast}
      record={record}
      isSmallScreen={isSmallScreen}
      onSelectItemChange={handleItemChange}
    />
  )
}

export default WeatherTodayContainer
