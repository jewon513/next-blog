import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import multer from "multer"
import app from "../../../lib/firebase";
import dayjs from "../../../lib/dayjs";
import handler from "../../../lib/handler";


const storage = multer.memoryStorage()
const upload = multer({storage: storage})

handler.use(upload.single("image"))

handler.post( async (req, res)=>{
  const filename = `temp/${dayjs().format()}_${req["file"].originalname}`
  const storage = getStorage(app)
  const imgRef = ref(storage, filename)
  const result = await uploadBytes(imgRef, req["file"].buffer)
  const url = await getDownloadURL(imgRef)
  res.status(200).json({
    url: url,
    filename: filename
  })
});

export const config = {
  api: {
    bodyParser: false
  }
}

export default handler