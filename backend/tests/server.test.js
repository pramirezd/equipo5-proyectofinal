import request from 'supertest';
import app from '../index';

describe('/easycommerce/user-orders', () => {
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
});

describe('/easycommerce/favorites', () => {
describe('GET /easycommerce/favorites', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/easycommerce/favorites/user/1')
      .expect(200, done);
  });
});

describe('POST /easycommerce/favorites', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .post('/easycommerce/favorites/user/1')
      .send({
        product_id: 1,
      })
      .expect(200, done);
  });
});

describe('DELETE /easycommerce/favorites', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .delete('/easycommerce/favorites/user/1/product/1')
      .expect(200, done);
  });
});
});

describe('/easycommerce/cart', () => {
describe('GET /easycommerce/cart', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/easycommerce/cart/')
      .expect(200, done);
  });
});

describe('POST /easycommerce/cart', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .post('/easycommerce/cart/add')
      .send({
        product_id: 1,
        quantity: 1,
      })
      .expect(200, done);
  });
});
});

describe('/easycommerce/users', () => {
describe('POST /easycommerce/users', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .post('/easycommerce/users/register')
      .send({
        name: 'test',
        email: 'test@mail.com',
        password: '123456',
      })
      .expect(200, done);
  });
});

describe('POST /easycommerce/users', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .post('/easycommerce/users/login')
      .send({
        email: 'test@mail.com',
        password: '123456',
      });
  });
});
});

describe('/easycommerce/categories', () => {
describe('GET /easycommerce/categories', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/easycommerce/categories/')
      .expect(200, done);
  });
});

describe('POST /easycommerce/categories', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .post('/easycommerce/categories/')
      .send({
        name: 'test',
      })
      .expect(200, done);
  });
});
});

describe('/easycommerce/products', () => {
describe('GET /easycommerce/products', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/easycommerce/products/')
      .expect(200, done);
  });
});
});