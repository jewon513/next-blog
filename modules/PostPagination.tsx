import {Box, Pagination} from "@mui/material";
import {useRouter} from "next/router";

const PostPagination = ({pageNo, lastPostNo})=>{

  const router = useRouter()

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Pagination
        page={pageNo}
        count={lastPostNo}
        color="primary"
        onChange={(event, pageNo) => {
          router.push({
            pathname: "/list/[pageNo]",
            query: {pageNo: pageNo}
          })
        }}
      />
    </Box>
  )
}

export default PostPagination