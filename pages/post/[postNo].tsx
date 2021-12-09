import dynamic from "next/dynamic";
import {SWRConfig} from "swr";
import wrapper from "../../store";
import {selectPost} from "../../query/post";

const PostViewDynamic = dynamic(()=> import("../../modules/PostView"),{ssr:false})

const PostViewPage = ({ post })=>{
  return (
    <PostViewDynamic post={post}/>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({query, req})=>{
  const {postNo} = query
  const res = await selectPost(postNo)

  if(!res){
    return{
      props: {
      },
      notFound: true
    }
  }

  return {
    props :{
      post: res
    }
  }

})

export default PostViewPage

