import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id: null,
    name: null,
    host: null,
    location: {},
    venue: {},
    date: {},
    time: {},
    deadline: null,
    host_id: null,
};

export const planSlice = createSlice({
    name: "plan",
    initialState,

    reducers: {
        set(state, action) {

            state.id = action.payload.id
            state.name = action.payload.name
            state.location = action.payload.location
            state.venue = action.payload.venue
            state.host_id = action.payload.host_id
            state.deadline = action.payload.deadline
            state.date = action.payload.date
            state.time = action.payload.time
        },
    }
})