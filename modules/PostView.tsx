import Layout from "../components/Layout";
import PostViewHeader from "../components/post/PostViewHeader";
import {Box} from "@mui/material";
import useSWR from "swr";
import {fetcher} from "../lib/utils";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import {useRouter} from "next/router";
import PostViewBottom from "../components/post/PostViewBottom";
import {PostType} from "../query/post";

const PostView = ()=> {

  const router = useRouter()
  const postNo = router.query.postNo
	const {data:post} = useSWR<PostType>(`/api/post?postNo=${postNo}`, fetcher, {revalidateOnFocus: false})

  return (
    <Layout>
			{!post && <LoadingSpinner/>}
			{post &&
			<>
				<PostViewHeader postTitle={post.post_title} postInsDate={post.post_ins_date}/>
				<Box className={"editor__content"} dangerouslySetInnerHTML={{__html: post.post_contents as string}}/>
        <PostViewBottom/>
			</>
			}
    </Layout>
  )
}

export default PostView