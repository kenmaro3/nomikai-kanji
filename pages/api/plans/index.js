import { datas, generateUuid, generatePasscode } from "../db"


export default function handler(req, res) {
  const method = req.method;

  if (method == "GET") {
    res.status(200).json({ datas: datas })

  }
  else {
    const id = generateUuid()
    const passcode = generatePasscode()
    const { name, date, location, deadline, host_id, venue } = req.body
    datas.push({
      id: id,
      name: name,
      date: date,
      passcode: passcode,
      location: location,
      deadline: deadline,
      venue: venue,
      host_id: host_id,
    })
    res.status(200).json({ id: id, passcode: passcode })

  }

}