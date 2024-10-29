import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/Config/mongodb.js';
import connectCloudinary from './src/Config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';

const app = express(); // Initialize app before using it
const port = process.env.PORT || 4000;

async function initializeServices() {
    try {
        await connectDB(); // Connect to MongoDB
        console.log('Database connected successfully.');

        await connectCloudinary(); // Connect to Cloudinary
        console.log('Cloudinary connected successfully.');
    } catch (error) {
        console.error('Error connecting to services:', error);
        process.exit(1); // Exit if connection fails
    }
}

// Middleware setup
app.use(express.json());
app.use(cors());

// Initialize routes
app.use('/api/song', songRouter);
app.use('/api/album',albumRouter)
app.get('/', (req, res) => res.send('API WORKING'));

// Start server after initializing services
initializeServices().then(() => {
    app.listen(port, () => console.log(`Server started on port ${port}`))
       .on('error', (err) => console.error('Server failed to start:', err));
});
