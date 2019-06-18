process.env.NODE_ENV = 'test';

const httpMessage = require('../../init/httpMessages');
const chaiHttp = require ('chai-http');
const app = require ('../../bin/app');
const pharmacieMockup = require('./pharmacieMockup.json');
const routes = require('../../init/routes');

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

chai.use(chaiHttp);


const chaiExclude = require('chai-exclude');
chai.use(chaiExclude);


describe('update pharmacie', () => {

    it('200 ok', (done) => {


        var pharmacieId = "";
        chai.request(app) //get all pharmacie
            .get(routes.baseUrl + routes.pharmacies)
            .end((err, res, body) => {

                pharmacieId = res.body[0]._id; //select the first one
                nameBeforeModification = res.body[0].name;
                nameAfterModification = nameBeforeModification + " modified";

                //modify the selected pharmacie
                chai.request(app)
                .put(routes.baseUrl + routes.pharmacies + "/" + pharmacieId)
                .send({name: nameAfterModification})
                .end((err, res,  body) => {
        
                    if(err){
        
                        done(err);
        
                    }else{
                        
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql(httpMessage["200"].updateSuccess);
                        expect(res.body.newDocument.name).to.deep.equal(nameAfterModification);
        
                        done();
        
                    }
                    
                });


            })
        

    });

    it('404 wrong url', (done) => {

        chai.request(app)
        .put(routes.baseUrl + "/404")
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

    it('404 pharmacie not found', (done) => {

        var pharmacieId = "5c9b7fd3e64fbd4c6be8f14d"
        chai.request(app)
        .put(routes.baseUrl + routes.pharmacies + "/"+ pharmacieId)
        .send(pharmacieMockup)
        .end((err, res,  body) => {

            if(err){

                done(err);

            }else{

                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql(httpMessage["404"].pharmacieNotFound);

                done();

            }
            
        });
        

    });

    it('400 document modification incorrectly formed', (done) => {

        var pharmacieId = "";
        chai.request(app) //get all pharmacie
            .get(routes.baseUrl + routes.pharmacies)
            .end((err, res, body) => {

                pharmacieId = res.body[0]._id; //select the first one

                //modify the selected pharmacie
                chai.request(app)
                .put(routes.baseUrl + routes.pharmacies + "/" + pharmacieId)
                .send({test: "test"})
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


            })

    });

});