import {NextApiHandler} from "next";
import {
  deletePost,
  insertPost,
  PostParam,
  selectPost,
  selectPostCnt,
  selectPostList,
  updatePost
} from "../../../query/post";
import {verifyAuth} from "../../../lib/auth";

const handler:NextApiHandler = async(req, res)=>{
  try{
    const {query} = req
    switch (req.method){
      case 'POST' :
        const authResult = await verifyAuth({request:req})
        if(authResult.status === 200){
          const param = req.body as PostParam
          if(param.post_no){
            const result = await updatePost(req.body)
            return res.json(result)
          }else{
            const result = await insertPost(req.body)
            return res.json(result)
          }
        }else{
          return res.status(401).json(authResult.error)
        }
        break;
      case 'GET' :
        if(query?.postNo){
          const result = await selectPost(query.postNo)
          return res.json(result)
        }else if(query?.pageNo && query?.pagePerCnt){
          const result = await selectPostList({pageNo:query.pageNo, pagePerCnt:query.pagePerCnt})
          const {cnt} = await selectPostCnt()
          return res.json({
            list:result,
            cnt:cnt
          })
        }else{
          return res.status(400).json({
            error: { message: 'Missing required parameters' },
          })
        }
        break;
      case 'DELETE' :
        if(query?.postNo){
          const result = await deletePost(query?.postNo)
          return res.json(result)
        }else{
          return res.status(400).json({
            error: { message: 'Missing required parameters' },
          })
        }
        break;
      default :
        res.status(405).json({
          error: { message: 'Method not allowed' },
        })
        break;
    }
  }catch(e:any){
    res.status(500).json({message: e.message})
  }
}

export default handler