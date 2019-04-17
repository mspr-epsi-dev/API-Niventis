process.env.NODE_ENV = 'test';

const httpMessage = require('../../init/httpMessages');
const chaiHttp = require ('chai-http');
const app = require ('../../bin/app');
const routes = require('../../init/routes');
const formularMockup = require('./formularMockup.json');


const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

chai.use(chaiHttp);


const chaiExclude = require('chai-exclude');
chai.use(chaiExclude);

describe('save formular', () => {

    it('200 ok', (done) => {

        chai.request(app)
        .post(routes.baseUrl + routes.formular)
        .send(formularMockup)
        .end((err, res,  body) => {

            if(err){

                done(err);

            }else{
                
                should.exist(res.body);
                res.should.have.status(200);
                res.body.doc.should.be.a('object');
                res.body.doc.should.have.property('message');
                res.body.doc.should.have.property('participantId');                
                res.body.doc.should.have.property('date');
                res.body.doc.should.have.property('openQuestion');
                res.body.doc.openQuestion.should.be.a('object');
                res.body.doc.openQuestion[0].should.have.property('libelle');
                res.body.doc.openQuestion[0].should.have.property('answer');
                res.body.doc.should.have.property('qcmQuestion');
                res.body.doc.qcmQuestion[0].should.have.property('libelle');
                res.body.doc.qcmQuestion[0].should.have.property('answer');
                done();

            }
            
        });

    });

    it('404 not found', (done) => {

        chai.request(app)
        .post(routes.baseUrl + routes.formular + "/404")
        .send(formularMockup)
        .end((err, res,  body) => {

            if(err){

                done(err);

            }else{

                res.should.have.status(404);
                res.body.should.be.a('object');

                done();

            }
            
        });

    });

    it('400 bad request', (done) => {

        chai.request(app)
        .post(routes.baseUrl + routes.formular)
        .send({"test" : "test"})
        .end((err, res,  body) => {

            if(err){

                done(err);

            }else{

                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql(httpMessage["400"].missformedRessource);

                done();

            }
            
        });

    });

});