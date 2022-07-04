import React, { FC } from 'react'
import { Typography } from '@mui/material'

export const Footer: FC = () => {

  return (
    <div>
        <footer style={{
            textAlign: 'center'
        }}>
            <Typography><span style={{ fontWeight: 600 }}>&copy; Adriana Zuluaga </span>Realizado por: <span style={{ fontWeight: 600 }}>David Diaz H.</span> | <span style={{ fontWeight: 600 }}>Dayro Martinez</span></Typography>
            <Typography>

            <a href="http://brainon24.com/" target='_blank' style={{ textDecoration: 'underline', color: '#000' }}>brainon24</a>

            <span> - </span>
            {new Date().getFullYear()}.</Typography>
        </footer>
    </div>
  )
}
