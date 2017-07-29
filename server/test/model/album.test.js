import expect from 'expect';
import request from 'supertest';

import { app } from '../../index';
import { Album } from '../../model/album';
import { albums, populateAlbums } from '../seed/setup';

describe('Album 모델', () => {
  beforeEach(populateAlbums);

  it('DB에 앨범 DOC 추가', done => {
    const album = {
      link: 'link',
      description: 'description'
    };

    new Album(album).add().then(() => {
      Album.findOne({ link: album.link }).then(_album => {
        expect(_album.link).toEqual('link');
        expect(_album.description).toEqual('description');
        done();
      });
    });
  });
});
