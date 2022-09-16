import resData from "./resources/response.json"
import axios from "axios"

/**
 * 
 * @returns 
 * this was a demo of what api data would look like
 */
let extractData = () => {
    let data = [];

    resData.comments.forEach(item => data.push(item))

    return data
}

/**
 * 
 * @param {*} normalizedJson 
 * we are making our data headed to our api for processing them into database
 */
let insertDataToDatabase = (normalizedJson) => {
    axios.post("http://localhost:3001/data/insert", { normalizedJson: normalizedJson })
        .then(() => {
            console.log("data sent is successfull")
        })
        .catch(err => console.log(err))
}

/**
 * 
 * @param {*} dataUpdater 
 * this function return data from api endpoint
 * and updates state with received data
 */
let getDataFromApi = (dataUpdater) => {
    axios.get("http://localhost:3001/data")
        .then(res => {
            dataUpdater(res.data)
        })
        .catch(err => console.log(err))
}

/**
 * 
 * @param {*} data 
 * @param {*} searchToken 
 * @returns 
 * this takes in extracted data from source and then do a simple search in them to find matches
 * and whenever there is a match we are updating our "found" array which we return for rendering
 */
let matchEntries = (data, searchToken) => {
    let found = []

    data.forEach(item => {
        if (item.body.includes(searchToken)) {
            found.push(item)
        }
    })

    found = found.filter((_, i) => i < 20)

    return found;
}

export { extractData, matchEntries, getDataFromApi, insertDataToDatabase }