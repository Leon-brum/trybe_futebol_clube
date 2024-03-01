import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { Teams } from './Moks/teamMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do Team', () => {
  it('Deve retorna todos os times', async function () {
    sinon.stub(SequelizeTeam, 'findAll').resolves(Teams as any);
    const { status, body } = await chai.request(app).get('/teams')
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.equal(Teams);
  });

  it('Deve retornar o Team pelo ID', async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(Teams[2] as any);

    const { status, body } = await chai.request(app).get('/teams/5')
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.equal(Teams[2]);
  });

  it('Deve retornar um erro caso o Team nao exista', async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/100')
    expect(status).to.be.eq(404);
    expect(body).to.be.deep.equal({ message: 'Team 100 not found' });
  });
  afterEach(sinon.restore);
});