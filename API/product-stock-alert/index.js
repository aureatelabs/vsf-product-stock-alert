import { apiStatus } from '../../../lib/util';
import { Router } from 'express';
const Magento2Client = require('magento2-rest-client').Magento2Client

module.exports = ({ config, db }) => {

  let mcApi = Router();

  /**
   * NotifyMe API for OutOfStock product
   */
  mcApi.post('/notify-me', (req, res) => {
    let notifyMeData = { notify: req.body }
    if (!notifyMeData) {
      apiStatus(res, 'Internal Server Error!', 500)
      return
    }

    const client = Magento2Client(config.magento2.api);
    client.addMethods('notifyMe', function (restClient) {
      var module = {};
      module.notifyMe = function () {
        return restClient.post('/notifyMe', notifyMeData)
      }
      return module;
    })

    client.notifyMe.notifyMe().then((result) => {
      apiStatus(res, result, 200); // just dump it to the browser, result = JSON object
    }).catch(err => {
      apiStatus(res, err, 500);
    })
  })

  return mcApi
}
