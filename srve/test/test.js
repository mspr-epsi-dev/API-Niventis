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


describe("get from database", () => {

    before('get from database', () => {
        PharmacieModel.deleteMany();
         var pharmacie = new PharmacieModel(pharmacieMockup);
         pharmacie.save();
    });

    it("get one entity", (done) => {

        chai.request(app)
            .get('/getData/getPharmacie')
            .end((err, res, body) => {

                if(err){

                    done(err);

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

        PharmacieModel.deleteMany({});

    });

});

describe('save to database', () => {

    it('save one to database', (done) => {

        chai.request(app)
        .post('saveData/savePharmacie')
        .send(pharmacieMockup)
        .end((err, resp,  body) => {

            if(err){

                console.log("error : " + err);

                done(err);

            }else{

                var response = res.body;     
                console.log("response : " + response);               
                var expected = [pharmacieMockup];                    

                response.should.be.a('array');
                expect(response[0]).to.deep.include(expected[0]);

                done();


            }
            
        });
        

    });

    after((done) => {

        PharmacieModel.deleteMany({});
        done();

    });


});