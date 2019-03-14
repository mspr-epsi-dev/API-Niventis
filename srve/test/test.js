var chai = require('chai');
const chaiHttp = require ('chai-http');
const app = require ('../server');

var expect = chai.expect;


chai.use(chaiHttp);
var should = chai.should();

describe("HELLO /getData/hello", () => {

    it("should reponse hello", (done) => {
        chai.request(app)
            .get('/getData/hello')
            .end((err, res) => {

                var expected = { hello: 'hello' };
                var response = res.body;

                response.should.be.a('object');
                expect(response).to.deep.equal(expected);

                done();
            });
    });

});