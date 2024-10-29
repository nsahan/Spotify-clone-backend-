// albumModel.js
import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    bgColour: { type: String },
    imageUrl: { type: String, required: true } // Change `image` to `imageUrl`
});

export default mongoose.model('Album', albumSchema);
