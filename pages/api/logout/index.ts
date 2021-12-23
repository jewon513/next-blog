import {serialize} from "cookie";
import {USER_TOKEN} from "../../../lib/constants";
import handler from "../../../lib/handler";

handler.post("/api/logout",(req,res)=>{
  res.setHeader('Set-Cookie', serialize(USER_TOKEN, '',{
    maxAge:-1,
    expires: new Date('1970-00-00'),
    path:"/"
  }))
  res.end()
})

export default handler