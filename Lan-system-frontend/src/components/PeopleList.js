import { Table, Form, Row, Col } from "react-bootstrap"
import Person from "./Person"
import { useState, useEffect } from "react"
import GuestStates from './GuestStates'
import StatusFilter from './FilterGuests'
import DeleteDeclined from "./DeleteDeclined"
import SearchForm from "./SearchForm"
import PlatformFilter from "./FilterByPlatform"

const People = ({guests, guestService, updateGuests}) => {
    const [value, setValue] = useState('')
    const [status, setStatus] = useState('kaikki')
    const [platform, setPlatform] = useState('Konsoli ja PC')
    const searchFields = ["name", "email", "discord","parentName", "parentEmail"] //kentät joiden perusteella voi käyttäjä hakea ilmoittautuneita

    const handleChange = (event) =>{
        setValue(event.target.value)
    }

   const filteredGuests = status === 'kaikki' ? guests : guests.filter(guest => guest.status === status)
    // Filtteröidään ilmoittautuneet käyttäjän valitseman tilan mukaan  

   const filteredPlatforms = platform === 'Konsoli ja PC' ? filteredGuests : filteredGuests.filter(guest => guest.platform.toLowerCase() === platform.toLowerCase())
    // Filtteröidään ilmoittautuneet käyttäjän valitseman alustan mukaan  

   const SearchedGuests = filteredPlatforms.filter((guest) =>
   searchFields.some((field) =>
     guest[field]?.toLowerCase().includes(value.toLowerCase())  //käyttäjän hakiessa näyetään vain ilmoittautuneet, joiden
   ))                                                           //kentistä löytyy haettu teksti
   .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
   //järjestetään ilmoittautuneet uusimmasta vanhimpaan


    return(
       <div>
          <Row className='justify-content-between'>
            <Col md={2}>
            <SearchForm value={value} handleChange={handleChange}></SearchForm>
            </Col>
            <Col md={1}>
            <StatusFilter className='status-filter' setStatus={setStatus} status={status}></StatusFilter>
            </Col>
            <Col className="platform-filter">
            <PlatformFilter setPlatform={setPlatform} platform={platform}></PlatformFilter>
            </Col>
      
            <Col xs='auto'>  
            <GuestStates guests={guests} />
            </Col>

            <Col xs='auto'>
            <DeleteDeclined guests={guests} service={guestService} updateGuests={updateGuests} />
            </Col> 
          </Row>
          
            <Table striped bordered className='mt-2'>
                <thead>
                    <tr>
                        <th>Nimi</th>
                        <th>Puhelin</th>
                        <th>Sähköposti</th>
                        <th>Discord</th>
                        <th>Ikä</th>
                        <th>Huoltajan nimi</th>
                        <th>Huoltajan puhelin</th>
                        <th>Huoltajan sähköposti</th>
                        <th>Alusta</th>
                        <th>Eräpäivä</th>
                        <th>Tila</th>
                    </tr>
                </thead>
                <tbody>
                    {SearchedGuests.map(person =>
                        <Person guest={person} key = {person.email} updateGuests={updateGuests}></Person>
                    )}
                </tbody>
            </Table>
       </div>
    )
}


export default People