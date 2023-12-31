import axios from "axios"
let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
    console.log(newToken)
}

const getConfig = () =>{
    return {
        headers: { Authorization: token },
    }
}

export default { getConfig, setToken, }