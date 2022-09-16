import resData from "./resources/response.json"
import axios from "axios"

let extractData = () => {
    let data = [];
    
    resData.comments.forEach(item => data.push(item))
    
    return data
}

let getDataFromApi = (dataUpdater) => {
    axios.get("http://localhost:3001/data")
    .then(res => {
      dataUpdater(res.data)
    })
    .catch(err => console.log(err))
}

let matchEntries = (data, searchToken) => {
    let found = []
    
    data.forEach(item => {
        if(item.body.includes(searchToken)) {
            found.push(item)
        }
    })

    found = found.filter((_, i) => i < 20)

    return found;
}

export {extractData, matchEntries, getDataFromApi}