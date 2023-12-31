import Home from './sites/Home'
import Saannot from './sites/Saannot'
import Ilmoittaudu from './sites/Ilmoittaudu'
import Admin from './sites/Admin'
import { Route, Routes, Link, useLocation } from 'react-router-dom'
import MobileNavbar from './components/Navbar'
import { useRef } from 'react'
import { Nav, Navbar } from "react-bootstrap"

const App = () => {
  const windowSize = useRef([window.innerWidth])
  const location = useLocation();
  const showDropdown = location.pathname !== '/admin'
  
  return (
    <div className='dropdown'>
      {showDropdown && windowSize.current[0] <= 1300 && 
        <div className='mobile'>
          <MobileNavbar />
        </div>
      }

      {showDropdown && windowSize.current[0] >= 1301 &&
        <div>
            <Navbar className="navLinks justify-content-center">
                <Nav className='testi' >
                    <Nav.Item className='gap-3 px-5'>
                        <Nav.Link className='navbar-text' as={Link} to="/">Etusivu</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='gap-3 px-5'>
                        <Nav.Link className='navbar-text' as={Link} to="/ilmoittaudu">Ilmoittaudu</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='gap-3 px-5'>
                        <Nav.Link className='navbar-text' as={Link} to="/saannot/">Säännöt</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        </div>
      }

      <Routes>
        <Route path='/' element={<Home></Home>} /> 
        <Route path='/saannot/' element={<Saannot></Saannot>} />
        <Route path='/ilmoittaudu' element={<Ilmoittaudu></Ilmoittaudu>} />
        <Route path='/admin' element={<Admin></Admin>} />
      </Routes>
   </div>
  )
}

export default App