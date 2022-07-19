import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const {name, ext} = path.parse(file.originalname);
        cb(null, `${name}-${Date.now()}${ext}`);
    }
});

const upload = multer({ storage });
const app = express();
dotenv.config();

const port = process.env.PORT || 5000;
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.post('/upload', upload.single('file'), (req, res) => {
    return res.send("Uploaded");
});

app.listen(port, () => {
    console.log(`Running on ${port}`);
});

