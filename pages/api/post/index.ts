import {NextApiHandler} from "next";
import {insertPost, PostParam, selectPost, selectPostCnt, selectPostList} from "../../../query/post";
import {verifyAuth} from "../../../lib/auth";

const handler:NextApiHandler = async(req, res)=>{
  try{
    if (req.method === 'POST') {
      const authResult = await verifyAuth({request:req})
      if(authResult.status === 200){
        const result = await insertPost(req.body as PostParam)
        return res.json(result)
      }else{
        return res.status(401).json(authResult.error)
      }
    }else if(req.method === 'GET'){
      const {query} = req
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
    }else if(req.method === 'DELETE'){

    }else{
      return res.status(405).json({
        error: { message: 'Method not allowed' },
      })
    }

  }catch(e:any){
    res.status(500).json({message: e.message})
  }
}

export default handler