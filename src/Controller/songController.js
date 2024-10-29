import { v2 as cloudinary } from 'cloudinary';
import songModel from '../model/songModel.js';
import { request } from 'express';

// Function to add a song
const addSong = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);

        const { name, desc, album } = req.body;

        // Check if audio and image files are present
        const audioFile = req.files?.audio?.[0];
        const imageFile = req.files?.image?.[0];

        if (!audioFile || !imageFile) {
            return res.status(400).json({ message: 'Audio or image file missing' });
        }

        // Upload files to Cloudinary
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: 'video' });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });

        // Calculate duration in mm:ss format
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;

        // Prepare song data
        const songData = {
            name,
            desc,
            album,
            imageUrl: imageUpload.secure_url,
            audioUrl: audioUpload.secure_url,
            duration,
        };

        // Save song to MongoDB
        const song = new songModel(songData);
        const savedSong = await song.save();

        // Return the saved song document
        res.status(201).json({ message: 'Song added successfully', song: savedSong });
    } catch (error) {
        console.error('Error in addSong:', error);
        res.status(500).json({ message: 'Failed to add song', error: error.message || error });
    }
};

// Function to list all songs
const listSong = async (req, res) => {
    try {
        const songs = await songModel.find(); // Retrieve all songs from MongoDB
        res.status(200).json({ message: 'List of songs', songs });
    } catch (error) {
        console.error('Error in listSong:', error);
        res.status(500).json({ message: 'Failed to fetch songs', error: error.message });
    }
};

const removeSong = async (req, res) => {
    try {
        const { id } = req.body;

        // Check if ID is provided in the request body
        if (!id) {
            return res.status(400).json({ success: false, message: "No ID provided" });
        }

        // Attempt to delete the song with the provided ID
        const deletedSong = await songModel.findByIdAndDelete(id);

        if (deletedSong) {
            res.json({ success: true, message: "Song removed successfully" });
        } else {
            res.status(404).json({ success: false, message: "Song not found" });
        }
    } catch (error) {
        console.error('Error in removeSong:', error);
        res.status(500).json({ success: false, message: 'Failed to remove song', error: error.message });
    }
};


export { addSong, listSong, removeSong };
