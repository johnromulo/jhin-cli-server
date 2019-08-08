import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';
import insert from '../../util/insertData';
import { baseURL } from '../../util/config';

jest.setTimeout(30000);

describe('AccessManagement update', () => {
  const client_key_web = 'clientkey_web';
  const client_secret_web = 'client_secret_web';

  beforeEach(async () => {
    await truncate();
    await insert();
  });

  it('should be able update send roles and parmissions', async () => {
    const user = await factory.create('User');

    const {
      body: { access },
    } = await request(app)
      .post(`${baseURL}/auth`)
      .set('client_key', client_key_web)
      .set('client_secret', client_secret_web)
      .send({
        email: 'admin@teste.com',
        password: 'admin1234',
      });

    const response = await request(app)
      .put(`${baseURL}/access/${user.id}/management`)
      .set('Authorization', `Bearer ${access.token}`)
      .send({
        permissions: ['LOGIN_MOBILE'],
        roles: ['USER_ADMIN'],
      });

    expect(response.body).toHaveProperty('roles');
    expect(response.body).toHaveProperty('permissions');
    expect(response.status).toBe(200);
  });

  it('should be able update remove roles and permisions', async () => {
    const user = await factory.create('User');

    const {
      body: { access },
    } = await request(app)
      .post(`${baseURL}/auth`)
      .set('client_key', client_key_web)
      .set('client_secret', client_secret_web)
      .send({
        email: 'admin@teste.com',
        password: 'admin1234',
      });

    const response = await request(app)
      .put(`${baseURL}/access/${user.id}/management`)
      .set('Authorization', `Bearer ${access.token}`)
      .send({
        permissions: [],
        roles: [],
      });

    expect(response.body).toHaveProperty('roles');
    expect(response.body).toHaveProperty('permissions');
    expect(response.status).toBe(200);
  });

  it('should not be able update Validation fails', async () => {
    const user = await factory.create('User');

    const {
      body: { access },
    } = await request(app)
      .post(`${baseURL}/auth`)
      .set('client_key', client_key_web)
      .set('client_secret', client_secret_web)
      .send({
        email: 'admin@teste.com',
        password: 'admin1234',
      });

    const response = await request(app)
      .put(`${baseURL}/access/${user.id}/management`)
      .set('Authorization', `Bearer ${access.token}`)
      .send({
        permissions: [1, 2, 4],
        roles: [1, 4, 5],
      });

    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('messages');
    expect(Array.isArray(response.body.messages)).toBe(true);
    expect(response.status).toBe(400);
  });

  it('should not be able update User does not exists', async () => {
    const {
      body: { access },
    } = await request(app)
      .post(`${baseURL}/auth`)
      .set('client_key', client_key_web)
      .set('client_secret', client_secret_web)
      .send({
        email: 'admin@teste.com',
        password: 'admin1234',
      });

    const response = await request(app)
      .put(`${baseURL}/access/0/management`)
      .set('Authorization', `Bearer ${access.token}`)
      .send({
        permissions: [],
        roles: ['USER_ADMIN'],
      });

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('User does not exists');
    expect(response.status).toBe(400);
  });
});
