import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { matcheMock, matcheFinishMock, tokenMock, matchEqual } from './Moks/matchesMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do Matches', async () => {
  describe('Caso de sucesso', async () => {
    it('Deve retornar todas as Matche', async function () {
      sinon.stub(SequelizeMatches, 'findAll').resolves(matcheMock as any);
      const {status, body } = await chai.request(app).get('/matches');
  
      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
    });
    it('Retorna partidas finalizadas', async function () {
      sinon.stub(SequelizeMatches, 'findOne').resolves(matcheFinishMock as any);
      const {status, body } = await chai.request(app).get('/matches?inProgress=false');
  
      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
    });
    it('Retorna partidas nao finalizadas', async function () {
      sinon.stub(SequelizeMatches, 'findOne').resolves(matcheMock as any);
      const {status, body } = await chai.request(app).get('/matches?inProgress=true');
  
      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
    });
    it('Deve ser possivel atualizar partidas', async function () {
      const { status, body } = await chai.request(app).patch('/matches/1').set('authorization', tokenMock).send({homeTeamGoals: 2, awayTeamGoals: 0});
      expect(body).to.be.an('object');
    })
  })
  describe('Caso de falha', async () => {
    it('Retorna erro caso os IDs estejam iguais', async function () {
      sinon.stub(SequelizeMatches, 'create').resolves(matchEqual as any);
  
      const { status, body } = await chai.request(app).post('/matches').set('authorization', tokenMock).send({homeTeamId: 16, awayTeamId: 16, homeTeamGoals: 1, awayTeamGoals: 0});
  
      expect(status).to.be.equal(401);
      expect(body).to.be.an('object');
    });
  })
  afterEach(sinon.restore);
});