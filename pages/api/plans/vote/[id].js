import { datas, votes, generateUuid } from "../../db"


export default function handler(req, res) {
    const method = req.method;
    const { id } = req.query

    if(method=="GET"){
        const data_f = votes.filter((vote) => vote.plan_id == id)
        res.status(200).json({ datas: data_f })
    }
    else{
        res.status(200).json({ name: "hello, post request for /api/plans/vote/[id]" })

    }


}
