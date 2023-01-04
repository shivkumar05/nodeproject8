const express = require("express")
const app = express();
const multer = require("multer")
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const router = require("./src/Routes/route")
const userprofile = require("./src/Models/profile")
const commnMid = require("./src/Middleware/Auth")
const gripModel = require("./src/Models/battingGrip")
const uploadDevice = require("./src/Models/uploadDevice");

const port = process.env.PORT || 3000

app.use(bodyParser.json())

mongoose.set('strictQuery', false);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/images')
    },
    filename: function (req, file, cb) {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5000000000
    }
});

app.use('/image', express.static('./upload/images'))
app.post("/:userId/userProfile", commnMid.jwtValidation, commnMid.authorization, upload.single('image'), async (req, res) => {
    try {
        let data = req.body;
        let file = req.file;

        let { dob, gender, email, contact, height, weight, image } = data
        data.image = `/image/${file.filename}`
        const userCreated = await userprofile.create(data)
        return res.status(201).send({
            data: userCreated
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
});

app.get("/:userId/getImage", commnMid.jwtValidation, commnMid.authorization, async (req, res) => {
    try {
        let body = req.query

        const getImg = await userprofile.find(body)
        return res.status(200).send({
            status: true,
            message: 'Success',
            data: getImg
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
});

app.use('/image', express.static('./upload/images'))
app.post("/:userId/uploadDevice", commnMid.jwtValidation, commnMid.authorization, upload.fields([{ name: 'video', maxCount: 5 }, { name: 'thumbnail', maxCount: 5 }]), async (req, res) => {
    try {
        let data = req.body;
        let file = req.files;
        console.log(file)

        let { video, thumbnail, videoLength, title, category, tag } = data;
        
        data.video = `/video/${file.video[0].filename}`
        data.thumbnail = `/image/${file.thumbnail[0].filename}`

        const uploadDeviceCreated = await uploadDevice.create(data);
        return res.status(201).send({
            data: uploadDeviceCreated
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
});

app.get("/:userId/myVideo", commnMid.jwtValidation, commnMid.authorization, async (req, res) => {
    try {
        let body = req.query;

        const getVideo = await uploadDevice.find(body);
        return res.status(200).send({
            status: true,
            message: 'Success',
            data: getVideo
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
});

app.get("/curriculum", async (req, res) => {
    try {
        let body = req.query;

        const getVideo = await uploadDevice.find(body)
        return res.status(200).send({
            status: true,
            message: 'Success',
            data: getVideo
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
});

app.use('/image', express.static('./upload/videos'))
app.post("/:userId/postGrip", commnMid.jwtValidation, commnMid.authorization, upload.single('video'), async (req, res) => {
    try {
        let data = req.body;
        let file = req.file;

        let { num_reps, num_sets, video } = data;
        data.video = `/video/${file.filename}`

        const GripCreated = await gripModel.create(data)
        return res.status(201).send({
            data: GripCreated
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
});


mongoose.connect("mongodb+srv://Aishwarya123:sg8eJZVpV9e3eEP3@cluster0.gf2pu4l.mongodb.net/Applications")
    .then(() => console.log("Database is connected successfully.."))
    .catch((Err) => console.log(Err))

app.use("/", router)

app.listen(port, function () {
    console.log(`Server is connected on Port ${port} ✅✅✅`)
});
