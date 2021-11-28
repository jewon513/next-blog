import dynamic from "next/dynamic";

const PostWriteDynamic = dynamic(()=> import("../../modules/PostWrite"),{ssr:false})

const WritePage = ()=>{
  return (
    <PostWriteDynamic/>
  )
}

export default WritePage