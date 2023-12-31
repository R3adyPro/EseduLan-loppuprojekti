import { Button } from "react-bootstrap"
const User = ({user, deleteUser}) =>{ //saa propseina userin ja deleteUserin Admin.js:tä

    const deletion = (event) =>{
        event.preventDefault()
        if(window.confirm(`Haluatko varmasti poistaa käyttäjän ${user.username}?`)){
            deleteUser(user)
          }
    }

    return(
        <div>
            {user.username} <Button className="btn-danger" onClick={deletion}>POISTA</Button>
        </div>
    )
}

export default User