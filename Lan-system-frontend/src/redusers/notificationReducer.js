import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notificationReducer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notification(state, action){
            return action.payload
        }
    }
})

export const { notification, hideNotification} = notificationReducer.actions

export const createNotification = (message, warning) => {
    return async dispatch => {
        dispatch(notification({message, warning}))
    }
} 

export default notificationReducer.reducer