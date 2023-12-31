import axios from "axios"
const baseUrl = '/api/guests'

const sendInfo = async info => {
    const response = await axios.post(baseUrl, info)
    return response.data
}

export default { sendInfo }