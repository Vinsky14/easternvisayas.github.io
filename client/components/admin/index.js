import Typography from '@mui/material/Typography'
import Link from 'next/link'

function Admin () {
  return (
    <div>
      <Typography variant='h4'>Get Started</Typography>
      <p>Welcome to ACAP Admin, a set of administrative pages used for updating BACAP&apos;s data-specific content. All data updates made within the admin site will be made available for use by ACAP Admins during reports creation on the <strong>Create Bulletins</strong> page.</p>
      <p>The finalized (uploaded) PDF reports will be available for public download on BACAP&apos;s <Link href='/bulletins' passHref><strong>Bulletins</strong></Link> downloads page.</p>

      <br />

      <Typography variant='h5'>Crop Recommendations</Typography>
      <p>This page will allow admins to generate 10-Day and Seasonal <u>crops bulletins</u> for preview, with an option to upload the generated bulletins as PDF for site-wide public download.</p>

      <Typography variant='h5'>Risks Recommendations</Typography>
      <p>This page will allow admins to generate 10-Day and Seasonal <u>climate risks bulletins</u> for preview, with an option to upload the generated bulletins as PDF for site-wide public download.</p>

      <Typography variant='h5'>ACAP Settings</Typography>
      <p>The ACAP Services page will allow admins to manually encode weather data (with references to PAGASA&apos;s forecast website), which will be used by other admins during reports creation on <strong>Create Bulletins.</strong></p>

      <Typography variant='h5'>Profile</Typography>
      <p>Signed-in user information can be viewed on the Profile page.</p>
    </div>
  )
}

export default Admin
