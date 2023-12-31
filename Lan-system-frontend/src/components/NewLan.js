import Modal from "react-bootstrap/Modal"
import Button from 'react-bootstrap/Button'
import { useState } from "react"
import LanForm from "./NewLanForm"
import lanService from "../services/lan"
import guestService from "../services/guest"
import archiveService from "../services/archive"

const NewLan = ({guests, updateGuests}) =>{
    const [show, setShow] = useState(false)
    const [formData, setFormData] = useState({//tallennetaan käyttäjän syöttämät tiedot
      paikka: '',
      osallistumismaksu: '',
      konepaikka: '',
      koneMaara: '',
      ikaraja: '',
      tilinumero: '',
      alku: '',
      loppu: ''
  })

    const archiveLan = (lan) =>{
      const dataToArchive = {   //määritellään arkistoitavat tiedot
        alku: new Date(lan.Alku),
        loppu: new Date(lan.Loppu),
        ilmoittautuneet: guests.length,
        maksaneet: guests.filter(guest => guest.status === 'maksettu').length,
        töissä: guests.filter(guest => guest.status === 'töissä').length
      }
      archiveService.create(dataToArchive)  //lähettää vanhan tapahtuman tiedot (päivämäärät, ilmoittautuneiden, maksaneiden sekä töissä olevien lukumäärän) arkistoon
    }

    const deleteLan = async (lan) => {
      archiveLan(lan)
      if(guests.length !== 0){  //poistetaan edellisen tapahtuman ilmoittautuneet
      guests.forEach(guest =>{
          guestService.deletePerson(guest)
      })
      updateGuests()
      }
    }

    const handleChange = (event) =>{
      const { name, value } = event.target

      setFormData((prevState) =>({ //käyttäjän syöttäessä jotain formiin talletetaan se formData olioon
        ...prevState,
        [name]: value
      }))
    }

    const handleNumerot = (event) =>{
      const { name, value } = event.target
      const regex = /^[0-9\b]+$/
      if(value === '' || regex.test(value)){      //varmistaa että osallistumismaksu kenttään voi syöttää vain numeroita  
        setFormData((prevState) =>({
          ...prevState,
          [name]: value
          }))   
      }
    }

    const handleSubmit = async ( event ) =>{
      const DataToSend = {
        Osoite: formData.paikka,
        Maksu: parseInt(formData.osallistumismaksu),
        Ikäraja: parseInt(formData.ikaraja),
        Tila: formData.konepaikka,
        Koneet: parseInt(formData.koneMaara),
        Alku: new Date(formData.alku),
        Loppu: new Date(formData.loppu),
        Tilinumero: formData.tilinumero
      }
      event.preventDefault()
      const formIsFilled = Object.values(formData).every(value => value.length > 0)
      if(!formIsFilled){
        alert('Täytä kaikki kentät')
      }
      else if(new Date(formData.alku) > new Date(formData.loppu)){
        alert('Päättymisajan tulee olla alkamisajan jälkeen')
      }else{
        const isConfirmed = window.confirm("Uuden tapahtuman luominen poistaa vanhan! Jatketaanko?") //varmistetaan käyttäjältä halutaanko varmasti luoda uusi tapahtuma
        if(isConfirmed){
        try{
          handleClose() //suljetaan form Modali
          const lan = await lanService.getLan()
          if (lan && lan.length > 0) { //jos lan on olemassa muutetaan sitä
            await lanService.newLan(DataToSend, lan[0].id)
          } else { //jos ei ole niin tehdään uusi
            await lanService.createLan(DataToSend)
          }
          deleteLan(lan[0]) //annettaan propseina vanha lani
        }catch(e){
          alert('virhe: ', e)
        }
        }
      }
    }

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
  
    return (
      <div>
        <Button variant="success" size="lg" onClick={handleShow}>
          Luo uusi tapahtuma
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          >
            
          <Modal.Header closeButton>
            <Modal.Title>Luo uusi Lan-tapahtuma</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <LanForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} handleNumerot={handleNumerot}></LanForm>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Sulje</Button>
            <Button variant="primary" onClick={handleSubmit}>Luo uusi tapahtuma</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
}

export default NewLan