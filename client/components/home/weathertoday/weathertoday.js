import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DailyWeather from '../daily'
import CaptionText from '@/components/common/ui/captiontext'
import { imageLoader } from '@/utils/img-loader'
import styles from './styles'

import { ADAPTER_STATES } from '@/store/constants'

function WeatherToday({
  sel_options,
  weather,
  forecast,
  record,
  isSmallScreen = false,
  onSelectItemChange,
}) {
  const [rightMargin, setRightMargin] = useState(0)
  const orderedKeys = ['Barangay', 'Municipality', 'Province', 'Association']

  const provinces = useSelector((state) => state.provinces)
  const municipalities = useSelector((state) => state.municipalities)
  const tendayweather = useSelector((state) => state.tendayweather)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getRightMargin = () =>
      (window.innerWidth - getViewportWidth()) / 2 + 24
    const resize = () => setRightMargin(getRightMargin())
    resize()

    // Set the right margin on window resize
    window.addEventListener('resize', resize)

    // Prevent state updates if the component was unmounted
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  const getViewportWidth = () => {
    // Main content area reference with. mui maxWidth = 1200
    const headerContents = document.getElementById('header-contents')

    if (!headerContents) {
      // Default MUI maxWidth for ACAP
      return 1200
    } else {
      const stats = headerContents.getBoundingClientRect()
      return stats.width
    }
  }

  useEffect(() => {
    const isLoading =
      provinces.status !== ADAPTER_STATES.FULLFILLED ||
      tendayweather.status !== ADAPTER_STATES.FULLFILLED

    setLoading(isLoading)
  }, [
    provinces.status,
    tendayweather.status,
    provinces.error,
    tendayweather.error,
  ])

  return (
    <Box
      sx={{
        position: 'absolute',
        top: (theme) => theme.constants.navbar.outerHeight - 35,
        right: rightMargin,
        marginLeft: '24px',
        zIndex: 400,
      }}
      className="mui-fixed"
    >
      {/** Municipality selector menu */}
      <Card
        variant="outlined"
        sx={styles.card}
        style={{ backgroundColor: 'rgba(139, 195, 74, 0.5)' }}
      >
        <Box>
          <Typography variant="h5"> Eastern Visayas Region Weather Today</Typography>
          <Autocomplete
            disablePortal
            id="province"
            value={provinces.province}
            disabled={provinces.ids.length === 0 || loading}
            options={Object.values(provinces.entities)}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  provinces.province === null ? 'Select a province' : 'Province'
                }
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            onChange={(e, newValue) =>
              onSelectItemChange(e, { ...newValue, from: 'province' })
            }
          />

          <br />

          <Autocomplete
            disablePortal
            id="municipality"
            value={municipalities.municipality}
            disabled={municipalities.ids.length === 0 || loading}
            options={Object.values(municipalities.entities)}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  municipalities.municipality === null
                    ? 'Select a municipality'
                    : 'Municipality'
                }
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            getOptionDisabled={(option) => {
              return option.iscalendar !== undefined
            }}
            onChange={(e, newValue) =>
              onSelectItemChange(e, {
                ...newValue,
                from: 'municipality',
                province: provinces.province,
              })
            }
          />
        </Box>

        {sel_options.loading && (
          <Box
            sx={styles.info}
            style={{
              minWidth: isSmallScreen ? window.innerWidth - 80 : '285px',
            }}
          >
            <CircularProgress size={24} color="secondary" />
          </Box>
        )}

        {sel_options.error === '' &&
          !sel_options.loading &&
          sel_options.sel_municipality !== null &&
          weather.description !== '' && (
            <Box sx={styles.weathertoday}>
              <div className="icon-temp">
                <Image
                  unoptimized
                  src={weather.icon}
                  height={70}
                  width={70}
                  loader={imageLoader}
                  alt={weather.description}
                />
                <div className="temperature">{weather.temp}&deg;C</div>
              </div>
              <div className="weather-details">
                <div>Date today: {weather.datenow}</div>
                <div>Humidity: {weather.humidity}</div>
                <div>Wind speed: {weather.wind}</div>
                <div>
                  {weather.description
                    ? `${weather.description
                        .charAt(0)
                        .toUpperCase()}${weather.description.slice(1)}`
                    : ''}
                </div>
              </div>
            </Box>
          )}

        {sel_options.error === '' &&
          !sel_options.loading &&
          sel_options.sel_municipality === null && (
            <Box
              sx={styles.info}
              style={{
                minWidth: isSmallScreen ? window.innerWidth - 80 : '285px',
              }}
            >
              <p>&nbsp;</p>
            </Box>
          )}

        {sel_options.error !== '' && (
          <Box
            sx={styles.info}
            style={{
              minWidth: isSmallScreen ? window.innerWidth - 80 : '285px',
            }}
          >
            <p>{sel_options.error}</p>
          </Box>
        )}
      </Card>

      {/** 7-Day (Daily) Weather Forecast overview cards */}
      {forecast.length > 0 && (
        <Card variant="outlined" sx={styles.card} style={{ marginTop: '10px', paddingBottom: '2px' }}>
          <Typography variant="h6">10-Day Rainfall Forecast</Typography>
          <CaptionText sx={{ marginBottom: '16px', fontSize: '11px' }}>
            View the full 10-Day Weather Forecast{' '}
            <Link href="/weather-services">here</Link>.
          </CaptionText>

          <Grid container>
            {forecast.map((item, index) => (
              <Grid item key={`daily-${index}`}>
                <DailyWeather dailyweather={item} />
              </Grid>
            ))}
          </Grid>
          <Typography variant="caption" style={{ fontSize: '10px' }} className="span-source">
            source:{' '}
            <Link href="https://www.pagasa.dost.gov.ph/climate/climate-prediction/10-day-climate-forecast">
              PAGASA&apos;s 10-Day Climate Forecast
            </Link>
          </Typography>
        </Card>
      )}

      {/** Mobile (small screen) CurrentMapMarker */}
      {isSmallScreen && record !== null && (
        <Card variant="outlined" sx={styles.cardInfo}>
          <table>
            <tbody>
              {orderedKeys.map((info, idx) =>
                !['lat', 'lon'].includes(info) ? (
                  <tr key={idx}>
                    <td>
                      <b>{info}:</b>
                    </td>
                    <td>{record[info.toLowerCase()]}</td>
                  </tr>
                ) : (
                  <tr key={idx}></tr>
                ),
              )}
            </tbody>
          </table>
        </Card>
      )}
    </Box>
  )
}

export default WeatherToday
