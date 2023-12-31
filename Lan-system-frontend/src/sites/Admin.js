import LoginForm from '../components/LoginForm'
import { useState, useEffect } from 'react'
import loginService from '../services/login'
import userService from '../services/users'
import guestService from '../services/guest'
import config from '../services/config'
import  UserForm  from '../components/UserForm'
import People from '../components/PeopleList'
import UpButton from "../components/UpButton"
import NewLanForm from '../components/NewLan'

import {Container, Row, Col, Button} from 'react-bootstrap'


const Admin = () =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [guests, setGuests] = useState([])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedAdminUser') //toteuta että kirjaa käyttäjän ulos jos token on expired
        if(loggedUserJSON){
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          config.setToken(user.token)
          console.log(user)
          const tokenExpirationTime = new Date(user.expirationTime).getTime()
          const timeRemaining = tokenExpirationTime - Date.now()

           setTimeout(() => {
            alert('istunto on vahentunut')
            config.setToken(null)
            logOut()
          }, timeRemaining)
        }
        guestService.getAll().then(guests =>
            setGuests(guests))

            userService.getAll().then(users =>
            setUsers(users))
      }, [])
      

      const updateGuests = () =>{
        guestService.getAll().then(guests =>
          setGuests(guests))
      }
        
    const handleLogin = async(event) =>{
        event.preventDefault()  //estää sivun uudelleen lataamisen yms.
        console.log('logging in with', username, password)

        try{
            const user = await loginService.login({    //lähettää kirjautumispyynnön
                username, password
            })
             config.setToken(user.token)
             setUser(user)
             window.localStorage.setItem(
                'loggedAdminUser', JSON.stringify(user)
              )
        }catch(e){
            window.alert(`Virheellinen käyttäjätunnus tai salasana`)
        }
    }

    const loginForm = () => {
        return(
          <LoginForm
            username={username}     //antaa propseina tilaa käsittelävät funktiot LoginFormille
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        )
      }

    const userForm = () =>{
        return(
            <div>
                 <UserForm createUser = {addUser}></UserForm>   
            </div> 
        )
    }

      const addUser = async (userObject) => {
        try{
            const user = await userService.create(userObject)
            setUsers(users.concat(user))
        }catch(e){
            console.log(`error ${e}`)
        }      
      }

      const deleteUser = async (userObject) =>{
        try{
            await userService.deleteUser(userObject)
            userService.getAll().then(users =>
                setUsers(users))
        }catch(e){
            console.log(`error ${e}`)
        }
      }

      const logOut = () => {
        window.localStorage.clear()
        window.location.reload()
        setUser(null)
      }

      const logOutButton = () =>(
        <Button onClick={logOut}>Kirjaudu ulos</Button>
      )



    return(
    <div className='admin-control-panel'>
        {!user && loginForm()}
        {user && 
        <div>
            <Container fluid>
                <Row className='justify-content-between'>
                    <Col>
                    <h3>Tervetuloa hallintapaneeliin! Olet kirjautuneena käyttäjänä {user.username}</h3> 
                    {logOutButton()}
                    </Col>

                    <Col xs='auto' className='mt-3 me-4'>
                      <NewLanForm guests={guests} updateGuests={updateGuests}></NewLanForm>
                    </Col>
                </Row>   
               
              <Row className='mt-5'>
                  <Col className="people-list">
                    <People updateGuests={updateGuests} guestService = {guestService} guests ={guests}></People>
                  </Col>
              </Row>         
            </Container>
            <div>
                <UpButton/>
            </div>
        </div>}
    </div>
    )
}

export default Admin