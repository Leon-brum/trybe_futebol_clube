import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { loginMock, tokenMock, tokenInvalidMock } from './Moks/loginMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do Login', () => {
  describe('Caso de sucesso', () => {
    it('Login usando o token', async function () {
      sinon.stub(SequelizeUser, 'findOne').resolves(loginMock as any);
     sinon.stub(bcrypt, 'compare').resolves(true);
     sinon.stub(jwt, 'verify').resolves({id: 1});

      const {status, body} = await chai.request(app).get('/login/role')
      .set('authorization', tokenMock);

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({role: 'admin'});
    });
  });
  describe('Caso de falha', () => {
    it('Retorna erro ao logar com token incorreto', async function () {
      sinon.stub(SequelizeUser, 'findOne').resolves(loginMock as any);
      sinon.stub(bcrypt, 'compare').resolves(true);
      sinon.stub(jwt, 'verify').rejects(new Error());

      const {status, body} = await chai.request(app).get('/login/role')
      .set('authorization', tokenInvalidMock);
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({message: 'Token must be a valid token'});
    });
    it('Retorna erro se o token estiver ausente', async function () {
      sinon.stub(SequelizeUser, 'findOne').resolves(loginMock as any);
      sinon.stub(bcrypt, 'compare').resolves(true);
      sinon.stub(jwt, 'verify').rejects(new Error());
      const {status, body} = await chai.request(app).get('/login/role')

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({message: 'Token not found'});
    });
    it('Retorna erro se o email for ausente', async function () {
      const { status, body } = await chai.request(app).post('/login').send({ password: 'secret_admin' });

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
    })
    it('Retorna erro caso o email esteja incorreto', async function () {
      const { status, body } = await chai.request(app).post('/login').send({ email: 'leohacker@hotmail', password: 'secret_admin' });

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
    })
  });
  afterEach(sinon.restore);
});