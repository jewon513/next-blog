import dynamic from "next/dynamic";
import wrapper from "../../store";

const PostWriteDynamic = dynamic(()=> import("../../modules/PostWrite"),{ssr:false})

const WritePage = ({test})=>{
  return (
    <PostWriteDynamic test={test}/>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async(appContext)=>{

  return {
    props : {test:"test"}
  }
})

export default WritePage