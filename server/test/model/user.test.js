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

      done();
    });
  });

  it('uid에 해당하는 유저가 없을 때 에러 던지기', done => {
    done();
  });


  it('uid로 voiceId 가져오기', () => {

  });
});
