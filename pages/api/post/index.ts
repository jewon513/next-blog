import {
  deletePost,
  insertPost,
  selectPost,
  selectPostCnt,
  selectPostList,
  updatePost
} from "../../../query/post";
import {verifyAuth} from "../../../lib/auth";
import handler from "../../../lib/handler";

handler.post(async(req, res)=>{
  const authResult = await verifyAuth({request:req})
  if(authResult.status === 200){
    if(req.body.post_no){
      const result = await updatePost(req.body)
      res.json(result)
    }else{
      const result = await insertPost(req.body)
      res.json(result)
    }
  }else{
    res.status(401).json(authResult.error)
  }
})

handler.get(async(req, res)=>{
  if(req.query?.postNo){
    const result = await selectPost(req.query.postNo)
    res.json(result)
  }else if(req.query?.pageNo && req.query?.pagePerCnt){
    const result = await selectPostList({pageNo:req.query.pageNo, pagePerCnt:req.query.pagePerCnt})
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
})

handler.delete(async(req, res)=>{
  const authResult = await verifyAuth({request:req})
  if(authResult.status === 200){
    if(req.query?.postNo){
      const result = await deletePost(req.query?.postNo)
      res.json(result)
    }else{
      res.status(400).json({
        error: { message: 'Missing required parameters' },
      })
    }
  }else{
    res.status(401).json(authResult.error)
  }
})

export default handler