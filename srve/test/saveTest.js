process.env.NODE_ENV = 'test';

const httpMessage = require('../controller/httpMessages');
const chaiHttp = require ('chai-http');
const app = require ('../bin/app');
const pharmacieMockup = require('./pharmacieMockup.json');
const PharmacieModel = require('../models/pharmacieModel');
const routes = require('../routes/routeProperties');

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

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql(httpMessage["200"].saveSuccess);
                res.body.doc.should.have.property('name');
                res.body.doc.should.have.property('adress');
                res.body.doc.should.have.property('lattitude');
                res.body.doc.should.have.property('longitude');
                res.body.doc.should.have.property('turnover');
                res.body.doc.should.have.property('trainingNeed');
                res.body.doc.should.have.property('productBought');
                res.body.doc.productBought[0].should.have.property('productName');
                res.body.doc.productBought[0].should.have.property('quantityBoughtPerMonth');
                res.body.doc.productBought[0].should.have.property('productPrice');

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