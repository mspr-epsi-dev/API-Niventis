const chaiHttp = require ('chai-http');
const app = require ('../server');
const pharmacieMockup = require('./pharmacieMockup.json');
const mongoose = require('mongoose');
const database = require('../controller/databaseController');
const PharmacieModel = require('../models/pharmacieModel');

const chai = require('chai');
const expect = chai.expect;
chai.use(chaiHttp);
const should = chai.should();

describe("HELLO /getData/hello", () => {

    it("should reponse hello", (done) => {

        chai.request(app)
            .get('/getData/hello')
            .end((err, res, body) => {

                if(err){
                    done(err);
                }else {
                    
                    var expected = { hello: 'hello' };
                    var response = res.body
    
                    response.should.be.a('object');
                    expect(response).to.deep.equal(expected);
    
                    done();

                }

            });
    });

});

describe("get from database", () => {

    before('connect to database', () => {
        return database.connect();
    });


    beforeEach( () => {

        var pharmacie = new PharmacieModel(pharmacieMockup);
        return pharmacie.save();

    });

    it("get one entity", (done) => {

        chai.request(app)
            .get('/getData/getPharmacie')
            .end((err, res, body) => {

                if(err){
                    done(err)
                }else{

                    var response = res.body;                    
                    var expected = [pharmacieMockup];                    

                    response.should.be.a('array');
                    expect(response[0]).to.deep.include(expected[0]);

                    done();

                }

            });

    });

    after(() => {

        return PharmacieModel.deleteMany({});

    });

});