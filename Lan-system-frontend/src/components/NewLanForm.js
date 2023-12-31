import { useState } from "react"
import { Form } from "react-bootstrap"

const LanForm = ({ formData, handleChange, handleAika, handleNumerot }) =>{
    return(
        <Form> 
            <Form.Group>
                <Form.Label>Paikka</Form.Label>
                <Form.Control
                onChange={handleChange}
                value={formData.paikka}
                name='paikka'
                placeholder='Esedun ruokala Otavankatu 4, Mikkeli'
                />
            </Form.Group>

            <Form.Group className="mt-2"> 
                <Form.Label>Alkaa</Form.Label>
                <Form.Control
                onChange={handleChange}
                name='alku'
                type='datetime-local'
                />
            </Form.Group>

            <Form.Group className="mt-2">  
                <Form.Label>Päättyy</Form.Label>
                <Form.Control
                onChange={handleChange}
                name='loppu'
                type='datetime-local'
                />
            </Form.Group>

            <Form.Group className="mt-2">
                <Form.Label>Osallistumismaksu (€)</Form.Label>
                <Form.Control
                onChange={handleNumerot}
                value={formData.osallistumismaksu}
                name='osallistumismaksu'
                placeholder='15'
                />
            </Form.Group>

            <Form.Group className="mt-2">
                <Form.Label>Konepaikan koko</Form.Label>
                <Form.Control
                onChange={handleChange}
                value={formData.konepaikka}
                name='konepaikka'
                placeholder='120x75cm'
                />
            </Form.Group>

            <Form.Group className="mt-2">
                <Form.Label>Konepaikkojen määrä</Form.Label>
                <Form.Control
                onChange={handleNumerot}
                value={formData.koneMaara}
                name='koneMaara'
                placeholder='50'
                />
            </Form.Group>

            <Form.Group className="mt-2">
                <Form.Label>Ikäraja</Form.Label>
                <Form.Control
                onChange={handleNumerot}
                value={formData.ikaraja}
                name='ikaraja'
                placeholder='15'
                />
            </Form.Group>

            <Form.Group className="mt-2">
                <Form.Label>Tilinumero</Form.Label>
                <Form.Control
                onChange={handleChange}
                value={formData.tilinumero}
                name='tilinumero'
                placeholder='FI12 3456 7890 12'
                />
            </Form.Group>
        </Form>
    )
}

export default LanForm