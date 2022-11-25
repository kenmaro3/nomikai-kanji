import { datas, votes } from "../db"
import { db } from "../../../lib/firebase"
import { addDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";

export default async function handler(req, res) {
  const method = req.method;
  const { id } = req.query

  if (method == "GET") {

    const docRef = doc(db, "datas", id);
    // Get a document, forcing the SDK to fetch from the offline cache.
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        res.status(200).json({ datas: docSnap.data() })
      } else {
        // doc.data() will be undefined in this case
        res.status(404).json({ info: "document not found" })
      }
    } catch (e) {
      res.status(500).json({ info: "something went wrong" })
    }




  }
  else if (method == "POST") {
    const { passcode } = req.body

    const docRef = doc(db, "datas", id);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data()
        if (data.passcode == passcode) {
          res.status(200).json({ res: "good" })
        }
        else {
          res.status(200).json({ res: "bad" })
        }
      } else {
        // doc.data() will be undefined in this case
        res.status(404).json({ info: "document not found" })
      }
    } catch (e) {
      res.status(500).json({ info: "something went wrong" })
    }

  }



}
