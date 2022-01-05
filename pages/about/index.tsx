import dynamic from "next/dynamic";


const FroalaModuleDynamic = dynamic(()=> import("../../modules/FroalaModule"),{ssr:false})
const AboutPage = (props)=>{
  return (
    <FroalaModuleDynamic/>
  )}

export default AboutPage