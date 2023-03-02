import supertest from 'supertest';

const base_url = 'http://localhost:5000/api';

describe('collector', () => {
  describe('get all collectors', () => {
    it('should return an array of collectors', async () => {
      const response = await supertest(base_url).get('/all');
      expect(response.statusCode).toBe(200);
    });
  });
});
