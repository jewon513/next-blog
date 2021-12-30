import PostViewHeader from "../components/post/PostViewHeader";
import {Box, Chip, Fade, Stack} from "@mui/material";
import useSWR from "swr";
import {fetcher} from "../lib/utils";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import {useRouter} from "next/router";
import PostViewBottom from "../components/post/PostViewBottom";
import {PostType} from "../query/post";
import ErrorContent from "../components/loading/ErrorContent";
import React, {useEffect} from "react"
import {EditorContent} from "@tiptap/react";
import useTipTapEditor from "../hooks/useTipTapEditor";
import Link from "next/link"

const PostView = ()=> {

  const router = useRouter()
  const postNo = router.query.postNo
  const {data: post, isValidating} = useSWR<PostType>(`/api/post?postNo=${postNo}`, fetcher, {revalidateOnFocus: false})

  const editor = useTipTapEditor("", false)

  useEffect(() => {
    if (editor && post) {
      editor?.chain()?.setContent(post.post_contents)?.run()
    }
  }, [post, editor])

  return (
    <>
      {(!post && isValidating) && <LoadingSpinner/>}
      {(!post && !isValidating) && <ErrorContent text={"포스트가 존재하지 않습니다."}/>}
      {post &&
			<Fade in={true} timeout={500}>
				<Box>
					<PostViewHeader postTitle={post.post_title} postInsDate={post.post_ins_date}/>
					<Box paddingY={2}>
						<EditorContent className={"editor__content"} editor={editor}/>
					</Box>
          {post.post_tags &&
					<Stack direction="row" spacing={1}>
            {post.post_tags.split(",").map((tag, index) => {
              return (
                <Link href={{pathname: "/list/[pageNo]", query: {pageNo: 1, tagName: tag}}} key={index}>
                  <Chip
                    key={index}
                    label={tag}
                    size={"small"}
                    variant={"outlined"}
                    clickable={true}
                  />
                </Link>
              )
            })}
					</Stack>
          }
					<PostViewBottom/>
				</Box>
			</Fade>
      }
    </>
  )
}

export default PostView