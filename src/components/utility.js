import resData from "./resources/response.json"

let extractData = () => {
    let data = [];
    
    resData.comments.forEach(item => data.push(item))
    
    return data
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

export {extractData, matchEntries}