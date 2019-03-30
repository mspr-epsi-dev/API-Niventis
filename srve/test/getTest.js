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

describe("get all entities", () => {

    before(() => {
        PharmacieModel.deleteMany();
        var pharmacie = new PharmacieModel(pharmacieMockup);
        pharmacie.save();
    });

    it("200 ok", (done) => {

        chai.request(app)
            .get( routes.baseUrl + routes.getAllPharmacies)
            .end((err, res, body) => {

                if(err){

                    done(err);

                }else{
                    
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('name');
                    res.body[0].should.have.property('adress');
                    res.body[0].should.have.property('lattitude');
                    res.body[0].should.have.property('longitude');
                    res.body[0].should.have.property('turnover');
                    res.body[0].should.have.property('trainingNeed');
                    res.body[0].should.have.property('productBought');
                    res.body[0].productBought[0].should.have.property('productName');
                    res.body[0].productBought[0].should.have.property('quantityBoughtPerMonth');
                    res.body[0].productBought[0].should.have.property('productPrice');
    
                    done();

                }

            });

    });

    it('404 not found', (done) => {

        chai.request(app)
        .get(routes.baseUrl + routes.getAllPharmacies + "/404")
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
            .get(routes.baseUrl + routes.getAllPharmacies)
            .end((err, res, body) => {

                if(err) {

                    done(err);

                } else {
                    pharmacieId = res.body[0]._id;

                    chai.request(app)
                    .get( routes.baseUrl + routes.getPharmacieById + "?id=" + pharmacieId)
                    .end((err, res, body) => {

                        if(err){

                            done(err);

                        }else{
                            
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('name');
                            res.body.should.have.property('adress');
                            res.body.should.have.property('lattitude');
                            res.body.should.have.property('longitude');
                            res.body.should.have.property('turnover');
                            res.body.should.have.property('trainingNeed');
                            res.body.should.have.property('productBought');
                            res.body.productBought[0].should.have.property('productName');
                            res.body.productBought[0].should.have.property('quantityBoughtPerMonth');
                            res.body.productBought[0].should.have.property('productPrice');
            
                            done();

                        }

                    });
                }
            })

    });

    it('404 not found', (done) => {

        chai.request(app)
        .get(routes.baseUrl + routes.getAllPharmacies + "/404")
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
            .get(routes.baseUrl + routes.getAllPharmacies)
            .end((err, res, body) => {
                
                if(err) {

                    done(err);

                } else {

                    pharmacieId = "4c964557bf0bc7332da8b8ef"

                    chai.request(app)
                    .get( routes.baseUrl + routes.getPharmacieById + "?id=" + pharmacieId)
                    .end((err, res, body) => {

                        if(err){

                            done(err);

                        }else{
                            
                            res.should.have.status(404);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql('No pharmacie found, check the id property');

                            done();

                        }

                    });
                }
            })

    });

    it("400 id malformed", (done) => {

        pharmacieId = "zrezrefzf"

        chai.request(app)
        .get( routes.baseUrl + routes.getPharmacieById + "?id=" + pharmacieId)
        .end((err, res, body) => {

            if(err){

                done(err);

            }else{
                
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('incorrect pharmacie id, check the id property');
                
                done();

            }

        });

    });

    it("400 id parameter missing", (done) => {

        chai.request(app)
        .get( routes.baseUrl + routes.getPharmacieById)
        .end((err, res, body) => {

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