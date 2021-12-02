import PostView from "../../modules/PostView";
import dynamic from "next/dynamic";

const PostViewDynamic = dynamic(()=> import("../../modules/PostView"),{ssr:false})

const PostViewPage = ()=>{
  return (
    <PostViewDynamic/>
  )
}

export default PostViewPage