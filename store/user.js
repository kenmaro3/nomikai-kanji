import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    id: null,
    name: null,
    url: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setId(state, action) {
            state.id = action.payload
        },
        setName(state, action) {
            state.name = action.payload
        },
        setUrl(state, action) {
            state.url = action.payload
        },
        reset() {
            return initialState
        }
    }
})