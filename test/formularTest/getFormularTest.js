process.env.NODE_ENV = 'test';

const httpMessage = require('../../init/httpMessages');
const chaiHttp = require ('chai-http');
const app = require ('../../bin/app');
const formularMockup = require('./formularMockup.json');
const formularModel = require('../../models/formularModel/formularModel');
const routes = require('../../init/routes');

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

chai.use(chaiHttp);


const chaiExclude = require('chai-exclude');
chai.use(chaiExclude);

describe("get all formulars", () => {

    before(() => {
        formularModel.deleteMany();
        var formular = new formularModel(formularMockup);
        formular.save();
    });

    it("200 ok", (done) => {

        chai.request(app)
            .get( routes.baseUrl + routes.formular )
            .end((err, res, body) => {

                if(err){

                    done(err);

                }else{
                    
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.be.a('object');
                    res.body[0].should.have.property('participantId');                
                    res.body[0].should.have.property('date');
                    res.body[0].should.have.property('openQuestion');
                    res.body[0].openQuestion.should.be.a('array');
                    res.body[0].openQuestion[0].should.have.property('libelle');
                    res.body[0].openQuestion[0].should.have.property('answer');
                    res.body[0].should.have.property('qcmQuestion');
                    res.body[0].qcmQuestion.should.be.a('array');
                    res.body[0].qcmQuestion[0].should.have.property('libelle');
                    res.body[0].qcmQuestion[0].should.have.property('answers');
    
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

        formularModel.deleteMany({});

    });

});

describe("get formular by id", () => {

    before(() => {
        formularModel.deleteMany({});
        var formular = new formularModel(formularMockup);
        formular.save();
    });

    it("200 ok", (done) => {

        //get all pharmacies to extract one id in order to test getPharmacieById
        var formularId = "";
        chai.request(app)
            .get(routes.baseUrl + routes.formular)
            .end((err, res, body) => {

                if(err) {

                    done(err);

                } else {
                    formularId = res.body[0]._id;
                    
                    chai.request(app)
                    .get( routes.baseUrl + routes.formular + "/" + formularId)
                    .end((err, res, body) => {

                        if(err){

                            done(err);

                        }else{
                            
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('participantId');                
                            res.body.should.have.property('date');
                            res.body.should.have.property('openQuestion');
                            res.body.openQuestion.should.be.a('array');
                            res.body.openQuestion[0].should.have.property('libelle');
                            res.body.openQuestion[0].should.have.property('answer');
                            res.body.should.have.property('qcmQuestion');
                            res.body.qcmQuestion.should.be.a('array');
                            res.body.qcmQuestion[0].should.have.property('libelle');
                            res.body.qcmQuestion[0].should.have.property('answers');
            
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

        formularModel.deleteMany({});

    });


    it("404 unknow id", (done) => {

        //get all formulars to extract one id in order to test getPharmacieById
        var formularId = "";
        chai.request(app)
            .get(routes.baseUrl + routes.formular)
            .end((err, res, body) => {
                
                if(err) {

                    done(err);

                } else {

                    formularId = "4c964557bf0bc7332da8b8ef"

                    chai.request(app)
                    .get( routes.baseUrl + routes.formular + "/" + formularId)
                    .end((err, res, body) => {

                        if(err){

                            done(err);

                        }else{
                            
                            res.should.have.status(404);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql(httpMessage["404"].formularNotFound);

                            done();

                        }

                    });
                }
            })

    });

    it('404 no formular found with this id', (done) => {

        var formularId = "";

        //get all formulars to extract one id to delete
        chai.request(app)
        .get(routes.baseUrl + routes.formular)
        .end((err, res,  body) => {

            if(err){

                done(err);

            }else{

                //delete the id to be sure to test an unknow id
                formularId = res.body[0]._id;

                chai.request(app)
                .delete(routes.baseUrl + routes.formular + "/" + formularId)
                .send(formularMockup)
                .end((err, res,  body) => {
        
                    if(err){
        
                        done(err);
        
                    }else{
        
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql(httpMessage["200"].deleteFormularSuccess);

                        //check that no pharmacie have been found with this id
                        chai.request(app)
                            .get(routes.baseUrl + routes.formular)
                            .end((err, res, body) => {
                
                                if(err) {
                
                                    done(err);
                
                                } else {
                
                                    chai.request(app)
                                    .get( routes.baseUrl + routes.formular + "/" + formularId)
                                    .end((err, res, body) => {
                
                                        if(err){
                
                                            done(err);
                
                                        }else{
                                            
                                            res.should.have.status(404);
                                            res.body.should.be.a('object');
                                            res.body.should.have.property('message').eql(httpMessage["404"].formularNotFound)
                            
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

        formularId = "zrezrefzf"

        chai.request(app)
        .get( routes.baseUrl + routes.formular + "/" + formularId)
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