const { Configuration, OpenAIApi } = require("openai")
const cloudinary = require("cloudinary").v2
require("dotenv").config()
import express from "express"
import multer from "multer"
import fs from "fs"
import cors from "cors"
import {v2 as cloudinary} from 'cloudinary'

const app = express()
app.use(cors())
app.use(express.json())

// Multer setup for handling uploads
const upload = multer({ dest: "uploads/" })

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// OpenAI setup
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
)

app.post("/upload", upload.single("video"), async (req, res) => {
  const videoPath = req.file.path

  try {
    // 1. Upload to Cloudinary
    const cloudRes = await cloudinary.uploader.upload(videoPath, {
      resource_type: "video",
      folder: "videos",
    })

    // 2. Transcribe using Whisper
    const transcription = await openai.createTranscription(
      fs.createReadStream(videoPath),
      "whisper-1"
    )

    fs.unlinkSync(videoPath) // cleanup

    res.json({
      transcript: transcription.data.text,
      cloudinaryUrl: cloudRes.secure_url,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Something went wrong." })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
