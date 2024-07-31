const styles = {
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px !important',
    minWidth: {
      xs: '200px',
      sm: '380px'
    },
    maxWidth: '380px',
    marginTop: (theme) => theme.spacing(3),
    padding: (theme) => theme.spacing(2),
    borderRadius: (theme) => theme.spacing(1),
    '& h5': {
      marginBottom: (theme) => theme.spacing(2),
      fontSize: '18px'
    },
    '& h6': {
      fontSize: '16px'
    },
    '& .span-source': {
      '& a': {
        color: theme => theme.palette.primary.main,
        textDecoration: 'none'
      },
      '& a:hover': {
        color: theme => theme.palette.third.main
      }
    }
  },
  cardInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px !important',
    width: '100%',
    maxWidth: '490px',
    padding: (theme) => theme.spacing(1),
    marginTop: (theme) => theme.spacing(3),
    fontSize: {
      xs: '11px',
      sm: '14px'
    },
    '& td': {
      padding: {
        xs: 0,
        xs: '1px'
      }
    }
  },
  autocomplete: {
    maxWidth: '100%',
    marginTop: (theme) => theme.spacing(1)
  },
  weathertoday: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '10px',
    flexDirection: {
      xs: 'column',
      b4xs: 'row',
      sm: 'row'
    },
    '& .icon-temp': {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    '& .temperature': {
      fontSize: '30px',
      fontWeight: 'bold'
    },
    '& .weather-details': {
      paddingTop: '12px',
      marginLeft: '16px',
      fontSize: '10px'
    }
  },
  info: {
    minWidth: '285px',
    minHeight: '90px',
    padding: (theme) => theme.spacing(2),
    marginTop: (theme) => theme.spacing(2),
    textAlign: 'center',
    '& p': {
      color: 'red',
      fontSize: '12px'
    }
  }
}

export default styles
