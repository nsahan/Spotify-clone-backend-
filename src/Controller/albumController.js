import { v2 as cloudinary } from "cloudinary";
import albumModel from "../model/albumModel.js";

// Add an album
const addAlbum = async (req, res) => {
    try {
        const { name, desc, bgColour } = req.body;
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({ message: "Image file is required" });
        }

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

        // Prepare album data
        const albumData = {
            name,
            desc,
            bgColour,
            imageUrl: imageUpload.secure_url,
        };

        // Save album to MongoDB
        const album = new albumModel(albumData);
        await album.save();

        res.status(201).json({ message: "Album added successfully", album });
    } catch (error) {
        console.error("Error in addAlbum:", error);
        res.status(500).json({ message: "Failed to add album", error: error.message });
    }
};

// List all albums
const listAlbum = async (req, res) => {
    try {
        const albums = await albumModel.find();
        res.status(200).json({ message: "List of albums", albums });
    } catch (error) {
        console.error("Error in listAlbum:", error);
        res.status(500).json({ message: "Failed to fetch albums", error: error.message });
    }
};

// Remove an album by ID
const removeAlbum = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "ID is required" });
        }

        const deletedAlbum = await albumModel.findByIdAndDelete(id);

        if (deletedAlbum) {
            res.json({ success: true, message: "Album removed successfully" });
        } else {
            res.status(404).json({ success: false, message: "Album not found" });
        }
    } catch (error) {
        console.error("Error in removeAlbum:", error);
        res.status(500).json({ success: false, message: "Failed to remove album", error: error.message });
    }
};

export { addAlbum, listAlbum, removeAlbum };
