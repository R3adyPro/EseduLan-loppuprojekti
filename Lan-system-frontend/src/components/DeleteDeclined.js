import { Button } from "react-bootstrap"



const DeleteDeclined = ({guests, service, updateGuests}) =>{

    const deletePerson = (person) =>{
        service.deletePerson(person)
    }

    const deletePeople = () =>{
        if(window.confirm('Haluatko varmasti poistaa hylätyt')){
            guests.forEach(guest =>{
                if(guest.status === 'hylätty'){
                    deletePerson(guest)
                }
                updateGuests()
            })
        }
    }

    const deleteButton = () =>(
        <Button className="btn-danger" onClick={deletePeople}>Poista Hylätyt</Button>
    )

    return(
        deleteButton()
    )
}

export default DeleteDeclined