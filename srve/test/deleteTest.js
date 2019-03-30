process.env.NODE_ENV = 'test';

const chaiHttp = require ('chai-http');
const app = require ('../bin/app');
const pharmacieMockup = require('./pharmacieMockup.json');
const routes = require('../routes/routeProperties');

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

chai.use(chaiHttp);


const chaiExclude = require('chai-exclude');
chai.use(chaiExclude);


describe('delete entity', () => {

    it('200 ok', (done) => {

        var pharmacieId = "";

        //get all pharmacies to extract one id to delete
        chai.request(app)
        .get(routes.baseUrl + routes.getAllPharmacies)
        .end((err, res,  body) => {

            if(err){

                done(err);

            }else{

                pharmacieId = res.body[0]._id;

                chai.request(app)
                .delete(routes.baseUrl + routes.deletePharmacie + "?id=" + pharmacieId)
                .send(pharmacieMockup)
                .end((err, res,  body) => {
        
                    if(err){
        
                        done(err);
        
                    }else{
        
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Pharmacie successfuly deleted !');
        
                        done();
        
                    }
                    
                });

            }
            
        });       

    });

    it('404 not found', (done) => {

        chai.request(app)
        .delete(routes.baseUrl + routes.deletePharmacie + "/404")
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

    it('400 id malformed', (done) => {

        var pharmacieId = "zrerger";

        chai.request(app)
        .delete(routes.baseUrl + routes.deletePharmacie + "?id=" + pharmacieId)
        .end((err, res,  body) => {

            if(err){

                done(err);

            }else{

                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('the id is incorrectly formed');

                done();

            }
            
        });

    });

    it('400 id parameter missing', (done) => {

        chai.request(app)
        .delete(routes.baseUrl + routes.deletePharmacie)
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