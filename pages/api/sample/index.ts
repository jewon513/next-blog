import {NextApiHandler} from "next";
import {verifyAuth} from "../../../lib/auth";

const handler:NextApiHandler = async(req, res)=>{
  try{
    const result = await verifyAuth({request:req})
    res.json(result)
  }catch(e:any){
    res.status(500).json({message: e.message})
  }
}

export default handler