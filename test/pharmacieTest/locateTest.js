process.env.NODE_ENV = 'test';

const httpMessage = require('../../init/httpMessages');
const chaiHttp = require ('chai-http');
const app = require ('../../bin/app');
const pharmacieMockup = require('./pharmacieMockup.json');
const PharmacieModel = require('../../models/pharmacieModel/pharmacieModel');
const routes = require('../../init/routes');

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

chai.use(chaiHttp);


const chaiExclude = require('chai-exclude');
chai.use(chaiExclude);

describe("location of pharmacies around", () => {

    before(() => {
        PharmacieModel.deleteMany();
        var pharmacie = new PharmacieModel(pharmacieMockup);
        pharmacie.save();
    });

    it("200 ok", (done) => {

        chai.request(app)
            .get( routes.baseUrl + routes.localisation +"?long=-9&latt=9&perim=1000" )
            .end((err, res, body) => {

                if(err){

                    done(err);

                }else{
                    
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('address');
                    res.body[0].should.have.property('name');
    
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

    it('400 missing query params', (done) => {

        chai.request(app)
        .get(routes.baseUrl + routes.localisation )
        .end((err, res,  body) => {

            if(err){

                done(err);

            }else{

                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql(httpMessage["400"].incorrectQueryParam);

                done();

            }
            
        });
        

    });


    it('400 malformed query parameters', (done) => {

        chai.request(app)
        .get(routes.baseUrl + routes.localisation +"?log=-9&lat=9&perim=1")
        .end((err, res,  body) => {

            if(err){

                done(err);

            }else{

                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql(httpMessage["400"].incorrectQueryParam);

                done();

            }
            
        });
        

    });


    after(() => {

        PharmacieModel.deleteMany({});

    });

    

});