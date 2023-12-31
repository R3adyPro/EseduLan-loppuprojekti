
import {Button, Form} from 'react-bootstrap'


const LoginForm = ({
    handleSubmit,      //tilaa käsittelevät funktiot, käyttäjänimi ja salasana annetaan propseina Admin.js:sta
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) =>{
    return(
    <div className="login-form">
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-2' controlId='userName'>
                <Form.Label column="lg">Nimi</Form.Label>
                <Form.Control 
                    placeholder='Käyttäjänimi'
                    name='username'
                    type={'text'}
                    value={username}
                    onChange={handleUsernameChange}
                />
           </Form.Group>

           <Form.Group className='mb-2' controlId='password'>
                <Form.Label column="lg">Salasana</Form.Label>
                <Form.Control 
                    placeholder='Salasana'
                    name='password'
                    type='password'
                    value={password}
                    onChange={handlePasswordChange}
                />
           </Form.Group>
           <Button className='custom-btn' type='submit'>Kirjaudu</Button>
        </Form>
        </div>
    
    )
}


export default LoginForm