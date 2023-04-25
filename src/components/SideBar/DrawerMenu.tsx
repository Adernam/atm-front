import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Group, Home } from '@mui/icons-material'
import { Divider } from '@mui/material'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

export default function DrawerMenu() {
  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/auth/signin')
  }

  return (
    <Drawer
      id="drawer"
      variant="permanent"
      sx={{
        height: '100%',
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          position: 'static',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem
            key="operations"
            disablePadding
          >
            <ListItemButton
              onClick={() => navigate('/operations')}
              selected={location.pathname === '/operations'}
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Operações" />
            </ListItemButton>
          </ListItem>
          <ListItem
            key="users"
            disablePadding
          >
            <ListItemButton
              onClick={() => navigate('/clients')}
              selected={location.pathname === '/clients'}
            >
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Clientes" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem
            key="logout"
            disablePadding
          >
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}
