/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix: define "distDir" when running npm run dev inside Docker using NextJS v12 and NodeJS v16+
  distDir: (process.env.IS_DOCKER) ? 'build' : null,
  reactStrictMode: true,
  trailingSlash: true,
  basePath: (process.env.NODE_ENV === 'production') ? process.env.NEXT_PUBLIC_BASE_PATH : '',
  images: {
    loader: 'custom'
  },
  eslint: {
    dirs: ['common', 'components', 'domain', 'lib', 'pages', 'src']
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    BASE_URL_PROD: process.env.BASE_URL_PROD,
    BASE_API_URL: process.env.BASE_API_URL,
    MAPBOX_USERNAME: process.env.MAPBOX_USERNAME,
    MAPBOX_BASEMAP_STYLE_ID: process.env.MAPBOX_BASEMAP_STYLE_ID,
    MAPBOX_DATASET_ID: process.env.MAPBOX_DATASET_ID,
    MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
    PAGASA_EXCEL_FILE: process.env.PAGASA_EXCEL_FILE,
    CROPPING_CALENDAR_RICE_EXCEL_FILE: process.env.CROPPING_CALENDAR_RICE_EXCEL_FILE,
    CROPPING_CALENDAR_CORN_EXCEL_FILE: process.env.CROPPING_CALENDAR_CORN_EXCEL_FILE,
    RECOMMENDATIONS_RICE_EXCEL_FILE: process.env.RECOMMENDATIONS_RICE_EXCEL_FILE,
    RECOMMENDATIONS_CORN_EXCEL_FILE: process.env.RECOMMENDATIONS_CORN_EXCEL_FILE,
    OPENWEATHERMAP_APPID: process.env.OPENWEATHERMAP_APPID,
    REGION_CODE: process.env.REGION_CODE,
    REGION_NAME: process.env.REGION_NAME,
    REGION_LAT_AND_LNG: process.env.REGION_LAT_AND_LNG,
    REGIONAL_FIELD_OFFICE: process.env.REGIONAL_FIELD_OFFICE,
    REGION_URL: process.env.REGION_URL,
    DEFAULT_PROVINCE: process.env.DEFAULT_PROVINCE,
    DEFAULT_MUNICIPALITY: process.env.DEFAULT_MUNICIPALITY
  }
}

module.exports = nextConfig
