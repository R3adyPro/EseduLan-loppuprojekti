import { useState, useEffect} from "react"
import { Dropdown, DropdownButton } from "react-bootstrap"
import guestService from '../services/guest'


const Person = ( {guest, updateGuests} ) =>{
    const stateColors = {  //jokaisella tilalle löytyy oma väri
        odottaa: 'primary',
        maksettu: 'success',
        jonossa: 'warning',
        hylätty: 'danger',
        töissä: 'info',
      }
      
      const dueDate = new Date(guest.registrationDate)
        dueDate.setDate(dueDate.getDate() + 3)
        const options = { 
            year: 'numeric', 
            month: 'numeric', 
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }
          const formattedDate = dueDate.toLocaleString('en-FI', options) //muotoillaan ilmoittautumis ajankohta haluttuun muotoon

    const [state, setState] = useState(guest.status)
    const [color, setColor] = useState(stateColors[state])


        const onSelect = async (eventKey, event) => {
            event.preventDefault()
            try{
                await guestService.updateState(guest, eventKey)
                setState(eventKey)
                setColor(stateColors[eventKey])
                updateGuests()
            }   
            catch(e){
                console.log(`error ${e}`)
            }
        }


    return(
    <tr>
        <td>{guest.name}</td>
        <td>{guest.phone}</td>
        <td>{guest.email}</td>
        <td>{guest.discord}</td>
        <td>{guest.age}</td>
        <td>{guest.parentName ?? '-'}</td>
        <td>{guest.parentPhone ?? '-'}</td>
        <td>{guest.parentEmail ?? '-'}</td>
        <td>{guest.platform}</td>
        <td>{formattedDate}</td>
        <td>
            <DropdownButton variant={color} title = {state} onSelect = {onSelect}>
                <Dropdown.Item eventKey= "odottaa" href="#">Odottaa</Dropdown.Item>
                <Dropdown.Item eventKey= "maksettu" href="#">Maksettu</Dropdown.Item>
                <Dropdown.Item eventKey= "jonossa" href="#">Jonossa</Dropdown.Item>
                <Dropdown.Item eventKey= "hylätty" href="#">Hylätty</Dropdown.Item>
                <Dropdown.Item eventKey= "töissä" href="#">Töissä</Dropdown.Item>
            </DropdownButton>
        </td>
    </tr>
    )
}

export default Person