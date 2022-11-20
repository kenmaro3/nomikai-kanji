import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id: null,
    name: null,
    host: null,
    location: [],
    date: [],
    deadline: null,
    host_id: null,
};

export const planSlice = createSlice({
    name: "plan",
    initialState,

    reducers: {
        set(state, action) {
            console.log("plan reducer called")
            console.log("🚀 ~ file: plan.js ~ line 18 ~ set ~ action", action.payload)

            state.id = action.payload.id
            state.name = action.payload.name
            state.location = action.payload.location
            state.host = action.payload.host
            state.deadline = action.payload.deadline
            state.date = action.payload.date
        }
    }
})