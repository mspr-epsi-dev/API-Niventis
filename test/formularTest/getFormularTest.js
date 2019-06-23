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
                    res.body[0].should.have.property('pharmacyId');                
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
    });

    it("200 ok", (done) => {

        //get all pharmacies to have a pharmaceiId(formular model contain a pharmacyId)
        var pharmacyId = "";
        chai.request(app)
            .get(routes.baseUrl + routes.pharmacies)
            .end((err, res, body) => {

                if(err) {

                    done(err);

                } else {

                    var pharmacyId = res.body[0]._id;
                    //create a formular with a real pharmacyId
                    var formularTest = {
                        "pharmacyId" : pharmacyId,
                        "openQuestion": [
                            {
                                "libelle" : "quel sont vos meilleurs ventes ?",
                                "answer" : "Dolipranes"
                            },
                            {
                                "libelle" : "sur quels produits faite-vous vos plus grosses marges ?",
                                "answer" : "Daphalgans"
                            }
                        ],
                        "qcmQuestion":[ 
                            {
                                "libelle" : "quelle est votre chiffre d'affaires ?",
                                "answers" : [
                                   {"choix" : "1k-5k", "selected": true},
                                   {"choix" : "5k-15k", "selected": false},
                                   {"choix" : "20k-50k", "selected": false},
                                   {"choix" : "50k+", "selected": false}
                                ]
                            }
                        ]
                    }

                    //save formular with a pharmacy id, necessary to find a formular by id
                    var formular = new formularModel(formularTest);
                    formular.save();      

                    //search formular with the pharmacyId
                    chai.request(app)
                    .get( routes.baseUrl + routes.formular + "/" + pharmacyId)
                    .end((err, res, body) => {

                        if(err){

                            done(err);

                        }else{
                            
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('pharmacyId');                
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
        var pharmacyId = "";
        chai.request(app)
            .get(routes.baseUrl + routes.formular)
            .end((err, res, body) => {
                
                if(err) {

                    done(err);

                } else {

                    pharmacyId = "4c964557bf0bc7332da8b8ef"

                    chai.request(app)
                    .get( routes.baseUrl + routes.formular + "/" + pharmacyId)
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

});