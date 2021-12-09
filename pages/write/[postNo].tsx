import dynamic from "next/dynamic";
import wrapper from "../../store";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {PostResult, selectPost} from "../../query/post";

const PostWriteDynamic = dynamic(()=> import("../../modules/PostWrite"),{ssr:false})

const WritePage = ({post})=>{

  return (
    <PostWriteDynamic post={post}/>
  )

}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({query, req}) => {
  let postData: PostResult = {
    post_title:"",
    post_subtitle:"",
    post_contents:"",
    post_no:0,
    post_ins_date:"",
    post_user_no:0
  }
  if (Number(query.postNo)) {
    postData = await selectPost(query.postNo)
  }
  return {
    props: {
      post:postData
    }
  }
})

export default WritePage