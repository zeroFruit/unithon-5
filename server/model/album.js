import { mongoose } from '../config/mongodb';

const AlbumSchema = new mongoose.Schema({
  link: String,
  description: String,
  keywords: [String]
});

AlbumSchema.methods.add = function() {
  const album = this;

  return new Promise((resolve, reject) => {
    return album.save()
      .then(() => resolve(album))
      .catch(() => reject());
  });
};

const Album = mongoose.model('Album', AlbumSchema);

module.exports = { Album };
