import Layout from "../components/Layout";
import PostViewHeader from "../components/post/PostViewHeader";
import {Box, Chip, Fade} from "@mui/material";
import useSWR from "swr";
import {fetcher} from "../lib/utils";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import {useRouter} from "next/router";
import PostViewBottom from "../components/post/PostViewBottom";
import {PostType} from "../query/post";
import EmptyPost from "../components/loading/EmptyPost";
import React, {useEffect, useState} from "react"
import {EditorContent, useEditor} from "@tiptap/react";
import useTipTapEditor from "../hooks/useTipTapEditor";


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
    <Layout>
      {(!post && isValidating) && <LoadingSpinner/>}
      {(!post && !isValidating) && <EmptyPost/>}
      {post &&
			<Fade in={true} timeout={500}>
				<Box>
					<PostViewHeader postTitle={post.post_title} postInsDate={post.post_ins_date}/>
          <Box paddingY={2}>
						<EditorContent className={"editor__content"} editor={editor}/>
          </Box>
          {post.post_tags &&
            <Box>
              {post.post_tags.split(",").map(tag => {
                return (
                  <Chip
                    sx={{
                      marginRight: "4px",
                      marginBottom: "4px"
                    }}
                    label={tag}
                    size={"small"}
                    variant={"outlined"}
                    clickable={true}
                  />
                )
              })}
            </Box>
          }
					<PostViewBottom/>
				</Box>
			</Fade>
      }
    </Layout>
  )
}

export default PostView