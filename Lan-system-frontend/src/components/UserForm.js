
import { useEffect, useState } from 'react'
import {Button, Form } from 'react-bootstrap'
import Toggle from '../components/Toggle'

const NewUser = ( {createUser} ) =>{   
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const addUser = async ( event ) =>{
        event.preventDefault()
        createUser({
            username : formData.username,
            password: formData.password
        })
    }

    const handleChange = (event) =>{
        const { name, value } = event.target
        setFormData((prevState) =>({
            ...prevState,
            [name]: value
        }))
    }
  
    return(
        <div className='user-form'>
            <Toggle buttonLabel='Lisää uusi käyttäjä'>
                <h4>Ylläpitäjäkäyttäjän lisäys</h4>
            <Form onSubmit={addUser}>
                <Form.Group controlId='userName'>
                    <Form.Label>Nimi</Form.Label>
                    <Form.Control 
                        placeholder='Käyttäjänimi'
                        name='username'
                        type={'text'}
                        value={formData.username}
                        onChange={handleChange}
                    />
               </Form.Group>
        
               <Form.Group controlId='password'>
                    <Form.Label>Salasana</Form.Label>
                    <Form.Control 
                        placeholder='Salasana'
                        name='password'
                        type={'text'}
                        value={formData.password}
                        onChange={handleChange}
                    />
               </Form.Group>
              
               <Button className='btn-success' type='submit'>Lisää käyttäjä</Button>
            </Form>
            </Toggle>
        
           </div>
        )
}

export default NewUser 