import Layout from "../components/Layout";
import PostList from "../components/list/PostList";
import useGetPostList from "../hooks/useGetPostList";
import {Box, Grid, Pagination} from "@mui/material";
import LoadingSpinner from "../components/loading/LoadingSpinner";

const MainList = ()=> {

  const [postListState, lastPostNo, postList, setPostListPageNo] = useGetPostList(3)

  return (
    <Layout>
      {postListState === "loading" && <LoadingSpinner/>}
      {postListState === "success" &&
      postList.map((post, index) => {
        return (
          <PostList key={post.post_no} title={post.post_title} subTitle={post.post_subtitle} date={post.post_ins_date}/>
        )
      })
      }
      <Box display={"flex"} justifyContent={"center"}>
        <Pagination count={lastPostNo} color="primary" onChange={(event, pageNo) => {
          setPostListPageNo(pageNo)
        }} sx={{
          display: (postListState === "loading" || postList.length < 1) ? "none" : "block"
        }}/>
      </Box>
    </Layout>
  )

}

export default MainList