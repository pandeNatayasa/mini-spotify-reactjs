import axios from "axios";
import config from "../../config";


export function apiClientCredentials() {
    return new Promise((resolve, reject) => {

      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');

      axios
        .post(config.api.authUrl, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' +  btoa(config.api.clientId + ':' + config.api.clientSecret),
          },
          json: true
        })
        .then(response => {
          resolve(response);
        })
        .catch(errors => {
          reject(errors.response);
        });
    });
}