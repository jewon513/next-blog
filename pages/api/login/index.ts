import {NextApiHandler} from "next";
import {setUserCookie} from "../../../lib/auth";
import {query} from "../../../lib/db";

export type LoginParam = {
  user_id:string,
  user_pw:string
}
export type LoginResult = {
  code: 0 | 1,
  data: any,
  message: string
}

const handler:NextApiHandler = async(req, res)=>{
  try{

    if (req.method !== 'POST') {
      return res.status(405).json({
        error: { message: 'Method not allowed' },
      })
    }

    const {user_id, user_pw} = req.body as LoginParam
    const userData = await query(`
      SELECT 
        user_id,
        user_name,
        user_no,
        user_role
      FROM user_basic
      WHERE user_id = ? and user_pw = sha2(?,256);
    `,[user_id, user_pw])

    const payload = Array.isArray(userData) ? userData[0] : undefined

    const result: LoginResult = {
      code : 0,
      data : null,
      message : "Login failure"
    }
    if(payload){
      await setUserCookie(req,res,payload)
      result.code = 1
      result.data = payload
      result.message = "Login Success"
    }

    res.json(result)
  }catch(e:any){
    res.status(500).json({message: e.message})
  }
}

export default handler