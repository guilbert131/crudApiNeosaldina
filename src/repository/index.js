const axios = require('axios')
const config = require('../config');

exports.saveNeosaldinaApi = async (name, email) => {

    try {
        let data = JSON.stringify({
            "nome": name,
            "email": email
        });

        let configuration = {
            method: 'post',
            maxBodyLength: Infinity,
            url: config.neosaldina.url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': config.neosaldina.token
            },
            data: data
        };

        axios.request(configuration)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                return true
            })
            .catch((error) => {
                console.log(error);
                return false
            });
    } catch (error) {
        console.log(error);
        return false
    }

}