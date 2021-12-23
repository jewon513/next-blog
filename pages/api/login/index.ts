import {setUserCookie} from "../../../lib/auth";
import {LoginParam, LoginResult, userSelectByIdAndPw} from "../../../query/user";
import {ApiResult} from "../../../lib/types";
import handler from "../../../lib/handler";

handler.post("/api/login",async(req,res)=>{
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
})

export default handler