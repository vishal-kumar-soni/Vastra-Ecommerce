import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'


const uploadOnCloudinary = async (req, res) => {
    try {
        console.log(req.file)
        const localPath = req.file?.path

        if (!localPath) {
            return res.status(400).json({
                success:false,
                message:"File path missing"
            })
        }

        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: 'image'
        })

        console.log("Successfully uploaded on cloudinary")

        fs.unlinkSync(localPath)

        if (!response) {
            return res.status(400).json({
                success:false,
                message:"Error in response"
            })
        }
        
        return res.status(200).json({
            success:true,
            message:"File upload successfull",
            image_url:response.secure_url
        })


    } catch (error) {

        // if (req.file?.path && fs.existsSync(req.file.path)) {
        //     fs.unlinkSync(req.file.path)
        // }

        return res.status(500).json({
            success:false,
            message:"Upload failed",
            data:error
        })
    }
}

export {uploadOnCloudinary}