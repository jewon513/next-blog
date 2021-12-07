import Layout from "../components/Layout";
import PostList from "../components/list/PostList";
import useGetPostList from "../hooks/useGetPostList";
import {Box, Grid, Pagination} from "@mui/material";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import {useRouter} from "next/router";

const MainList = ()=> {

  const router = useRouter();
  const [postList, lastPostNo, setPostListPageNo] = useGetPostList(3)

  return (
    <Layout>
      {!postList && <LoadingSpinner/>}
      {postList &&
      postList.map((post, index) => {
        return (
          <PostList
            key={post.post_no}
            title={post.post_title}
            subTitle={post.post_subtitle}
            date={post.post_ins_date}
            onClick={()=>{
              router.push({pathname:"/post/[postNo]",query:{postNo:post.post_no}})
            }}
          />
        )
      })
      }
      <Box display={"flex"} justifyContent={"center"}>
        <Pagination count={lastPostNo} color="primary" onChange={(event, pageNo) => {
          setPostListPageNo(pageNo)
        }} sx={{
          display: postList ? "block" : "none"
        }}/>
      </Box>
    </Layout>
  )

}

export default MainList