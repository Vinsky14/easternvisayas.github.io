import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material/'
import styles from './styles'
import _ from 'lodash'

import AddContact from './create'
import ViewContact from './view'
import SimpleSnackbar from '@/common/ui/snackbar'

function Phonebook({
  handleAddContact,
  handleDeleteContact,
  handleEditContact,
  loading,
  loadingButton,
  open,
  originalContacts,
  setOpen,
  regions,
  province,
  setProvince,
  municipality,
  setMunicipality
}) {
  const [contact, setContact] = useState(null)
  const [contacts, setContacts] = useState(originalContacts)
  const [isSearchKeywordNaN, setIsSearchKeywordNaN] = useState(false)
  const [globalSearchKeyword, setGlobalSearchKeyword] = useState('')
  const [addContactOpen, setAddContactOpen] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarDetails, setSnackbarDetails] = useState({})

  // Listen for updates to the original contacts list
  useEffect(() => {
    setContacts(originalContacts)
  }, [originalContacts])

  const handleOpenAddContact = () => {
    // This for opening the AddContact modal
    setAddContactOpen(true)
    setProvince('')
    setMunicipality('')
  }

  const handleClick = (contact) => {
    // This is for opening ViewContact modal
    setOpenSnackbar(false)
    setSnackbarDetails({})
    setOpen(true)
    setContact(contact)
  }

  const handleClose = () => {
    // This is for closing ViewContact modal
    setOpen(false)
    setContact(null)
  }

  // Got this flowFilter from: https://stackoverflow.com/a/38762060/9352807
  function flowFilter(array, substr) {
    return _.filter(
      array,
      _.flow(
        _.identity,
        _.values,
        _.join,
        _.toLower,
        _.partialRight(_.includes, substr)
      )
    )
  }

  const handleSearch = (event) => {
    const searchKeyword = event.target.value

    /**
     * This globalSearchKeyword is just acting as a flag for the
     * 'secondary' prop of ListItemText
     */
    setGlobalSearchKeyword(searchKeyword)

    /**
     * This is for when the user types in the search bar a number (but actually
     * is a string), the secondary text will be shown indicating the cell
     * number of the contact. But if the user only types in the search
     * bar a string, only the filtered names will be shown.
     *
     */
    const isNaNSearchKeyword = isNaN(searchKeyword)

    setIsSearchKeywordNaN(isNaNSearchKeyword)

    if (event.target.value === '') setContacts(originalContacts)
    else {
      const filteredContacts = flowFilter(contacts, searchKeyword)
      setContacts(filteredContacts)
    }
  }

  const handleCloseAddContact = () => {
    // This for closing the AddContact modal
    setAddContactOpen(false)
  }

  return (
    <div>
      {openSnackbar && Object.entries(snackbarDetails).length > 0 && (
        <SimpleSnackbar
          openSnackbar={true}
          message={snackbarDetails.message}
          severity={snackbarDetails.severity}
        />
      )}
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddContact}
        >
          ADD CONTACT
        </Button>
        <AddContact
          contacts={originalContacts}
          open={addContactOpen}
          handleClose={handleCloseAddContact}
          handleAddContact={handleAddContact}
          loadingButton={loadingButton}
          regions={regions}
          province={province}
          setProvince={setProvince}
          municipality={municipality}
          setMunicipality={setMunicipality}
        />
      </>
      <br />
      <br />
      <div>
        {loading ? (
          'Updating List...'
        ) : (
          <Box sx={styles.phonebookContainer}>
            <Box sx={styles.searchPhonebookTextField}>
              <TextField
                id="outlined-basic"
                label="Search..."
                onChange={handleSearch}
                variant="outlined"
                size="small"
                style={{ width: '100%' }}
              />
            </Box>
            <br />
            <br />
            <List>
              {contacts?.length > 0 ? (
                contacts.map((contact) => {
                  const labelId = `checkbox-list-label-${contact.cellnumber}`

                  return (
                    <ListItem key={contact.cellnumber} disablePadding>
                      <ListItemButton
                        role={undefined}
                        dense
                        onClick={() => handleClick(contact)}
                      >
                        <ListItemText
                          id={labelId}
                          primary={
                            contact.name === ''
                              ? contact.cellnumber
                              : contact.name
                          }
                          secondary={
                            globalSearchKeyword !== '' &&
                            !isSearchKeywordNaN &&
                            contact.name !== '' &&
                            contact.cellnumber
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  )
                })
              ) : (
                <Container>
                  <p>No Results</p>
                </Container>
              )}
            </List>

            {contact && (
              <ViewContact
                contact={contact}
                contacts={contacts}
                handleClose={handleClose}
                handleDeleteContact={handleDeleteContact}
                handleEditContact={handleEditContact}
                loadingButton={loadingButton}
                open={open}
                regions={regions}
              />
            )}
          </Box>
        )}
      </div>
    </div>
  )
}

export default Phonebook
