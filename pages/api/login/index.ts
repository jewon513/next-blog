import {NextApiHandler} from "next";
import {setUserCookie} from "../../../lib/auth";


const handler:NextApiHandler = async(req, res)=>{
  try{
    const userData = {
      userName: "jewon",
      userNo: 1
    }
    const result = await setUserCookie(req,res,userData)
    res.json(result)
  }catch(e:any){
    res.status(500).json({message: e.message})
  }
}

export default handler