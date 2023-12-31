import axios from 'axios'
const baseurl = '/api/login'


const login = async credentials =>{
    const response = await axios.post(baseurl, credentials)    //lähettää POST pyynnön osoitteeseen api/login
    return response.data
}

export default{ login }