/**
 * TODO: This service should proxy the request to the Chuck Norris API (https://api.chucknorris.io)
 * Refer to the API definitions in the provided swagger file for response and request compliance.
 **/
const axios = require('axios');
const apiurl = 'https://api.chucknorris.io/jokes/';
/**
 * Retrieve a list of available categories.
 *
 * returns List
 **/
function listCategories () {   
    return axios.get(`${apiurl}categories`) 
    .then(response=>{return response.data})
    .catch(error=>{console.log(error)})
}

/**
 * Retrieve a random Chuck Norris joke in JSON format.
 * You may set the category parameter in order to filter the facts by it
 *
 * category String  (optional)
 * returns Fact
 **/
function randomFact (category) {
    let url = `${apiurl}random`;
    if(typeof category !== 'undefined' && category !== ''){
        url = `${url}?category=${category}`;
    }
    
    return axios.get(url)
    .then(response=>{return response.data})
    .catch(error=>{console.log(error)});
}

/**
 * Free text search.
 * You may set the category parameter in order to filter the facts by it
 *
 * query String
 * returns SearchResult
 **/
function search (query) {
    let url = `${apiurl}search?query=${query}`;
    return axios.get(url)
    .then(response=>{return response.data.result})
    .catch(error=>{console.log(error)})
}

module.exports = {listCategories, randomFact, search}
