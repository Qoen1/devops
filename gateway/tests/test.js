const {ExpectationFailed} = require('http-errors')
const request = require('supertest')
const app = require('../app')

describe('Get response', () => {  
  it('should get a response', async () => {
    const response = await request(app).get('/yeet')
    await expect(response.status).toBe(200)
    await expect(response.text).toBe('YEETT')
  });
});