import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../ui/Footer'
import { Navbar } from '../ui/Navbar'
import { AuthContext } from '../../context/auth/AuthContext';

export const PrivateLayout = () => {

    const { user } = useContext(AuthContext)

    return (
        <>
            {
                user ? (
                    <div>
                        <Navbar />

                        <main style={{
                            margin: '80px auto',
                            maxWidth: '1440px',
                            padding: '0px 30px',
                        }}>
                            <Outlet />
                        </main>

                        <Footer />
                    </div>
                ) : null
            }
        </>
    )
}
