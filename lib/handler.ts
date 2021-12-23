import nextConnect from "next-connect";
import {NextApiRequest, NextApiResponse} from "next";

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch: (req, res, next) => {
    res.status(404).end("Request is not found");
  },
  onError:(err, req, res, next) => {
    console.log(err)
    res.status(500).end(err)
  }
})

export default handler