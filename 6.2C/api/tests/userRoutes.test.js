import { describe, it, expect } from 'bun:test';
import supertest from 'supertest';

describe('User Routes', async () => {
  const API_URL = 'http://localhost:3000/api/users';

  it('should return all users', async () => {
    const response = await supertest(API_URL).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should create a user', async () => {
    const response = await supertest(API_URL).post('/').send({ name: 'John Doe', studentId: '123456' });

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
  });

  it('should update a user', async () => {
    const createdUser = await supertest(API_URL).post('/').send({ name: 'John Doe', studentId: '123456' });
    const response = await supertest(API_URL).put(`/${createdUser.body._id}`).send({ name: 'Jane Doe', studentId: '654321' });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should delete a user', async () => {
    const createdUser = await supertest(API_URL).post('/').send({ name: 'John Doe', studentId: '123456' });
    const response = await supertest(API_URL).delete(`/${createdUser.body._id}`);

    expect(response.status).toBe(200);
  });

  it('should throw an error when updating a non-existing user', async () => {
    const response = await supertest(API_URL).put('/non-existing-id').send({ name: 'Jane Doe', studentId: '654321' });

    expect(response.status).toBe(500);
  });

  it('should throw an error when deleting a non-existing user', async () => {
    const response = await supertest(API_URL).delete('/non-existing-id');

    expect(response.status).toBe(500);
  });

  it('should throw an error when creating a user with missing fields', async () => {
    const response = await supertest(API_URL).post('/').send({ name: 'John Doe' });

    expect(response.status).toBe(400);
  });
});
