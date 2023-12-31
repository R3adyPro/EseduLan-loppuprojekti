import axios from "axios"
const baseUrl = '/api/archive'

const create = async archiveObject =>{      //lähettää post pyynnön osoitteesen archive lanin perustiedoista
    const response = await axios.post(baseUrl, archiveObject)
    console.log('response',response)
    return response.data
}

export default { create }