import { createSlice } from "@reduxjs/toolkit"

const parentFormReducer = createSlice({ //vanhempien tietojen vienti ilmoittautumis lomakkeelle
    name: 'parentForm',
    initialState: [],
    reducers: {
        parentData(state, action){
            return action.payload
        }
    }
})

export const { parentData } = parentFormReducer.actions
export default parentFormReducer.reducer