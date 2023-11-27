import { generatePasscode } from "../../db"
//import { db } from "../../../../lib/firebase"
// import { addDoc, getDocs, getDoc, doc } from "firebase/firestore";
// import { collection, query, where, deleteDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase-admin-config";
import { arrayToObj, venueArrayToObj } from "../../../../lib/util";


export default async function handler(req, res) {
    const method = req.method;

    if (method == "GET") {
        //const querySnapshot = await getDocs(collection(db, "votes"));
        const querySnapshot = await db.getDocs(db.collection("votes"));
        let res_list = []
        querySnapshot.forEach((doc) => {
            res_list.push({ id: doc.id, data: doc.data() })
        });

        res.status(200).json({ votes: res_list })

    }
    else {
        const { voter_id, voter_url, plan_id, location, venue, date, time } = req.body

        // first delete vote if already exists
        //const votes_collection = collection(db, "votes");
        const votes_collection = db.collection("votes")
        // const q = query(votes_collection,
        //     where("plan_id", "==", plan_id),
        //     where("voter_id", "==", voter_id),
        // );
        const q = db.query(votes_collection, db.where("plan_id", "==", plan_id), db.where("voter_id", "==", voter_id));

        let vote_id_already_exists = []
        //const querySnapshot = await getDocs(q);
        const querySnapshot = await db.getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            vote_id_already_exists.push(doc.id)
        });

        vote_id_already_exists.forEach(async (delete_id) => {
            //await deleteDoc(doc(db, "votes", delete_id));
            await db.deleteDoc(db.doc("votes/" + delete_id));
        })


        // second add vote
        try {
            // const docRef = await addDoc(collection(db, "votes"), {
            //     voter_id,
            //     voter_url,
            //     plan_id,
            //     location,
            //     venue,
            //     date,
            //     time,
            // });
            const collectionRef = db.collection("votes")
            const docRef = await db.addDoc(collectionRef, {
                voter_id,
                voter_url,
                plan_id,
                location,
                venue,
                date,
                time,
            });
            res.status(200).json({ id: docRef.id })
        } catch (e) {
            console.error("Error adding document: ", e);
            res.status(500).json({ info: "something went wrong to add data for writing to firestore" })
        }
    }


}