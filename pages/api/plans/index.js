import { datas, generateUuid, generatePasscode } from "../db"


export default function handler(req, res) {
  const method = req.method;

  switch (method) {
    case "GET": {

      res.status(200).json({ datas: datas })
    }

    case "POST": {
      const id = generateUuid()
      const passcode = generatePasscode()
      const { name, date, location, deadline, host_id } = req.body
      datas.push({
        id: id,
        name: name,
        date: date,
        passcode: passcode,
        location: location,
        deadline: deadline,
        host_id: host_id,
      })
      res.status(200).json({ id: id, passcode: passcode })

    }

    default: {

      res.status(200).json({ name: "default" })
    }
  }


}