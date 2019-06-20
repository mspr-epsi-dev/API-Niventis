process.env.NODE_ENV = 'test';

const httpMessage = require('../../init/httpMessages');
const chaiHttp = require ('chai-http');
const app = require ('../../bin/app');
const formularMockup = require('./formularMockup.json');
const routes = require('../../init/routes');

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

chai.use(chaiHttp);


const chaiExclude = require('chai-exclude');
chai.use(chaiExclude);


describe('delete formular', () => {

    it('200 ok', (done) => {

        var formularId = "";

        //get all formulars to extract one id to delete
        chai.request(app)
        .get(routes.baseUrl + routes.formular)
        .end((err, res,  body) => {

            if(err){

                done(err);

            }else{

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

                        //get pharmacie byId to check if it has been really deleted
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

    it('404 wrong url', (done) => {

        chai.request(app)
        .delete(routes.baseUrl + "/404")
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

    it('400 id malformed', (done) => {

        var formularId = "zrerger";

        chai.request(app)
        .delete(routes.baseUrl + routes.formular + "/" + formularId)
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

    it('404 id not found', (done) => {

        var formularId = "5c9fb17193e0021c9214559c";

        chai.request(app)
        .delete(routes.baseUrl + routes.formular + "/" + formularId)
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

});