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
            console.log(doc.id, " => ", doc.data());
            res_list.push({id: doc.id, data: doc.data()})
        });

        

        res.status(200).json({ datas: res_list })



    }
    else {
        res.status(404).json({ info: "not allowed" })

    }

}