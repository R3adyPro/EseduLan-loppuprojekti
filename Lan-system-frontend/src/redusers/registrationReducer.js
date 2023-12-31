import { createSlice } from "@reduxjs/toolkit"
import registrationService from "../services/registration"
import { createNotification } from "./notificationReducer"

const registrationReducer = createSlice({
    name: 'registration',
    initialState: [],
    reducers: {
        formInfoSet(state, action){
            console.log("Info action", action.payload)
            return action.payload
        }
    }
})

export const { formInfoSet } = registrationReducer.actions

export const send = content => {
    return async dispatch => {
        try{
            await registrationService.sendInfo(content)
            dispatch(createNotification("Ilmoittautumislomake on lähetetty!", false))
        }catch(e){
            dispatch(createNotification(`error occurred: ${e}`, true))
        }

    }
}

export default registrationReducer.reducer