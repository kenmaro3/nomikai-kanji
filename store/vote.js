import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    voter_id: null,
    plan_id: null,
    location: null,
    venue: null,
    date: null,
    comment: null,
};

export const voteSlice = createSlice({
    name: "vote",
    initialState,

    reducers: {
        setVoterId(state, action) {
            state.voter_id = action.payload
        },
        setPlanId(state, action) {
            state.plan_id = action.payload
        },
        setDate(state, action) {
            state.date = action.payload
        },
        setLocation(state, action) {
            state.location = action.payload
        },
        setComment(state, action) {
            state.comment = action.payload
        },
        setVenue(state, action) {
            state.venue = action.payload
        },
        reset() {
            return initialState
        }
    }
})

