import { mongoose } from '../config/mongodb';

const AlbumSchema = new mongoose.Schema({
  uid: String,
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

AlbumSchema.statics.getAlbumsByUid = function(uid) {
  const Album = this;

  return Album.find({ uid });
}

const Album = mongoose.model('Album', AlbumSchema);

module.exports = { Album };
