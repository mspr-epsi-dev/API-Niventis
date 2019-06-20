process.env.NODE_ENV = 'test';

const httpMessage = require('../../init/httpMessages');
const chaiHttp = require ('chai-http');
const app = require ('../../bin/app');
const routes = require('../../init/routes');
const formularMockup = require('./formularMockup.json');

const chai = require('chai');
const chaiExclude = require('chai-exclude');

chai.use(chaiExclude);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

chai.use(chaiHttp);

describe('update formular', () => {

    it('200 ok', (done) => {

        var formularId = "";
        chai.request(app) //get all formulars
            .get(routes.baseUrl + routes.formular)
            .end((err, res, body) => {

                formularId = res.body[0]._id; //select the first one
                openQuestionBeforeModification = res.body[0].openQuestion;
                openQuestionAfterModification = {
                    libelle : openQuestionBeforeModification[0].libelle + " modified",
                    answer : "answerModified"
                }

                //modify the selected pharmacie
                chai.request(app)
                .put(routes.baseUrl + routes.formular + "/" + formularId)
                .send({openQuestion: openQuestionAfterModification})
                .end((err, res,  body) => {
        
                    if(err){
        
                        done(err);
        
                    }else{
                        
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql(httpMessage["200"].updateSuccess);
                        expect(res.body.newDocument.openQuestion[0]).excluding('_id').to.deep.equal(openQuestionAfterModification);
        
                        done();
        
                    }
                    
                });


            })
        

    });

    

    it('404 wrong url', (done) => {

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

    it('404 formular not found', (done) => {

        var formularId = "5c9b7fd3e64fbd4c6be8f14d"
        chai.request(app)
        .put(routes.baseUrl + routes.formular + "/"+ formularId)
        .send(formularMockup)
        .end((err, res,  body) => {

            if(err){

                done(err);

            }else{

                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql(httpMessage["404"].formularNotFound);

                done();

            }
            
        });
        

    });

    it('400 missformed formular id', (done) => {

        var formularId = "5c9b7fd3e64fbd4c6be8f14dzzzzzzz"
        chai.request(app)
        .put(routes.baseUrl + routes.formular + "/"+ formularId)
        .send(formularMockup)
        .end((err, res,  body) => {

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

    it('400 misformed resource', (done) => {

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