import multer from 'multer';
import path from 'path';

// Configure multer storage to save files in the new assets folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Change the destination to your desired path
        cb(null, path.join('D:', 'My Files', 'Spotify Full Stack', 'Spotify-clone', 'spotify', 'src', 'assets'));
    },
    filename: (req, file, cb) => {
        // Create a unique filename
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer
const upload = multer({ storage });

// Define upload fields for audio and image
export const uploadFields = upload.fields([
    { name: 'audio', maxCount: 1 }, // Accept one audio file
    { name: 'image', maxCount: 1 }  // Accept one image file
]);
export default upload;