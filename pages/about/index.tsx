import Layout from "../../components/Layout";
import FroalaTestModule from "../../modules/FroalaTestModule";
import dynamic from "next/dynamic";

const FroalaTestModuleDynamic = dynamic(()=> import("../../modules/FroalaTestModule"),{ssr:false})

const AboutPage = ()=>{
  return (
    <Layout>
      <FroalaTestModuleDynamic/>
    </Layout>
  )}

export default AboutPage