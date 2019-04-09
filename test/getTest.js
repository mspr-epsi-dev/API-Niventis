process.env.NODE_ENV = 'test';

const httpMessage = require('../init/httpMessages');
const chaiHttp = require ('chai-http');
const app = require ('../bin/app');
const pharmacieMockup = require('./pharmacieMockup.json');
const PharmacieModel = require('../models/pharmacieModel');
const routes = require('../init/routes');

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

chai.use(chaiHttp);


const chaiExclude = require('chai-exclude');
chai.use(chaiExclude);

describe("get all entities", () => {

    before(() => {
        PharmacieModel.deleteMany();
        var pharmacie = new PharmacieModel(pharmacieMockup);
        pharmacie.save();
    });

    it("200 ok", (done) => {

        chai.request(app)
            .get( routes.baseUrl + routes.pharmacies)
            .end((err, res, body) => {

                if(err){

                    done(err);

                }else{
                    
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('name');
                    res.body[0].should.have.property('adress');
                    res.body[0].should.have.property('trainingNeed');
                    res.body[0].should.have.property('productBought');
                    res.body[0].productBought[0].should.have.property('productName');
                    res.body[0].productBought[0].should.have.property('quantityBoughtPerMonth');
                    res.body[0].productBought[0].should.have.property('productPrice');
                    res.body[0].should.have.property('gpsCoordinates');
                    res.body[0].gpsCoordinates.should.have.length(2);
                    res.body[0].gpsCoordinates[0].should.be.a('number');
                    res.body[0].gpsCoordinates[1].should.be.a('number');
    
                    done();

                }

            });

    });

    it('404 not found', (done) => {

        chai.request(app)
        .get(routes.baseUrl +  "/404")
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

    after(() => {

        PharmacieModel.deleteMany({});

    });

});

describe("get entity by id", () => {

    before(() => {
        PharmacieModel.deleteMany({});
        var pharmacie = new PharmacieModel(pharmacieMockup);
        pharmacie.save();
    });

    it("200 ok", (done) => {

        //get all pharmacies to extract one id in order to test getPharmacieById
        var pharmacieId = "";
        chai.request(app)
            .get(routes.baseUrl + routes.pharmacies)
            .end((err, res, body) => {

                if(err) {

                    done(err);

                } else {
                    pharmacieId = res.body[0]._id;

                    chai.request(app)
                    .get( routes.baseUrl + routes.pharmacies + "/" + pharmacieId)
                    .end((err, res, body) => {

                        if(err){

                            done(err);

                        }else{
                            
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('name');
                            res.body.should.have.property('adress');
                            res.body.should.have.property('trainingNeed');
                            res.body.should.have.property('productBought');
                            res.body.productBought[0].should.have.property('productName');
                            res.body.productBought[0].should.have.property('quantityBoughtPerMonth');
                            res.body.productBought[0].should.have.property('productPrice');
                            res.body.should.have.property('gpsCoordinates');
                            res.body.gpsCoordinates.should.have.length(2);
                            res.body.gpsCoordinates[0].should.be.a('number');
                            res.body.gpsCoordinates[1].should.be.a('number');
            
                            done();

                        }

                    });
                }
            })

    });

    it('404 not found', (done) => {

        chai.request(app)
        .get(routes.baseUrl + "/404")
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

    after(() => {

        PharmacieModel.deleteMany({});

    });


    it("404 unknow id", (done) => {

        //get all pharmacies to extract one id in order to test getPharmacieById
        var pharmacieId = "";
        chai.request(app)
            .get(routes.baseUrl + routes.pharmacies)
            .end((err, res, body) => {
                
                if(err) {

                    done(err);

                } else {

                    pharmacieId = "4c964557bf0bc7332da8b8ef"

                    chai.request(app)
                    .get( routes.baseUrl + routes.pharmacies + "/" + pharmacieId)
                    .end((err, res, body) => {

                        if(err){

                            done(err);

                        }else{
                            
                            res.should.have.status(404);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql(httpMessage["404"].pharmacieNotFound);

                            done();

                        }

                    });
                }
            })

    });

    it('404 no pharmacie found with this id', (done) => {

        var pharmacieId = "";

        //get all pharmacies to extract one id to delete
        chai.request(app)
        .get(routes.baseUrl + routes.pharmacies)
        .end((err, res,  body) => {

            if(err){

                done(err);

            }else{

                //delete the id to be sure to test an unknow id
                pharmacieId = res.body[0]._id;

                chai.request(app)
                .delete(routes.baseUrl + routes.pharmacies + "/" + pharmacieId)
                .send(pharmacieMockup)
                .end((err, res,  body) => {
        
                    if(err){
        
                        done(err);
        
                    }else{
        
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql(httpMessage["200"].deleteSucess);

                        //check that no pharmacie have been found with this id
                        chai.request(app)
                            .get(routes.baseUrl + routes.pharmacies)
                            .end((err, res, body) => {
                
                                if(err) {
                
                                    done(err);
                
                                } else {
                
                                    chai.request(app)
                                    .get( routes.baseUrl + routes.pharmacies + "/" + pharmacieId)
                                    .end((err, res, body) => {
                
                                        if(err){
                
                                            done(err);
                
                                        }else{
                                            
                                            res.should.have.status(404);
                                            res.body.should.be.a('object');
                                            res.body.should.have.property('message').eql(httpMessage["404"].pharmacieNotFound)
                            
                                            done();
                
                                        }
                
                                    });
                                }
                            })
        
        
                    }
                    
                });

            }
            
        });       

    });

    it("400 id malformed", (done) => {

        pharmacieId = "zrezrefzf"

        chai.request(app)
        .get( routes.baseUrl + routes.pharmacies + "/" + pharmacieId)
        .end((err, res, body) => {

            if(err){

                done(err);

            }else{
                
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql(httpMessage["400"].missformedId);
                
                done();

            }

        });

    });


});