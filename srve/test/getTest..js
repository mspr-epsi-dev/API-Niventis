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

describe("get from database", () => {

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