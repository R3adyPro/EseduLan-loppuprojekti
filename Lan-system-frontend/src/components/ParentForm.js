import { Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNotification } from '../redusers/notificationReducer'
import { parentData } from '../redusers/parentFromReducer'

const ParentForm = () => {    
    const [parentInfo, setParentInfo] = useState({ name: '', email: '', phone: ''}) //formi vanhempien tiedoille

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(parentData(parentInfo)) //lähettää datan RegistrationFormille
    })

    const handleChangeNumber = (event) => {
        const regex = /^[0-9\b]+$/;
        if(event.target.value === "" || regex.test(event.target.value)){
            const name = event.target.name
            const value = event.target.value
            setParentInfo((pre) => {
                return {
                  ...pre,
                  [name]: value
                }
              })
        } else {
            dispatch(createNotification('Vain numeroita!', true))
        }
    }
    
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setParentInfo((pre) => {
            return {
              ...pre,
              [name]: value
            }
          })
    }

    return (
        <div>
            <br></br>
            <h1 className='text-center'>Huoltajan tiedot</h1><br></br>
            <Form.Group className='mb-2' controlId='formParentName'>
                <Form.Label column="lg">Nimi</Form.Label>
                <Form.Control 
                    placeholder='Etunimi Sukunimi'
                    name='name'
                    type={'text'}
                    value={parentInfo.name}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className='mb-2' controlId='formParentEmail'>
                <Form.Label column="lg">Sähköposti</Form.Label>
                <Form.Control 
                    placeholder='esimerkki@sähköposti.fi'
                    name='email'
                    type={'text'}
                    value={parentInfo.email}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className='mb-2' controlId='formParentPhone'>
                <Form.Label column="lg">Puhelinnumero</Form.Label>
                <Form.Control 
                    placeholder='Puhelinnumero'
                    minLength={10}
                    maxLength={10}
                    name='phone'
                    type={'text'}
                    value={parentInfo.phone}
                    onChange={handleChangeNumber}
                />
            </Form.Group>
            <br></br>
        </div>
    )
}

export default ParentForm