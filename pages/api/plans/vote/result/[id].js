import { datas, votes, generateUuid } from "../../../db"

const get_vote_count = plan_id => {
    let count = 0
    votes.forEach((vote) => {
        if(vote.plan_id === plan_id){
            count += 1
        }
    })

    return count
}

const get_res = (plan_id, type) => {
    let tmp = []
    votes.forEach((vote) => {
        if(vote.plan_id === plan_id){
            if(type == "location"){
                tmp.push(vote.location)
            }
            else if(type == "date"){
                tmp.push(vote.date)
            }
            else if(type == "venue"){
                tmp.push(vote.venue)
            }
        }
    })
    let tmp2 = tmp.flat()
    let counts = {};
    tmp2.forEach(el => counts[el] = 1  + (counts[el] || 0))
    return counts
}



export default function handler(req, res) {
    const method = req.method;
    const { id } = req.query

    if(method=="GET"){
        const data_f = {
            count: get_vote_count(id),
            location: get_res(id, "location"),
            date: get_res(id, "date"),
            venue: get_res(id, "venue"),
        }
        res.status(200).json({ datas: data_f })
    }
    else{
        res.status(404).json({ name: "not available" })

    }


}
