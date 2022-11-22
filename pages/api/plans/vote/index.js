import { datas, votes, generateUuid } from "../../db"

const query_vote = (voter_id, plan_id) => {
    for (let i = 0; i < votes.length; i++) {
        if (votes[i].voter_id === voter_id && votes[i].plan_id === plan_id) {
            return i
        }

    }
    return -1
}

export default function handler(req, res) {
    const method = req.method;

    if (method == "GET") {
        res.status(200).json({ votes: votes })

    }
    else {
        const id = generateUuid()
        const { voter_id, plan_id, location, venue, date } = req.body
        console.log("🚀 ~ file: index.js ~ line 24 ~ handler ~ req.body", req.body)


        const query_res = query_vote(voter_id, plan_id)
        if (query_res == -1) {
            console.log("query_res if", query_res)
        }
        else {
            console.log("query_res else", query_res)
            votes.splice(query_res, 1)
        }
        votes.push({
            id,
            voter_id,
            plan_id,
            location,
            venue,
            date,

        })

        console.log("🚀 ~ file: index.js ~ line 42 ~ handler ~ votes", votes)



        res.status(200).json({ id: id })


    }


}