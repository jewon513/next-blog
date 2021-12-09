import dynamic from "next/dynamic";
import wrapper from "../../store";

const PostWriteDynamic = dynamic(()=> import("../../modules/PostWrite"),{ssr:false})

const WritePage = ()=>{
  return (
    <PostWriteDynamic/>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async(appContext)=>{

  return {
    props : {

    }
  }
})

export default WritePage