import { useState, useEffect } from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import styles from './styles'

function MenuItem (props) {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const { href, query = '', name, id, active, subitems = [], layout = 'horizontal', searchopts = false } = props
  const { isParent = false, isNavItem = true, IconMain = null, IconSub = null, onItemClick } = props

  useEffect(() => {
    const resizeSubHeaders = () => setAnchorElNav(null)
    window.addEventListener('resize', resizeSubHeaders)
    return () => {
      window.addEventListener('resize', resizeSubHeaders)
    }
  }, [])

  // Display the small-screen main navigation menu
  const handleOpenMenu = (e) => {
    setAnchorElNav(e.currentTarget)
  }

  // Close the Small screens main naviation menu
  const handleCloseMenu = (e, id) => {
    setAnchorElNav(null)
    onItemClick(e, id, subitems.length > 0)
  }

  return (
    <div style={{ display: (searchopts) ? 'none' : 'block' }}>
      <Button
        color='inherit'
        id={id}
        sx={(active
          ? (isNavItem ? styles.buttonSelectedNav : styles.buttonSelectedSide)
          : (isNavItem ? styles.button : styles.buttonSide))}
        style={styles.dropMainButton}
        onClick={(e) => onItemClick(e, id, subitems.length === 0)}
      >
        {isParent
          ? <div style={{ width: '100%' }}>
            <span onClick={(e) => handleOpenMenu(e)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              {name}
              {IconMain !== null && <IconMain />}
            </span>
            {/** Dropdown Menu if main item isParent (has sub-items) */}
            <Menu
              id='submenu-item'
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseMenu}
              MenuListProps={{ onMouseLeave: handleCloseMenu }}
              sx={styles.menuContainerRegular}
            >
              {subitems.map((item, index) => (
                <Button
                  color='inherit'
                  id={id}
                  sx={(active ? styles.subButtonSelected : styles.button)}
                  style={{ display: 'flex', displayDirection: (layout==='horizontal' ? 'row' : 'column') }}
                  key={`sub-${item.href}-${index}`}
                  onClick={(e) => handleCloseMenu(e, id, subitems.length === 0)}
                >
                  <Link href={`${item.href}/#${item.query}`} query={item.query} passHref>
                    <a style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      {item.name}
                      {IconSub !== null && <IconSub sx={{ height: 16 }} />}
                    </a>
                  </Link>
                </Button>
              ))}
            </Menu>
            </div>
          : <Link href={href} query={query}>{name}</Link>
        }
      </Button>
    </div>
  )
}

export default MenuItem
