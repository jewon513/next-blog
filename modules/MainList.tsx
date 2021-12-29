import PostList from "../components/list/PostList";
import useGetPostList from "../hooks/useGetPostList";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import {useRouter} from "next/router";
import PostPagination from "./PostPagination";
import {stringConvertToInteger} from "../lib/utils";
import {Box, Typography} from "@mui/material";

const MainList = () => {

  const router = useRouter();
  const pageNo = stringConvertToInteger(router.query.pageNo, 1)
  const tagName = router.query.tagName ? router.query.tagName : ''
  const pagePerCnt = 10

  const [postList, isValidating, lastPostNo] = useGetPostList({pageNo, pagePerCnt, tagName})

  return (
    <>
      {!postList && <LoadingSpinner/>}
      {postList &&
			<>
        {tagName &&
          <Box paddingY={1}>
            <Typography variant={"h5"} sx={{
              fontWeight:"bold"
            }}>
              Tag: {tagName}
            </Typography>
          </Box>
        }
        {
          postList.map((post, index) => {
            return (
              <PostList
                key={post.post_no}
                title={post.post_title}
                subTitle={post.post_subtitle}
                date={post.post_ins_date}
                index={index}
                tags={post.post_tags}
                postNo={post.post_no}
              />
            )
          })
        }
				<PostPagination pageNo={pageNo} lastPostNo={lastPostNo}/>
			</>
      }
    </>
  )
}

export default MainList