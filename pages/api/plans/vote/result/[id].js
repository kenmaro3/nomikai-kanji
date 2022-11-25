import { datas, votes } from "../../../db"
import { addDoc, collection, getDocs, getDoc, query, where } from "firebase/firestore";
import { db } from "../../../../../lib/firebase"


const get_res = (plan_id, type) => {
    let tmp = []
    votes.forEach((vote) => {
        if (vote.plan_id === plan_id) {
            if (type == "location") {
                tmp.push(vote.location)
            }
            else if (type == "date") {
                tmp.push(vote.date)
            }
            else if (type == "time") {
                tmp.push(vote.time)
            }
            else if (type == "venue") {
                tmp.push(vote.venue)
            }
        }
    })
    let tmp2 = tmp.flat()
    let counts = {};
    tmp2.forEach(el => counts[el] = 1 + (counts[el] || 0))
    return counts
}



export default async function handler(req, res) {
    const method = req.method;
    const { id } = req.query // this is plan_id


    if (method == "GET") {

        // first get votes where vote.plan_id == plan_id
        const votes_collection = collection(db, "votes");
        const q = query(votes_collection,
            where("plan_id", "==", id),
        );

        let votes = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            votes.push(doc.data())
        });


        // second count

        let date_res = {}
        let time_res = {}
        let location_res = {}
        let venue_res = {}


        votes.forEach((vote) => {
            Object.keys(vote.date).forEach((date) => {
                if (date_res[date] !== undefined) {
                    date_res[date] += 1
                }
                else {
                    date_res[date] = 1
                }
            })
            Object.keys(vote.time).forEach((time) => {
                if (time_res[time] !== undefined) {
                    time_res[time] += 1
                }
                else {
                    time_res[time] = 1
                }
            })

            Object.keys(vote.location).forEach((location) => {
                if (location_res[location] !== undefined) {
                    location_res[location] += 1
                }
                else {
                    location_res[location] = 1
                }
            })

            Object.keys(vote.venue).forEach((location) => {
                Object.keys(vote.venue[location]).forEach((venue) => {
                    if (venue_res[venue] != undefined) {
                        venue_res[venue] += 1
                    }
                    else {
                        venue_res[venue] = 1
                    }

                })
            })
        })
        res.status(200).json({
            count: votes.length,
            date: date_res,
            time: time_res,
            location: location_res,
            venue: venue_res
        })
    }
    else {
        res.status(404).json({ name: "not available" })

    }


}
