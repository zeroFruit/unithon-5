import expect from 'expect';
import request from 'supertest';

import { app } from '../../index';
import { User } from '../../model/user';
import { Album } from '../../model/album';
import { users, populateUsers, albums } from '../seed/setup';

describe('User 모델', () => {
  beforeEach(populateUsers);

  it('uid로 회원 찾기', done => {
    const userOneUid = users[0].uid;

    User.findByUid(userOneUid).then(user => {
      expect(user[0].uid).toEqual('u1');
      expect(user[0].voiceId).toEqual('v1');

      done();
    });
  });

  it('uid에 해당하는 유저가 없을 때 에러 던지기', done => {
    done();
  });

  it('uid 해당 회원에 album 추가하기', done => {
    const uid = users[0].uid;
    const album = new Album({
      link: 'link',
      description: 'description',
      voiceData: 'voiceData',
      keywords: []
    });

    album.save().then(() => {
      User.addAlbum(uid, album).then(() => {
        User.findOne({ uid }).populate({ path: 'albums' }).then(user => {
          expect(user.albums.length).toBe(1);
          expect(user.albums[0].link).toEqual('link');
          done();
        });
      });
    });
  });

  it('uid로 voiceId 가져오기', () => {

  });
});
