import Layout from "../components/Layout";
import PostList from "../components/list/PostList";
import useGetPostList from "../hooks/useGetPostList";
import {Box, Grid, Pagination} from "@mui/material";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import {useRouter} from "next/router";
import PostPagination from "./PostPagination";

const MainList = () => {

  const router = useRouter();
  const pageNo = router.query.pageNo ? Number(router.query.pageNo) : 1
  const [postList, lastPostNo] = useGetPostList(pageNo, 3)

  return (
    <Layout>
      {!postList && <LoadingSpinner/>}
      {postList &&
			<>
        {
          postList.map((post, index) => {
            return (
              <PostList
                key={post.post_no}
                title={post.post_title}
                subTitle={post.post_subtitle}
                date={post.post_ins_date}
                onClick={() => {
                  router.push({pathname: "/post/[postNo]", query: {postNo: post.post_no}})
                }}
              />
            )
          })
        }
        <PostPagination pageNo={pageNo} lastPostNo={lastPostNo}/>
			</>
      }

    </Layout>
  )

}

export default MainList