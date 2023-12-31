import axios from "axios"
import config from './config'

const baseUrl = '/api/users'

const getAll = () =>{
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async userObject =>{
    const response = await axios.post(baseUrl, userObject,config.getConfig())
    console.log('response',response)
    return response.data
}


const deleteUser = async userObject =>{
    const response = await axios.delete(`${baseUrl}/${userObject.id}`, config.getConfig())
    console.log('response',response)
    return response.data
}

export default { create, deleteUser, getAll }