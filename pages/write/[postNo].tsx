import wrapper from "../../store";
import {PostType, selectPost} from "../../query/post";
import PostWrite from "../../modules/PostWrite";

const WritePage = ({post})=>{

  return (
      <PostWrite post={post}/>
  )

}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({query, req}) => {
  let postData: PostType = {
    post_title:"",
    post_subtitle:"",
    post_contents:"",
    post_no:0,
    post_ins_date:"",
    post_user_name: "",
    post_tags: ""
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