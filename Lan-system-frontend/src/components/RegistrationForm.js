import { useEffect, useState, useRef } from 'react'
import { Button, Col, Row, Form, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from '../redusers/notificationReducer'
import { send } from '../redusers/registrationReducer'
import ParentForm from './ParentForm'
import LanLogo from '../logos/EseduLAN_logo_white_muutettu.png'
import emailjs from '@emailjs/browser'
import lanService from "../services/lan"


const RegistrationForm = () => {
    const [newForm, setNewForm] = useState({ name: '', email: '', phone: '', age: '', discord: '', platform: ''}) //ilmoittautumis lomake
    const [platform, setPlatform] = useState()
    const [accepted, setAccepted] = useState(false)
    const [underAge, setUnderAge] = useState(false)
    const [lan, setLan] = useState(null)

    let view = underAge === true 
    const parentInfo = useSelector(state => state.parentData)

    const alku = new Date(lan.Alku) //lanin aika
    const loppu = new Date(lan.Loppu)
    const formattedStartDate = `${alku.getDate()}.${alku.getMonth() + 1}.` //muotossa 00.00.
    const formattedEndDate = `${loppu.getDate()}.${loppu.getMonth() + 1}.`
    const formattedStartTime = `klo ${alku.getHours().toString().padStart(2, '0')}:${alku.getMinutes().toString().padStart(2, '0')}` //muotossa klo 00:00.
    const formattedEndTime = `klo ${loppu.getHours().toString().padStart(2, '0')}:${loppu.getMinutes().toString().padStart(2, '0')}`


    const dispatch = useDispatch()

    useEffect(() => {   //tarkistaa onko ilmoittautuja alaikäinen
        if (newForm.age >= 15 && newForm.age < 18){
            setUnderAge(true)
        }
        else if (newForm.age >= 18) {
            setUnderAge(false)
        }
    })
    
    useEffect(() => { //hakee tiedon lanista databasesta ja asettaa sen 'lan' olioon
        const settingLan = async() =>{
            const lanInfo = await lanService.getLan()
            setLan(lanInfo[0])  
        }
        settingLan()
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        if(newForm.age >= 15){
            const registrationData = {
                name: newForm.name,
                email: newForm.email,
                phone: newForm.phone,
                age: newForm.age,
                discord: newForm.discord,
                platform: platform,
            }
            const parentData = {
                parentName: parentInfo.name,
                parentEmail: parentInfo.email,
                parentPhone: parentInfo.phone
            }

            var emailTemplateParams = { //Sähköpostiin tarvittavat tiedot
                email: newForm.email,
                price: lan.Maksu,
                place: lan.Osoite,
                age: lan.Ikäraja,
                computer: lan.Koneet,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                startTime: formattedStartTime,
                endTime: formattedEndTime
            };

            const formIsValid = Object.values(registrationData).every(value => value === undefined || value.length > 0) //tarkistaa onko lomakkeet täytetty
            let parentIsValid = false
            
            if(newForm.age >= 15 && newForm.age < 18) {
                parentIsValid = Object.values(parentData).every(value => value.length > 0)
            }

            const newRegistration = {...registrationData, ...parentData} //yhdistää ilmoittajan ja vanhempien tiedot

            const discordIdRegex = /^.{3,32}#[0-9]{4}$/ //tarkistaa sähköpostin ja discordId:n
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        
            if((formIsValid === false && parentIsValid === false) || (parentIsValid === false && underAge === true && formIsValid === true)){
                dispatch(createNotification('Täytä kaikki lomakkeen kohdat.', true))
            }
            else if(accepted === false){
                dispatch(createNotification('Sinun täytyy hyväksyä säännöt ja ohjeet.', true))
            }
            else if(!emailRegex.test(registrationData.email)){
                dispatch(createNotification('Sähköpostiosoite on kirjoitettu väärin.', true))
            }
            else if(!discordIdRegex.test(registrationData.discord)){
                dispatch(createNotification('Discord ID on kirjoitettu väärin.', true))
            }
            else {
                dispatch(send(newRegistration))
                emailjs.send('service_pobj2py', 'template_7topxio',  emailTemplateParams, 'vyYV2Goy3IummG613') //Sähköpostin lähettäminen
                    .then(function(response) {
                        console.log(response)
                    }, function(error) {
                        console.log(error)
                });
                setNewForm({ name: '', email: '', phone: '', age: '', discord: '', platform: ''})
                setPlatform()
                setAccepted(!accepted)
            }
        }
        else {
            dispatch(createNotification("Tapahtuma on vain yli 15 vuotiaille.", true))
        }
    }

    const handleChangeNumber = (event) => {
        const regex = /^[0-9\b]+$/;
        if(event.target.value === "" || regex.test(event.target.value)){
            const name = event.target.name
            const value = event.target.value
            setNewForm((pre) => {
                return {
                  ...pre,
                  [name]: value
                }
              })
        } else {
            dispatch(createNotification('Vain numeroita!', true))
            setNewForm({ ...newForm})
        }
    }
    
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setNewForm((pre) => {
            return {
              ...pre,
              [name]: value
            }
        })
    }

    return(
        <div>
            <div className='custom-form' >
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-2' controlId='formName' >
                        <Form.Label column="lg">Nimi</Form.Label>
                        <Form.Control 
                            placeholder='Etunimi Sukunimi'
                            name='name'
                            type={'text'}
                            value={newForm.name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className='mb-2' controlId='formEmail'>           
                        <Form.Label column="lg">Sähköposti</Form.Label>
                        <Form.Control
                            placeholder='esimerkki@sähköposti.fi'
                            name='email'
                            type={'text'}
                            value={newForm.email}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className='mb-2' controlId='formPhone'>
                        <Form.Label column="lg">Puhelinnumero</Form.Label>
                        <Form.Control 
                            placeholder='Puhelinnumero'
                            minLength={10}
                            maxLength={10}
                            name='phone'
                            type={'text'}
                            value={newForm.phone}
                            onChange={handleChangeNumber}
                        />
                    </Form.Group>

                    <Form.Group className='mb-2' controlId='formAge'>
                        <Form.Label column="lg">Ikä</Form.Label>
                        <Form.Control 
                            placeholder='Ikä'
                            name='age'
                            type={'text'}
                            value={newForm.age}
                            onChange={handleChangeNumber}
                        />
                    </Form.Group>

                    <Form.Group className='mb-2' controlId='formDiscord'>
                        <Form.Label column="lg">Discord ID</Form.Label>
                        <Form.Control 
                            placeholder='DiscordNimi#0000'
                            name='discord'
                            type={'text'}
                            value={newForm.discord}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div className='custom-form'>
                        <fieldset>
                            <Form.Group className='mb-2'>
                                <Row className='custom-radio'>
                                    <Col>
                                        <Form.Check
                                            type='radio'
                                            label='PC'
                                            name='platform' 
                                            id='pc'
                                            checked={(platform === 'pc')} 
                                            onChange={() => setPlatform('pc')}
                                        />
                                        <Form.Check
                                            type='radio'
                                            label='Konsoli'
                                            name='platform'
                                            id='konsoli'
                                            checked={(platform === 'konsoli')} 
                                            onChange={() => setPlatform('konsoli')}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </fieldset>
                    </div>
                    
                    <Form.Group className='mb-2'>
                        <Form.Check >
                            <Form.Check.Input type='checkbox' onChange={() => setAccepted(!accepted)} checked={(accepted === true)}/>
                            <Form.Check.Label style={{paddingRight: 5}}>Olen lukenut ja hyväksynyt</Form.Check.Label><a href='/saannot/'>säännöt ja ohjeet</a>
                        </Form.Check>
                    </Form.Group>

                    {
                        view && (
                            <ParentForm />
                        )
                    }

                    <Button className='custom-btn' variant='success' type='submit'>Lähetä</Button>
                </Form>
            </div>
            <div className='center-logo'>
                <Image src={LanLogo} alt="lanLogo" />
            </div>
        </div>
    )
}

export default RegistrationForm