import { mongoose } from '../config/mongodb';

const AlbumSchema = new mongoose.Schema({
  link: String,
  description: String,
  voiceData: String,
  keywords: [String]
});

const Album = mongoose.model('Album', AlbumSchema);

module.exports = { Album };
