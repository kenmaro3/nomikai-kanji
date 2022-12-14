import { db } from "../../../../lib/firebase"
import { addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { collection, query, where, deleteDoc } from "firebase/firestore";

export default async function handler(req, res) {
    const method = req.method;
    const { id } = req.query

    if (method == "GET") {
        // get datas for that user
        const data_collection = collection(db, "datas");
        const q = query(data_collection,
            where("host_id", "==", id),
        );
        const querySnapshot = await getDocs(q);

        let res_list = []

        querySnapshot.forEach((doc) => {
            res_list.push({ id: doc.id, data: doc.data() })
        });

        // get datas for that user
        const vote_collection = collection(db, "votes");
        const q_vote = query(vote_collection,
            where("voter_id", "==", id),
        );
        const vote_snapshot = await getDocs(q_vote);

        let vote_list = []

        vote_snapshot.forEach((doc) => {
            vote_list.push({ id: doc.id, data: doc.data() })
        });


        let voted_datas = []
        await Promise.all(
            vote_list.map(async (vote) => {
                const ref = doc(db, "datas", vote.data.plan_id)
                const docSnap = await getDoc(ref)
                //voted_datas.push(docSnap.data())
                voted_datas.push({ id: docSnap.id, data: docSnap.data() })
            })
        )
        res.status(200).json({ hosted_datas: res_list, voted_datas: voted_datas })
    }
    else {
        res.status(404).json({ info: "not allowed" })

    }

}