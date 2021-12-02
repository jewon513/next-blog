import Layout from "../components/Layout";
import useGetPost from "../hooks/useGetPost";

const PostView = ()=>{

  const [postState, post] = useGetPost()

  return (
    <Layout>

    </Layout>
  )
}

export default PostView