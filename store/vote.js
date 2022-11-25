import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    voter_id: null,
    voter_url: null,
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
        setVoterUrl(state, action) {
            state.voter_url = action.payload
        },
        setPlanId(state, action) {
            state.plan_id = action.payload
        },
        setDate(state, action) {
            state.date = action.payload
        },
        setTime(state, action) {
            state.time = action.payload
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

