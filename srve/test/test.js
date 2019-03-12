var chai = require('chai');
const chaiHttp = require ('chai-http');
const app = require ('../server');
chai.should();
var expect = chai.expect;


chai.use(chaiHttp);

describe("HELLO /data/getData/hello", () => {

    it("should reponse hello", (done) => {
        chai.request(app)
            .get('/data/getData/hello')
            .end((err, res) => {
                res.body.should.be.a('object');
                expect(res.body).to.equal('hello');
                done();
            });
    });

});