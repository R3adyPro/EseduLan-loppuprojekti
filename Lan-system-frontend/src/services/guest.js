import axios from "axios"
import config from './config'

const baseUrl = '/api/guests'

const getAll = () =>{
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const updateState = async (guestObject, status) =>{
    const updatedGuest = {
        name: guestObject.name,
        email: guestObject.email,
        phone: guestObject.phone,
        age: guestObject.age,
        discord: guestObject.discord,
        platform: guestObject.platform,
        status: status
    }

    console.log(config.getConfig())
    const request = await axios.put(`${baseUrl}/${guestObject.id}`, updatedGuest, config.getConfig())
    return(request.data)
}

const deletePerson = async (guestObject) =>{
    const request = await axios.delete(`${baseUrl}/${guestObject.id}`, config.getConfig())
    return request.data
}


export default { getAll, updateState, deletePerson }