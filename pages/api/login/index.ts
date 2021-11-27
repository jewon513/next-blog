import {NextApiHandler} from "next";
import {setUserCookie} from "../../../lib/auth";
import {LoginParam, LoginResult, userSelectByIdAndPw} from "../../../query/user";
import {ApiResult} from "../../../lib/types";

const handler:NextApiHandler = async(req, res)=>{
  try{

    if (req.method !== 'POST') {
      return res.status(405).json({
        error: { message: 'Method not allowed' },
      })
    }

    const {user_id, user_pw} = req.body as LoginParam
    const userData = await userSelectByIdAndPw({user_id, user_pw})
    const result: ApiResult<null | LoginResult> = {
      code : 0,
      data : null,
      message : "Login failure"
    }
    if(userData){
      await setUserCookie(req, res, userData)
      result.code = 1
      result.data = userData
      result.message = "Login Success"
    }

    res.json(result)
  }catch(e:any){
    res.status(500).json({message: e.message})
  }
}

export default handler