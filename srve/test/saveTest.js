process.env.NODE_ENV = 'test';

const httpMessage = require('../init/httpMessages');
const chaiHttp = require ('chai-http');
const app = require ('../bin/app');
const pharmacieMockup = require('./pharmacieMockup.json');
const routes = require('../init/routes');

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

chai.use(chaiHttp);


const chaiExclude = require('chai-exclude');
chai.use(chaiExclude);


describe('save entity', () => {

    it('200 ok', (done) => {

        chai.request(app)
        .post(routes.baseUrl + routes.pharmacies)
        .send(pharmacieMockup)
        .end((err, res,  body) => {

            if(err){

                done(err);

            }else{
                
                should.exist(res.body);
                res.should.have.status(200);
                res.body.doc.should.be.a('object');
                res.body.doc.should.have.property('name');
                res.body.doc.should.have.property('adress');
                res.body.doc.should.have.property('trainingNeed');
                res.body.doc.should.have.property('productBought');
                res.body.doc.productBought[0].should.have.property('productName');
                res.body.doc.productBought[0].should.have.property('quantityBoughtPerMonth');
                res.body.doc.productBought[0].should.have.property('productPrice');
                res.body.doc.should.have.property('gpsCoordinates');
                res.body.doc.gpsCoordinates.should.have.length(2);
                res.body.doc.gpsCoordinates[0].should.be.a('number');
                res.body.doc.gpsCoordinates[1].should.be.a('number');

                done();

            }
            
        });
        

    });

    it('404 not found', (done) => {

        chai.request(app)
        .post(routes.baseUrl + routes.savePharmacie + "/404")
        .send(pharmacieMockup)
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
        .post(routes.baseUrl + routes.pharmacies)
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