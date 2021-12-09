import dynamic from "next/dynamic";
import wrapper from "../../store";

const PostWriteDynamic = dynamic(()=> import("../../modules/PostWrite"),{ssr:false})

const WritePage = ()=>{
  return (
    <PostWriteDynamic/>
  )
}

export default WritePage