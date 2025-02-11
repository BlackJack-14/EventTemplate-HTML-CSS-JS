import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import RegistrationModel from './submission.js';

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/registration')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

app.post('/api/register', async (req, res) => {
    console.log('Received registration data:', req.body); // Log received data
    try {
        const registration = new RegistrationModel(req.body);
        await registration.save();
        res.status(201).send('Registration successful');
    } catch (error) {
        console.error('Error saving registration:', error);
        res.status(400).send('Registration failed');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
