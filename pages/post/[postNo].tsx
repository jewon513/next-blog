import dynamic from "next/dynamic";
import wrapper from "../../store";

const PostViewDynamic = dynamic(()=> import("../../modules/PostView"),{ssr:false})

const PostViewPage = ()=>{

  return (
    <PostViewDynamic/>
  )

}

export default PostViewPage

