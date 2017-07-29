import { ObjectID } from 'mongodb';

import { Album } from '../../model/album';
import { User } from '../../model/user';

const albumOneId = new ObjectID();

const albums = [{
  _id: albumOneId,
  link: 'link',
  description: 'description',
  voiceData: 'voiceData',
  keywords: ['k1', 'k2', 'k3']
}];

const populateAlbums = done => {
  Album.remove({}).then(() => {
    const albumOne = new Album(albums[0]);

    return Promise.all([albumOne.save()]).then(() => done());
  });
};

const userOneId = new ObjectID();

const users = [{
  _id: userOneId,
  uid: 'u1',
  voiceId: 'v1',
  albums: []
}];

const populateUsers = done => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]);

    return Promise.all([userOne.save()]).then(() => done());
  });
};

module.exports = {
  albums,
  populateAlbums,
  users,
  populateUsers
};
