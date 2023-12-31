import { DropdownButton, Dropdown } from "react-bootstrap"

const PlatformFilter = ({setPlatform, platform}) =>{
    const onSelect = async (eventKey) => {
        setPlatform(eventKey)
    }

    return(
        <DropdownButton title = {`Näytä ${platform}`} onSelect={onSelect}>
            <Dropdown.Item eventKey= "Konsoli ja PC" href="#">Kaikki</Dropdown.Item>
                <Dropdown.Item eventKey= "Konsoli" href="#">Konsoli</Dropdown.Item>
                <Dropdown.Item eventKey= "PC" href="#">PC</Dropdown.Item>
        </DropdownButton>
    )
}

export default PlatformFilter