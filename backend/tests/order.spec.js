import request from 'supertest';
import app from '../index';

describe('GET /easycommerce/user-orders', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/easycommerce/user-orders/orders/user/1')
      .expect(200, done);
  });
});

describe('POST /easycommerce/user-orders', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .post('/easycommerce/user-orders/orders/user/1')
      .send({
        total: 100,
        order_state: 'pending',
      })
      .expect(200, done);
  });
});

describe('PUT /easycommerce/user-orders', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .put('/easycommerce/user-orders/orders/1/user/1')
      .send({
        total: 200,
        order_state: 'completed',
      })
      .expect(200, done);
  });
});

describe('DELETE /easycommerce/user-orders', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .delete('/easycommerce/user-orders/orders/1/user/1')
      .expect(200, done);
  });
});