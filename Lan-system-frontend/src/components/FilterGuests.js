import { DropdownButton, Dropdown } from "react-bootstrap"

const FilteredGuests = ({setStatus, status}) =>{
    const onSelect = async (eventKey, event) => {
        setStatus(eventKey)
    }

    return(
        <DropdownButton title = {`Näytä ${status}`} onSelect={onSelect}>
            <Dropdown.Item eventKey= "kaikki" href="#">Kaikki</Dropdown.Item>
                <Dropdown.Item eventKey= "odottaa" href="#">Odottaa</Dropdown.Item>
                <Dropdown.Item eventKey= "maksettu" href="#">Maksettu</Dropdown.Item>
                <Dropdown.Item eventKey= "jonossa" href="#">Jonossa</Dropdown.Item>
                <Dropdown.Item eventKey= "hylätty" href="#">Hylätty</Dropdown.Item>
                <Dropdown.Item eventKey= "töissä" href="#">Töissä</Dropdown.Item>
        </DropdownButton>
    )
}

export default FilteredGuests 