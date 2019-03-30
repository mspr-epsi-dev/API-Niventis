process.env.NODE_ENV = 'test';

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


describe('update entity', () => {

    it('200 ok', (done) => {


        var pharmacieId = "";
        chai.request(app) //get all pharmacie
            .get(routes.baseUrl + routes.getAllPharmacies)
            .end((err, res, body) => {

                pharmacieId = res.body[0]._id; //select the first one
                nameBeforeModification = res.body[0].name;
                nameAfterModification = nameBeforeModification + " modified";

                //modify the selected pharmacie
                chai.request(app)
                .put(routes.baseUrl + routes.updatePharmacie + "?id=" + pharmacieId)
                .send({name: nameAfterModification})
                .end((err, res,  body) => {
        
                    if(err){
        
                        done(err);
        
                    }else{
                        
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('successfully updated document !');
                        expect(res.body.newDocument.name).to.deep.equal(nameAfterModification);
        
                        done();
        
                    }
                    
                });


            })
        

    });

    it('404 wrong url', (done) => {

        chai.request(app)
        .put(routes.baseUrl + routes.updatePharmacie + "/404")
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

    it('404 id not found', (done) => {

        var pharmacieId = "5c9b7fd3e64fbd4c6be8f14d"
        chai.request(app)
        .put(routes.baseUrl + routes.updatePharmacie + "?id="+ pharmacieId)
        .send(pharmacieMockup)
        .end((err, res,  body) => {

            if(err){

                done(err);

            }else{

                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('No pharmacie found, check the id property');

                done();

            }
            
        });
        

    });

    it('400 document modification incorrectly formed', (done) => {

        var pharmacieId = "";
        chai.request(app) //get all pharmacie
            .get(routes.baseUrl + routes.getAllPharmacies)
            .end((err, res, body) => {

                pharmacieId = res.body[0]._id; //select the first one

                //modify the selected pharmacie
                chai.request(app)
                .put(routes.baseUrl + routes.updatePharmacie + "?id=" + pharmacieId)
                .send({test: "test"})
                .end((err, res,  body) => {
        
                    if(err){

                        done(err);
        
                    }else{
        
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('the ressource you sent is incorrectly formed');
        
                        done();
        
                    }
                    
                });


            })

    });

    it('400 missing id parameter', (done) => {

        chai.request(app)
        .put(routes.baseUrl + routes.updatePharmacie)
        .send(pharmacieMockup)
        .end((err, res,  body) => {

            if(err){

                done(err);

            }else{
                
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('missing id parameter in request');
                
                done();

            }
            
        });

    });

});