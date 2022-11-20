import { datas, votes, generateUuid } from "../../db"


export default function handler(req, res) {
    const method = req.method;

    switch (method) {
        case "GET": {

            res.status(200).json({ votes: votes })
        }

        case "POST": {
            const id = generateUuid()
            const { voter_id, plan_id, location, date } = req.body
            votes.push({
                id,
                voter_id,
                plan_id,
                location,
                date,

            })
            res.status(200).json({ id: id })

        }

        default: {

            res.status(200).json({ name: "default" })
        }
    }


}