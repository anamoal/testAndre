import * as conf from '../Configs/conf';
const fetch = require("node-fetch");

export default class CustomerAppApiObject {


  async SubmitNameCheck(Name) {

    let res = await fetch(conf.environment, {
      method: 'POST',
      body: JSON.stringify({
        name: Name
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    var responseStatus = await res.status;
    var response = await res.json();
    expect(await responseStatus).toBe(200);
    expect(await response.name).toBe(Name);

  }


}
