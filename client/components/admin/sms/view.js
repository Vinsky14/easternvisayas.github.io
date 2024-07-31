import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  // TextField,
  Typography,
} from '@mui/material/'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
// import { DataGrid } from '@mui/x-data-grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router'
import { sendSMS } from '@/services/sms'
import LoadingDocument from '@/common/ui/loadingdocument'
import EmptyState from '@/common/ui/empty_state'
import ModalDialogWrapper from '@/common/ui/modal'
import { REPORT_TITLE } from '@/utils/constants/app'
import { REPORT } from '@/hooks/reports/constants'
import styles from './styles'
import stylesReport from '@/domain/admin/bulletins/report/styles'

import useReportFields from '@/hooks/reports/usereportfields'

import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme()

theme.typography.h5 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
}

function ViewSendSMS({ contacts, contactsState, onBackBtnClick, report, setReport, loading }) {
  // console.log('contacts:', contacts)
  const [groupedContacts, setGroupedContacts] = useState(null)
  const [value, setValue] = useState(null)
  const [contactIds, setContactIds] = useState([])
  const router = useRouter()

  const { fieldValues } = useReportFields(
    report,
    [REPORT.REGION, REPORT.TYPE, REPORT.UID, REPORT.ID]
  )

  useEffect(() => {
    if (contacts.length !== 0) {
      groupContacts(contacts)
    }
  }, [contacts])

  const handleSelectProvince = (event) => {
    setValue(event.target.value)
    const numbersOnly = groupedContacts[event.target.value].contacts.map((item) => (item.cellnumber))
    setContactIds(numbersOnly)
  }

  const groupContacts = (contacts) => {
    const data = contacts.reduce((provinceList, contact) => {
      if (provinceList[contact.municipality] === undefined) {
        provinceList[contact.municipality] = {
          contacts: [],
          province: contact.province
        }
      }

      provinceList[contact.municipality].contacts.push(contact)
      return { ...provinceList }
    }, {})

    setGroupedContacts(data)
  }

  const isScreenSizeBetweenXSandMD = useMediaQuery(
    theme.breakpoints.between('xs', 'md')
  )

  const handleSend = async () => {
    if (report.info === '') {
      setReport({ ...report, sending: true })
      let recipientsNumber = []
      let recipientsWithName = []
      contactIds.map((contactId) => {
        const contact = contacts.find((_contact) => _contact.id === contactId)
        if (contact) {
          recipientsNumber.push(contact.cellnumber)
          recipientsWithName.push(
            contact.name === '' ? contact.cellnumber : contact.name
          )
        } else {
          recipientsNumber.push(contactId)
        }
      })

      try {
        await sendSMS({
          docId: report.id,
          recipientsNumber: recipientsNumber.toString(),
          message: report.smsRecommendations,
          currentSmsLogs: report?.logs ? report.logs : [],
          recipientsWithName: recipientsWithName.toString(),
        })

        setReport((prev) => ({
          ...prev,
          sending: false,
          info: 'Crop Recommendation sent.',
        }))
      } catch (err) {
        router.push(
          {
            pathname: '/admin/sms/',
            query: { isSent: false },
          },
          '/admin/sms/'
        )
        console.error(err.message)
      }
    } else {
      router.push({
        pathname: '/admin/sms/',
      })
    }
  }

  const handleAddContactsToPhonebook = () => {
    router.push(
      {
        pathname: '/admin/sms/',
        query: { toAddContact: true },
      },
      '/admin/sms/'
    )
  }

  return (
    <div>
      {loading || report.loading ? (
        <LoadingDocument />
      ) : report.stages !== undefined ? (
        <Box container sx={styles.container}>
          <Box
            sx={{
              marginBottom: '32px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <ThemeProvider theme={theme}>
              <Box>
                <Typography variant="h5">
                  Send Text-Form Crop Recommendation
                </Typography>
                <Typography variant='h6'>
                  {REPORT_TITLE[report.type]}
                </Typography>
              </Box>
            </ThemeProvider>

            <ButtonGroup
              orientation={
                isScreenSizeBetweenXSandMD ? 'vertical' : 'horizontal'
              }
            >
              <Button
                disableElevation
                variant="outlined"
                color="primary"
                sx={{
                  ...styles.button,
                  color: theme => theme.palette.primary.main,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0
                }}
                onClick={onBackBtnClick}
              >
                Back
              </Button>
              <ModalDialogWrapper
                isDisabled={
                  contactIds.length === 0 ||
                  report?.smsRecommendations === undefined
                }
                isOpen={false}
                maxWidth="sm"
                openButtonText="Send"
                title="Send Crop Recommendation"
                contentText={
                  report.info !== ''
                    ? report.info
                    : 'Sending this allows your contacts to receive the Text-Form Crop Recommendation on their cellphone numbers as text.'
                }
                confirmBtnText={report.info !== '' ? 'Ok' : 'Send'}
                modalConfirmHandlerCB={handleSend}
                loading={report.sending}
                modalButtonStyles={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, width: '80px' }}
              />
            </ButtonGroup>
          </Box>
          <div>
            <Box sx={stylesReport.details}>
              {fieldValues.map((item) => (
                <div key={item.id}>
                <Typography variant="body2">
                  <strong>{item?.label}: </strong> {item?.value ?? '-'}
                </Typography>
                </div>
              ))}
              <Typography variant="caption">
                <strong>ID:</strong> {report.id}
              </Typography>
            </Box>
            <Divider sx={{ marginTop: '32px' }} />
          </div>

          <Grid container style={{ paddingTop: '10px' }}>
            <Grid item xs={12} md={5}>
              <Typography variant="h6">
                Text-Form Crop Recommendation
              </Typography>
              <Container>
                {report?.smsRecommendations || (
                  <span style={{ color: '#ff1744' }}>
                    No SMS Recommendations available.
                  </span>
                )}
              </Container>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="h6">List of Contacts</Typography>
              {contactsState.loading
                ? <div>Loading phonebook...</div>
                : contactsState.error !== ''
                  ? <div>{contactsState.error}</div>
                  : contacts.length > 0 ? (
                <div>
                  <Box>
                    <Typography variant="body2">
                      These are your contacts that you can send the
                      recommendation thru SMS.
                      <br />
                      Need to change some of your contacts? Click{' '}
                      <span
                        onClick={handleAddContactsToPhonebook}
                        style={styles.customizedButtonLink}
                      >
                        here
                      </span>
                      .
                    </Typography>
                  </Box>
                  <div
                    style={{
                      height: '400px',
                      width: '100%',
                      paddingTop: '50px',
                    }}
                  >
                    <FormControl>
                      <FormLabel id="demo-controlled-radio-buttons-group">Select Province for Text Blasting</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleSelectProvince}
                      >
                        {Object.keys(groupedContacts)?.length > 0 ?
                          <div>
                            {Object.keys(groupedContacts).sort().map((item) => {
                              return <FormControlLabel key={item} value={item} control={<Radio />} label={`${item}, ${groupedContacts[item].province}`} />
                            })}
                          </div>
                          : null
                        }
                      </RadioGroup>
                    </FormControl>

                  </div>
                </div>
              ) : (
                <div>
                  <Typography variant="subtitle1">
                    No contacts yet. Please add contacts first in your
                    Phonebook&nbsp;
                    <span
                      onClick={handleAddContactsToPhonebook}
                      style={styles.customizedButtonLink}
                    >
                      here
                    </span>
                    .
                  </Typography>
                </div>
              )}
            </Grid>
          </Grid>
        </Box>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}

export default ViewSendSMS
