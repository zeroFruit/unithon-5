import expect from 'expect';
import request from 'supertest';
import { app } from '../../index';
import { Album } from '../../model/album';
import { albums, populateAlbums } from '../seed/setup';

describe.only('POST /album', () => {
  beforeEach(populateAlbums);

  it('album 업로드', (done) => {
    request(app)
      .post('/album')
      .send({
        link: 'link',
        uid: 'uid'
      })
      .expect(200)
      .expect(res => done());
  });
});
