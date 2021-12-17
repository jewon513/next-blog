import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import {verifyAuth} from "../../../lib/auth";
import nextConnect from 'next-connect';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import multer from "multer"

// const handler:NextApiHandler = async(req, res)=>{
//   try{
//     const authResult = await verifyAuth({request:req})
//     if(authResult.status === 200){
//       const firebaseConfig = {
//         apiKey: "AIzaSyCuwLFWdl1_6myuaKXFlhka7CFI6R1qyBM",
//         authDomain: "next-blog-a12b1.firebaseapp.com",
//         projectId: "next-blog-a12b1",
//         storageBucket: "next-blog-a12b1.appspot.com",
//         messagingSenderId: "2313096368",
//         appId: "1:2313096368:web:dc9771afc1cabee8307f75",
//         measurementId: "G-HPT4CC36PK"
//       };
//
//       // Initialize Firebase
//       const firebase = initializeApp(firebaseConfig);
//
//       // storage
//       // const storage =
//     }else{
//       res.status(authResult.status).json(authResult.error)
//     }
//   }catch(e:any){
//     res.status(500).json({message: e.message})
//   }
// }

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch: (req, res, next) => {
    res.status(404).end("Page is not found");
  },
  onError:(err, req, res, next) => {
    console.log(err)
    res.status(500).end(err)
  }
})
const storage = multer.memoryStorage()
const upload = multer({storage: storage})

handler.use(upload.single("image"))
handler.post( async (req, res)=>{
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain:process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const storage = getStorage(app)
  const imgRef = ref(storage, 'temp/test.jpg')
  const result = await uploadBytes(imgRef, req["file"].buffer)
  console.log(result)
  const url = await getDownloadURL(imgRef)
  console.log(url)
  res.status(200).json({ data: 'success'})
});

export const config = {
  api: {
    bodyParser: false
  }
}

export default handler