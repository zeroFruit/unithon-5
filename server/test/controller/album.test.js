import expect from 'expect';
import request from 'supertest';
import { app } from '../../index';

describe.only('/analysis', () => {
  it('분석값 반환', done => {
    const body = {
      url: 'http://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg'
    };

    request(app)
      .post('/analysis')
      .send(body)
      .expect(200)
      .expect(res => {
        console.log(res.body);
        done();
      });
  });
});
