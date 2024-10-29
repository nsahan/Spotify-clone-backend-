import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    album: { type: String, required: true },
    audioUrl: { type: String, required: true },
    imageUrl: { type: String, required: true },
    duration: { type: String, required: true }
});

const songModel =mongoose.models.Song || mongoose.model('Song', songSchema);
export default songModel; // Export the model correctly as Song
