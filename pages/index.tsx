import wrapper from "../store";

const index = ()=>{

  return (
    <>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({query, req})=>{
  return {
    redirect:{
      destination:"/list/1"
    },
    props:{
    }
  }
})

export default index