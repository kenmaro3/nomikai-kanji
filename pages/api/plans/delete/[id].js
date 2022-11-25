import { db } from "../../../../lib/firebase"
import { addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { collection, query, where, deleteDoc } from "firebase/firestore";

const findDataIndexById = (x, target) => {
  let res = []
  x.forEach((el, i) => {
    if (el.id == target) {
      res.push(i)
    }
  })
  return res
}

const findVoteIndexById = (x, target) => {
  let res = []
  x.forEach((el, i) => {
    if (el.post_id == target) {
      res.push(i)
    }
  })
  return res
}

export default async function handler(req, res) {
  const method = req.method;
  const { id } = req.query

  if (method == "POST") {
    const { passcode, user_id } = req.body

    // first check the passcode is correct or not
    const docRef = doc(db, "datas", id);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data()
        if (data.host_id !== user_id) {
          res.status(200).json({ res: "bad", info: "only host can delete the post" })

        } else if (data.passcode !== passcode) {
          res.status(200).json({ res: "bad", info: "invalid passcode" })

        } else {
          // delete plan
          await deleteDoc(doc(db, "datas", id));

          // delete votes related to the plan
          const votes_collection = collection(db, "votes");
          const q = query(votes_collection,
            where("plan_id", "==", id),
          );

          let vote_id_already_exists = []
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            vote_id_already_exists.push(doc.id)
          });

          vote_id_already_exists.forEach(async (delete_id) => {
            await deleteDoc(doc(db, "votes", delete_id));
          })
          res.status(200).json({ res: "good", info: "successfully deleted" })

        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        res.status(404).json({ info: "document not found" })
      }
    } catch (e) {
      console.log("Error getting cached document:", e);
      res.status(500).json({ info: "something went wrong" })
    }




  }

}