import {query} from "../lib/db";

export type LoginParam = {
  user_id:string,
  user_pw:string
}

export type LoginResult = {
  user_id:string,
  user_name:string,
  user_no:number,
  user_role:string
}

export const userSelectByIdAndPw = async({user_id,user_pw}:LoginParam)=>{
  const userData = await query(`
      SELECT 
        user_id,
        user_name,
        user_no,
        user_role
      FROM user_basic
      WHERE user_id = ? and user_pw = sha2(?,256);
    `,[user_id, user_pw])

  const result = Array.isArray(userData) ? userData[0] : undefined
  return result as LoginResult
}