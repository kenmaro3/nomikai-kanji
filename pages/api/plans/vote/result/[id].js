import { datas, votes } from "../../../db"
//import { addDoc, collection, getDocs, getDoc, query, where } from "firebase/firestore";
import { db } from "../../../../../lib/firebase-admin-config";
//import { db } from "../../../../../lib/firebase"


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
        //const votes_collection = collection(db, "votes");
        const votes_collection = db.collection("votes");

        // const q = query(votes_collection,
        //     where("plan_id", "==", id),
        // );
        const q = db.query(votes_collection, db.where("plan_id", "==", id));

        let votes = []
        //const querySnapshot = await getDocs(q);
        const querySnapshot = await db.getDocs(q);
        querySnapshot.forEach((doc) => {
            votes.push(doc.data())
        });


        // second count

        let date_res = {}
        let date_res_url = {}
        let time_res = {}
        let time_res_url = {}
        let location_res = {}
        let location_res_url = {}
        let venue_res = {}
        let venue_res_url = {}


        votes.forEach((vote) => {
            Object.keys(vote.date).forEach((date) => {
                if (vote.date[date]) {
                    if (date_res[date] !== undefined) {
                        date_res[date] += 1
                        date_res_url[date].push(vote.voter_url)
                    }
                    else {
                        date_res[date] = 1
                        date_res_url[date] = [vote.voter_url]
                    }
                }
            })
            Object.keys(vote.time).forEach((time) => {
                if (vote.time[time]) {
                    if (time_res[time] !== undefined) {
                        time_res[time] += 1
                        time_res_url[time].push(vote.voter_url)
                    }
                    else {
                        time_res[time] = 1
                        time_res_url[time] = [vote.voter_url]
                    }
                }
            })

            Object.keys(vote.location).forEach((location) => {
                if (vote.location[location]) {
                    if (location_res[location] !== undefined) {
                        location_res[location] += 1
                        location_res_url[location].push(vote.voter_url)
                    }
                    else {
                        location_res[location] = 1
                        location_res_url[location] = [vote.voter_url]
                    }
                }
            })

            Object.keys(vote.venue).forEach((location) => {
                Object.keys(vote.venue[location]).forEach((venue) => {
                    if (vote.venue[location][venue]) {
                        if (venue_res[venue] != undefined) {
                            venue_res[venue] += 1
                            venue_res_url[venue].push(vote.voter_url)
                        }
                        else {
                            venue_res[venue] = 1
                            venue_res_url[venue] = [vote.voter_url]
                        }
                    }

                })
            })
        })
        res.status(200).json({
            count: votes.length,
            date: date_res,
            time: time_res,
            location: location_res,
            venue: venue_res,
            date_url: date_res_url,
            time_url: time_res_url,
            location_url: location_res_url,
            venue_url: venue_res_url,
        })
    }
    else {
        res.status(404).json({ name: "not available" })

    }


}
