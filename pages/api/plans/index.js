import { datas, generateUuid, generatePasscode } from "../db"
import { db } from "../../../lib/firebase-admin-config";
import { arrayToObj, venueArrayToObj } from "../../../lib/util";


export default async function handler(req, res) {
  const method = req.method;

  if (method == "GET") {
    res.status(200).json({ info: "not allowed" })
  }
  else {
    const passcode = generatePasscode()
    const { name, date, time, location, deadline, host_id, venue } = req.body
    try {
      const ref = db.collection("datas");
      const resAdd = await ref.add({
        name: name,
        date: arrayToObj(date),
        time: arrayToObj(time),
        passcode: passcode,
        location: arrayToObj(location),
        deadline: deadline,
        venue: venueArrayToObj(venue, location),
        host_id: host_id,
      });
      // const docRef = await db.addDoc(collection(db, "datas"), {
      //   name: name,
      //   date: arrayToObj(date),
      //   time: arrayToObj(time),
      //   passcode: passcode,
      //   location: arrayToObj(location),
      //   deadline: deadline,
      //   venue: venueArrayToObj(venue, location),
      //   host_id: host_id,
      // });
      console.log("Document written with ID: ", resAdd.id);
      res.status(200).json({ id: resAdd.id, passcode: passcode })
    } catch (e) {
      console.error("Error adding document: ", e);
      res.status(500).json({ info: "something went wrong to add data for writing to firestore" })
    }
  }

}