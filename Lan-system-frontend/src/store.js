import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './redusers/notificationReducer'
import registrationReducer from './redusers/registrationReducer'
import parentFormReducer from './redusers/parentFromReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        registration: registrationReducer,
        parentData: parentFormReducer
    }
})

export default store