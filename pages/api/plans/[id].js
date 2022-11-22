import { datas, generateUuid } from "../db"

export default function handler(req, res) {
  const method = req.method;
  const { id } = req.query

  if(method == "GET"){
    console.log("datas")
    console.log(datas)
    const data_f = datas.filter((data) => data.id == id)
    res.status(200).json({ datas: data_f })

  }
  else{
      const { passcode } = req.body

      console.log("\n\nhere!!!!")
      console.log("🚀 ~ file: [id].js ~ line 19 ~ handler ~ datas", datas)
      const data_f = datas.filter((data) => {
        return data.id == id
      })
      console.log("\n\n======hereeee")
      console.log(passcode)
      console.log(data_f[0])
      if (data_f === undefined) {
        res.status(404).json({ res: "plan not found" })

      }
      else {
        if (passcode === data_f[0].passcode) {
          res.status(200).json({ res: "good" })
        }
        else {
          res.status(200).json({ res: "bad" })
        }

      }

  }

}
