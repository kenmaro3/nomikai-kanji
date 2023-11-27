import { Filter } from "firebase-admin/firestore"
import { db } from "../../../../lib/firebase-admin-config";

export default async function handler(req, res) {
    const method = req.method;
    const { id } = req.query

    if (method == "GET") {
        // get datas for that user
        //const data_collection = collection(db, "datas");
        const data_collection = db.collection("datas")
        // const q = query(data_collection,
        //     where("host_id", "==", id),
        // );
        const datas = await data_collection.where(Filter.where("host_id", "==", id)).get();

        let res_list = []

        datas.forEach((doc) => {
            res_list.push({ id: doc.id, data: doc.data() })
        });

        // get datas for that user
        //const vote_collection = collection(db, "votes");
        const vote_collection = db.collection("votes");
        // const q_vote = query(vote_collection,
        //     where("voter_id", "==", id),
        // );
        const votes = await vote_collection.where(Filter.where("voter_id", "==", id)).get();
        ////const vote_snapshot = await getDocs(q_vote);

        let vote_list = []
        console.log("vote list")
        console.log(votes)

        votes.forEach((doc) => {
            vote_list.push({ id: doc.id, data: doc.data() })
        });
        console.log("vote list after")
        console.log(vote_list)


        let voted_datas = []
        await Promise.all(
            vote_list.map(async (vote) => {
                //const ref = doc(db, "datas", vote.data.plan_id)
                //const doc = await db.doc("datas/" + vote.data.plan_id).get()
                const datas_collection = db.collection("datas");
                const target_data = await datas_collection.where(Filter.where("id", "==", vote.data.plan_id)).get();


                voted_datas.push({ id: target_data.id, data: target_data })
            })
        )
        res.status(200).json({ hosted_datas: res_list, voted_datas: voted_datas })
    }
    else {
        res.status(404).json({ info: "not allowed" })

    }

}