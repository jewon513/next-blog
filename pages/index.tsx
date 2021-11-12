import Layout from "../components/Layout";
import PostList from "../components/list/PostList";

const index = ()=>{

  type Post = {
    title:string,
    subTitle:string,
    date:string
  }
  const postList:Array<Post> = [
    {
      title:"Title",
      subTitle:"subTitle",
      date:"2222-02-22"
    },{
      title:"Title",
      subTitle:"subTitle",
      date:"2222-02-22"
    },{
      title:"Title",
      subTitle:"subTitle",
      date:"2222-02-22"
    },{
      title:"Title",
      subTitle:"subTitle",
      date:"2222-02-22"
    },{
      title:"Title",
      subTitle:"subTitle",
      date:"2222-02-22"
    }
  ]

  return (
    <Layout>
      {postList.map((post,index)=>{
        return (
          <PostList key={index} title={post.title} subTitle={post.subTitle} date={post.date}/>
        )
      })}
    </Layout>
  )
}

export default index