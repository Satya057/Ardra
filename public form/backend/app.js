const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000;

// MongoDB connection string
const mongoUri = 'mongodb+srv://singhsatyaprakash057:NmiVwH5cMjVYqjGy@cluster0.vpt5qem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (e.g., index.html)

// Routes
app.post('/submit_form', upload.single('resume'), async (req, res) => {
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('your_database_name');
        const collection = database.collection('form_entries');

        const { name, number, email, profile, keySkills, location } = req.body;
        const resume = req.file ? req.file.path : '';

        const document = {
            name,
            number,
            email,
            profile,
            keySkills,
            location,
            resume,
            created_at: new Date()
        };

        const result = await collection.insertOne(document);

        if (result.insertedCount === 1) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false });
    } finally {
        await client.close();
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
