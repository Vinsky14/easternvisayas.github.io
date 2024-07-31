import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProvinces } from '@/store/provinces/provinceThunks'

import useMediaQuery from '@mui/material/useMediaQuery'
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  GeoJSON,
  LayersControl,
} from 'react-leaflet'
import Box from '@mui/material/Box'
import WeatherTodayContainer from '../home/weathertoday'
import CurrentMapMarker from './currentmarker'
import basemaps from './basemaps'
import styles from './styles'
import mapstyles from './Map.module.css'
import { REGION_LAT_AND_LNG } from '@/utils/constants'

const coordinates = REGION_LAT_AND_LNG.split(',')
const LAT = 0
const LNG = 1
const position = {
  lat: coordinates[LAT],
  lng: coordinates[LNG],
}

const orderedKeys = ['Barangay', 'Municipality', 'Province', 'Association']

function Map({ data = { villages: [], provincesMunicipalities: [] } }) {
  const [layer, setLayer] = useState({})
  const [municipality, setMunicipality] = useState('')
  const [currentLoc, setCurrentLoc] = useState(null)
  const mapRef = useRef(null)
  const smallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'))

  const ids = useSelector((state) => state.provinces.ids)
  const mounted = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (mounted.current === null && ids.length === 0) {
      mounted.current = true
      dispatch(fetchProvinces())
    }
  }, [dispatch, ids.length])

  // Zoom (fly) to a Marker location
  const flyToLocation = (lat, lon) => {
    const map = mapRef.current

    if (!map) {
      return
    }

    map.flyTo([lat, lon + 4], 10, { duration: 2.5 })
  }

  useEffect(() => {
    const loadLayers = async () => {
      try {
        const geoJsonURL =
          process.env.NEXT_PUBLIC_GEOJSON_URL !== 'default'
            ? process.env.NEXT_PUBLIC_GEOJSON_URL
            : `https://api.mapbox.com/datasets/v1/${process.env.MAPBOX_USERNAME}/${process.env.MAPBOX_DATASET_ID}/features?access_token=${process.env.MAPBOX_API_KEY}`

        // Load and set the GeoJSON layer
        const response = await axios.get(geoJsonURL)
        setLayer(response.data)
      } catch (err) {
        console.error(err.message)
      }
    }

    loadLayers()
  }, [])

  // Set the province associated with the selected municipality
  const selectMunicipalityHandler = (municipality, province) => {
    if (municipality === null && province === null) {
      setMunicipality('')
      setCurrentLoc(null)
    } else {
      const record = data.villages.find(
        (item) =>
          item.municipality === municipality && item.province === province,
      )

      if (record !== undefined) {
        const province = record.province
        /* eslint-disable no-unused-vars */
        setMunicipality((prev) => province)
        setCurrentLoc(record)
        flyToLocation(record.lat, record.lon)
      } else {
        setMunicipality('')
        setCurrentLoc(null)
      }
    }
  }

  return (
    <Box
      sx={styles.map}
      style={{ minHeight: smallScreen ? '1300px' : '600px' }}
    >
      <MapContainer
        style={{ height: '100%' }}
        center={position}
        zoom={8}
        maxZoom={12}
        minZoom={8}
        tileSize={512}
        placeholder={<h3>You need JavaScript to render this app.</h3>}
        whenCreated={(map) => {
          mapRef.current = map
        }}
      >
        {/** Basemaps */}
        <LayersControl position="topleft">
          {basemaps.map((map, index) => (
            <LayersControl.BaseLayer
              name={map.name}
              key={`map-${index}`}
              checked={index === 0}
            >
              <TileLayer
                zIndex={0}
                // accessToken={process.env.MAPBOX_API_KEY}
                // id={map.id}
                attribution={map.attribution}
                url={map.url}
              />
            </LayersControl.BaseLayer>
          ))}
        </LayersControl>

        {/** Set Region Provinces GeoJSON */}
        <GeoJSON
          key={Math.random().toString(36).substring(2, 8)}
          municipality={municipality}
          data={layer.features}
          zIndex={1}
          onEachFeature={(feature, layer) => {
            layer.setStyle({
              fillColor:
                feature.properties.ADM2_EN === municipality
                  ? '#ff6a00'
                  : '#ffa666',
              fillOpacity: 1,
              // color: '#db4dff',
              weight: 0,
              fillOpacity: '0.5',
            })
          }}
        />

        {/** Point Markers */}
        {data.villages.map((item, index) => (
          <Marker
            position={[item.lat, item.lon]}
            key={index}
            id={`tooltip-${index}`}
            eventHandlers={{
              mouseover: (e) => {
                if (currentLoc !== null) {
                  setCurrentLoc(null)
                }
              },
              click: (e) => {
                if (currentLoc !== null) {
                  setCurrentLoc(null)
                }
              },
            }}
          >
            <Tooltip className={mapstyles.tooltipCustom} direction="left">
              <table style={{ width: '100%' }} id={`tip-${index}`}>
                <tbody>
                  {orderedKeys.map((info, idx) =>
                    !['lat', 'lon'].includes(info) ? (
                      <tr key={idx}>
                        <td>
                          <b>{info}:</b>
                        </td>
                        <td>{item[info.toLowerCase()]}</td>
                      </tr>
                    ) : (
                      <tr key={idx}></tr>
                    ),
                  )}
                </tbody>
              </table>
            </Tooltip>
          </Marker>
        ))}

        {/** Selected municipality's information label */}
        {!smallScreen && <CurrentMapMarker record={currentLoc} />}
      </MapContainer>

      {/** Weather Today Panel */}
      <WeatherTodayContainer
        record={currentLoc}
        isSmallScreen={smallScreen}
        onSelectMunicipality={selectMunicipalityHandler}
      />
    </Box>
  )
}

export default Map
