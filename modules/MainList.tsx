import Layout from "../components/Layout";
import PostList from "../components/list/PostList";
import useGetPostList from "../hooks/useGetPostList";
import {Box, Grid, Pagination} from "@mui/material";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import {useRouter} from "next/router";
import PostPagination from "./PostPagination";
import {useSpring, animated} from "react-spring";

const MainList = () => {

  const router = useRouter();
  const pageNo = router.query.pageNo ? Number(router.query.pageNo) : 1
  const [postList, isValidating, lastPostNo] = useGetPostList(pageNo, 3)

  const props = useSpring({
    to:{
      opacity: 1,
    },
    from:{
      opacity: 0
    },
    config:{
      duration: 300
    }
  })

  return (
    <Layout>
      {!postList && <LoadingSpinner/>}
      {postList &&
			<animated.div style={props}>
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
			</animated.div>
      }

    </Layout>
  )

}

export default MainList