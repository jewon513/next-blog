import {NextApiHandler} from "next";
import {
  deletePost,
  insertPost,
  selectPost,
  selectPostCnt,
  selectPostList,
  updatePost
} from "../../../query/post";
import {verifyAuth} from "../../../lib/auth";

const handler:NextApiHandler = async(req, res)=>{
  try{
    const {query, body} = req
    const authResult = await verifyAuth({request:req})
    switch (req.method){
      case 'POST' :
        if(authResult.status === 200){
          if(body.post_no){
            const result = await updatePost(body)
            res.json(result)
          }else{
            const result = await insertPost(body)
            res.json(result)
          }
        }else{
          res.status(401).json(authResult.error)
        }
        break;
      case 'GET' :
        if(query?.postNo){
          const result = await selectPost(query.postNo)
          res.json(result)
        }else if(query?.pageNo && query?.pagePerCnt){
          const result = await selectPostList({pageNo:query.pageNo, pagePerCnt:query.pagePerCnt})
          const {cnt} = await selectPostCnt()
          res.json({
            list:result,
            cnt:cnt
          })
        }else{
          res.status(400).json({
            error: { message: 'Missing required parameters' },
          })
        }
        break;
      case 'DELETE' :
        if(authResult.status === 200){
          if(query?.postNo){
            const result = await deletePost(query?.postNo)
            res.json(result)
          }else{
            res.status(400).json({
              error: { message: 'Missing required parameters' },
            })
          }
        }else{
          res.status(401).json(authResult.error)
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