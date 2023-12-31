import { Nav, Navbar, Image } from "react-bootstrap"
import { Route, Routes, Link, useLocation} from 'react-router-dom'
import { useEffect, useState } from "react"
import Logo from "../logos/EseduLAN_logo_white_muutettu.png"

const MobileNavbar = () => {
    let location = useLocation()
    const [page, setPage] = useState()

    useEffect(() => {
        setPage(location.pathname)
    }, [location])

    return (
        <div>
            <div className="mobileNav" >
                <Navbar className="navbar justify-content-center">
                    <Navbar className="navLinks">
                        <Nav>
                            <Nav.Item className='gap-3 px-3'>
                                <Nav.Link className='navbar-text' as={Link} to="/">Etusivu</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='gap-3 px-3'>
                                <Nav.Link className='navbar-text' as={Link} to="/ilmoittaudu">Ilmoittaudu</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='gap-3 px-3'>
                                <Nav.Link className='navbar-text' as={Link} to="/saannot/">Säännöt</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar>
                </Navbar>
            </div>
        </div>
    )
}

export default MobileNavbar