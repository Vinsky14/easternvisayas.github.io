const styles = {
  wrapper: {
    marginTop: (theme) => theme.spacing(8),
    marginBottom: (theme) => theme.spacing(12)
  },
  autoMuni: {
    marginTop: (theme) => theme.spacing(2)
  },
  card: {
    height: {
      xs: 'unset',
      md: '640px !important'
    },
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px !important',
    minHeight: '640px',
    minWidth: {
      xs: '200px',
      sm: '500px'
    },
    marginTop: (theme) => theme.spacing(5),
    padding: (theme) => theme.spacing(2),
    borderRadius: (theme) => theme.spacing(1),
    '& h5, h6': {
      marginBottom: (theme) => theme.spacing(2)
    },
  },
  calendar: {
    width: '100%',
    alignItems: 'center',
    '& .cropcal-cropname': {
      fontSize: {
        xs: '9px !important',
        sm: '12px !important',
        md: 'unset !important'
      },
      whiteSpace: {
        xs: 'unset',
        sm: 'nowrap'
      },
    },
    '& .calendar-header-csystem': {
      fontSize: {
        xs: '12px',
        md: '16px'
      },
      textAlign: 'center',
      '& h6': {
        fontSize: {
          xs: '11px',
          sm: 'unset'
        },
      }
    },
    '& .calendar-header-months': {
      display: 'flex',
      fontSize: {
        xs: '11px',
        md: '1rem'
      },
      '& div': {
        width: '100%',
        textAlign: 'center',
      },
      '& .monthlabels': {
        backgroundColor: '#092139',
        color: '#fff',
        padding: {
          xs: '8px 0 8px 0',
          sm: '8px 8px 8px 8px'
        }
      },
    },
    '& .cal-mo-container': {
      height: '32px',
      display: 'flex',
      '& div': {
        width: '100%',
        textAlign: 'center'
      }
    },
    // '& .cropCalprep': {
    //   backgroundColor: '#ffd966'
    // },
    // '& .cropCalgrow': {
    //   backgroundColor: '#375623'
    // },
    // '& .cropCalharv': {
    //   backgroundColor: '#203764'
    // },
    // '& .cropCalplant': {
    //   backgroundColor: '#a9d08e'
    // },
    // '& .cropCalnocolor, .cropCalbkank': {
    //   backgroundColor: '#f7f7ff'
    // },
    '& .cropCalrice_prep': {
      backgroundColor: '#b9febf'
    },
    '& .cropCalrice_grow': {
      backgroundColor: '#00c311'
    },
    '& .cropCalrice_wean': {
      backgroundColor: '#57ff66'
    },
    '& .cropCalrice_harv': {
      backgroundColor: '#00920d'
    },
    '& .cropCalrice_plant': {
      backgroundColor: '#88ff93'
    },
    '& .cropCalrice_sprout': {
      backgroundColor: '#26ff39'
    },
    '& .cropCalrice_newgen': {
      backgroundColor: '#00f415'
    },
    '& .cropCalcorn_prep': {
      backgroundColor: '#ffffe6'
    },
    '& .cropCalcorn_grow': {
      backgroundColor: '#ffff4d'
    },
    '& .cropCalcorn_wean': {
      backgroundColor: '#ffffb3'
    },
    '& .cropCalcorn_harv': {
      backgroundColor: '#ffff00'
    },
    '& .cropCalcorn_plant': {
      backgroundColor: '#ffffcc'
    },
    '& .cropCalcorn_sprout': {
      backgroundColor: '#ffff99'
    },
    '& .cropCalcorn_newgen': {
      backgroundColor: '#ffff80'
    },
    '& .cropCaleggplant_prep': {
      backgroundColor: '#e1bbd9'
    },
    '& .cropCaleggplant_grow': {
      backgroundColor: '#a84296'
    },
    '& .cropCaleggplant_harv': {
      backgroundColor: '#982286'
    },
    '& .cropCaleggplant_sprout': {
      backgroundColor: '#b862a8'
    },
    '& .cropCaleggplant_plant': {
      backgroundColor: '#cd8ec0'
    },
    '& .cropCalpole_sitaw_prep': {
      backgroundColor: '#b9febf'
    },
    '& .cropCalpole_sitaw_plant': {
      backgroundColor: '#88ff93'
    },
    '& .cropCalpole_sitaw_newgen': {
      backgroundColor: '#57ff66'
    },
    '& .cropCalpole_sitaw_sprout': {
      backgroundColor: '#26ff39'
    },
    '& .cropCalpole_sitaw_grow': {
      backgroundColor: '#00f415'
    },
    '& .cropCalpole_sitaw_harv': {
      backgroundColor: '#00c311'
    },
    '& .cropCalsquash_prep': {
      backgroundColor: '#ffe6cc'
    },
    '& .cropCalsquash_plant': {
      backgroundColor: '#ffcc99'
    },
    '& .cropCalsquash_newgen': {
      backgroundColor: '#ffb366'
    },
    '& .cropCalsquash_sprout': {
      backgroundColor: '#ffa64d'
    },
    '& .cropCalsquash_grow': {
      backgroundColor: '#ff9933'
    },
    '& .cropCalsquash_harv': {
      backgroundColor: '#ff8000'
    },
    '& .cropCalampalaya_prep': {
      backgroundColor: '#d9f2e6'
    },
    '& .cropCalampalaya_plant': {
      backgroundColor: '#c6ecd9'
    },
    '& .cropCalampalaya_newgen': {
      backgroundColor: '#b3e6cc'
    },
    '& .cropCalampalaya_sprout': {
      backgroundColor: '#9fdfbf'
    },
    '& .cropCalampalaya_grow': {
      backgroundColor: '#8cd9b3'
    },
    '& .cropCalampalaya_harv': {
      backgroundColor: '#79d2a6'
    },
    '& .cropCalnocolor, .cropCalblank': {
      backgroundColor: '#f7f7ff'
    },
    cellBorderColor: {
      // 'cropCalprep': '#ffd966',
      // 'cropCalgrow': '#375623',
      // 'cropCalharv': '#203764',
      // 'cropCalplant': '#a9d08e',
      // 'cropCalnocolor': '#f7f7ff',
      // 'cropCalbkank': 'rgba(0, 0, 0, 0.4)'

      'cropCalnocolor': '#f7f7ff',
      'cropCalblank': 'rgba(0, 0, 0, 0.4)',
 
      //rice
      'cropCalrice_prep': '#b9febf',
      'cropCalrice_grow': '#00c311',
      'cropCalrice_harv': '#00920d',
      'cropCalrice_plant': '#88ff93',
      'cropCalrice_sprout': '#26ff39',
      'cropCalrice_newgen': '#00f415',
      'cropCalrice_wean': '#57ff66',

      //corn
      'cropCalcorn_prep': '#ffffe6',
      'cropCalcorn_grow': '#ffff4d',
      'cropCalcorn_harv': '#ffff00',
      'cropCalcorn_plant': '#ffffcc',
      'cropCalcorn_sprout': '#ffff99',
      'cropCalcorn_newgen': '#ffff80',
      'cropCalcorn_wean': '#ffffb3',

       //eggplant
       'cropCaleggplant_prep': '#e1bbd9',
       'cropCaleggplant_grow': '#a84296',
       'cropCaleggplant_harv': '#982286',
       'cropCaleggplant_sprout': '#b862a8',
       'cropCaleggplant_plant': '#cd8ec0',

       //pole sitaw
       'cropCalpole_sitaw_prep': '#b9febf',
       'cropCalpole_sitaw_plant': '#88ff93',
       'cropCalpole_sitaw_newgen': '#57ff66',
       'cropCalpole_sitaw_sprout': '#26ff39',
       'cropCalpole_sitaw_grow': '#00f415',
       'cropCalpole_sitaw_harv': '#00c311',

       //squash
       'cropCalsquash_prep': '#ffe6cc',
       'cropCalsquash_plant': '#ffcc99',
       'cropCalsquash_newgen': '#ffb366',
       'cropCalsquash_sprout': '#ffa64d',
       'cropCalsquash_grow': '#ff9933',
       'cropCalsquash_harv': '#ff8000',

       //ampalaya
       'cropCalampalaya_prep': '#d9f2e6',
       'cropCalampalaya_plant': '#c6ecd9',
       'cropCalampalaya_newgen': '#b3e6cc',
       'cropCalampalaya_sprout': '#9fdfbf',
       'cropCalampalaya_grow': '#8cd9b3',
       'cropCalampalaya_harv': '#79d2a6',
    }
  },
  legend: {

    '& ul': {
      listStyle: 'none',
      '& li': {
        marginRight: '10px',
        fontSize: '14px'
      },
      'span': {
        border: '1px solid #ccc',
        float: 'left',
        width: '12px',
        height: '12px',
        margin: '4px',
      }
    }
  },
  errorMsg: {
    fontSize: '12px'
  },
  infoMsg: {
    fontSize: '12px'
  }
}

export default styles
