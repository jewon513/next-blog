import Layout from "../components/Layout";
import PostList from "../components/list/PostList";
import {useEffect} from "react";
import axios from "axios";

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

  useEffect(()=>{
    axios.get(`/api/login`).then(result=>{
      axios.get(`/api/sample`).then(result=>{
        console.log(result)
      })
    })
  },[])

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