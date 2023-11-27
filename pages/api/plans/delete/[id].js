import { db } from "../../../../lib/firebase-admin-config";
import { Filter } from "firebase-admin/firestore"

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
    const target_doc = await db.collection("datas").doc(id).get();
    try {
      //const docSnap = await db.getDoc(docRef);
      if (target_doc != undefined) {
        const data = target_doc.data()
        if (data.host_id !== user_id) {
          res.status(200).json({ res: "bad", info: "only host can delete the post" })

        } else if (data.passcode !== passcode) {
          res.status(200).json({ res: "bad", info: "invalid passcode" })

        } else {
          // delete plan
          //await db.delete(db.doc("datas/" + id));
          //await db.recursiveDelete(target_doc);
          target_doc.ref.delete();

          // delete votes related to the plan
          //const votes_collection = collection(db, "votes");
          const votes_collection = db.collection("votes")
          const votes = await votes_collection.where(Filter.where("plan_id", "==", id)).get();

          let vote_id_already_exists = []
          votes.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            vote_id_already_exists.push(doc.id)
          });

          vote_id_already_exists.forEach(async (id) => {
            const target_vote = await db.collection("votes").doc(id).get();
            target_vote.ref.delete();
            //await db.deleteDoc(db.doc(`votes/${delete_id}`));
            //await deleteDoc(doc(db, "votes", delete_id));
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