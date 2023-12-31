import axios from "axios"
const baseUrl = '/api/info'

const getLan = async () => {
    try {
        const response = await axios.get(baseUrl)
        return response.data // access the data property of the response object
      } catch (error) {
        console.log(error)
        return null
      }
}

const createLan = async lanInfo =>{
    try{  
    const response = await axios.post(baseUrl, lanInfo)
    return response.data
    }catch(e){
        throw new Error(e.message)
    }
}

const newLan = async (lanInfo, id) =>{
    try{  
    const response = await axios.put(`${baseUrl}/${id}`, lanInfo)
    return response.data
    }catch(e){
        throw new Error(e.message)
    }
}

export default{ createLan, newLan, getLan }