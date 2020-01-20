import * as conf from '../Configs/conf';
import CustomerAppApi from '../Objects/CustomerAppApiObject';




jest.setTimeout(conf.timeoutJest);



describe('Check Customer API', function () {
    beforeAll(() => {
       
    });

    afterAll(() => {
       
    });

    it('Check post Name', async (done) => {
        let customerAppApi = new CustomerAppApi();
        await customerAppApi.SubmitNameCheck("Andre");
        done();
    },conf.maxSafeTimeout)

   


});

