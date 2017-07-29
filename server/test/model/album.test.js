import expect from 'expect';
import request from 'supertest';

import { app } from '../../index';
import { Album } from '../../model/album';
import { albums, populateAlbums } from '../seed/setup';

describe('Model album', () => {
  beforeEach(populateAlbums);

  it('should say hello world', () => {
    expect(albums.length).toBe(1);
  });
});
