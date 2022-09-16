import React, { useEffect, useState } from 'react'

import Axios from "axios"

function FormComponent() {
    let [jsonFile, setJsonFile] = useState()
    
    let [jsonData, setJsonData] = useState()

    let [jsonParsedData, setJsonParsedData] = useState()

    let [normalizedJson, setNormalizedJson] = useState([])

    let handleJson = (file) => setJsonFile(file)

    if(jsonFile) {
        let fileReader = new FileReader();

        fileReader.readAsText(jsonFile)

        fileReader.onload = function() {
            setJsonData(fileReader.result)
        }

        fileReader.onerror = function() {
            console.log(fileReader.error)
        }
    }

    useEffect(() => jsonData && setJsonParsedData(JSON.parse(jsonData)), [jsonData])

    // jsonData && console.log(jsonData, JSON.parse(jsonData), jsonParsedData)

    useEffect(() => {
        if(jsonParsedData) {
            jsonParsedData.comments.forEach(item => {
                let flatObj = {
                    id: item.id,
                    body: item.body,
                    postId: item.postId,
                    userid: item.user.id,
                    username: item.user.username
                }
                setNormalizedJson(prev=>[...prev, flatObj])
            })
        }
    }, [jsonParsedData])

    // console.log(jsonParsedData, "<><>", normalizedJson)

    return (
        <div className='form-component'>
            FormComponent
            <UploadFile handleJson={handleJson} normalizedJson={normalizedJson} />
            {jsonParsedData?.comments.length}
        </div>
    )
}

let UploadFile = ({ handleJson, normalizedJson }) => {

    let handleFile = evt => {
        handleJson(evt.target.files[0])
    }

    let handleSubmitForm = evt => {
        evt.preventDefault();
        if(normalizedJson?.length) {
            // Axios({method: "post", url: "http://localhost:3001/data/insert"}, {normalizedJson})
            Axios.post("http://localhost:3001/data/insert", {normalizedJson: normalizedJson})
            .then(() => console.log("data sent is successfull"))
            .catch(err => console.log(err))
        }
    }

    return (
        <form className='upload-form' method='POST' action='' onSubmit={handleSubmitForm}>
            <InputFile handleFile={handleFile} />
            <button>Upload File</button>
        </form>
    )
}

let InputFile = ({ handleFile }) => {
    return (
        <input
            type={'file'}
            className='input-item'
            onChange={handleFile}
        />
    )
}

export default FormComponent

/**
 * 
 * 
 // jsonFile && console.log(JSON.parse(jsonFile), ">json<")

    // if(jsonFile) {
    //     fetch(jsonFile).then(res=> res.json()).catch(err=>console.log(err, "json")).then(json => console.log(json)).catch(err=> console.log(err))
    // }

    // console.log(jsonFile, typeof jsonFile, jsonFile?.json())

    // let fileUploaded = new FileReader()
    // jsonFile && console.log(fileUploaded.readAsArrayBuffer(jsonFile))

    // console.log(readAsArrayBuffer(jsonFile))
    // jsonFile && Blob.prototype.arrayBuffer(jsonFile).then(data => console.log(data))

    // Blob.prototype.stream(jsonFile)

    // if (jsonFile) {
    //     let json = JSON.stringify(jsonFile);

    //     console.log(json, "<><>", jsonFile)

    //     const blob = new Blob([json], { type: "application/json" });

    //     const fr = new FileReader();

    //     fr.addEventListener("load", e => {
    //         console.log(e.target.result, JSON.parse(fr.result))
    //     });

    //     fr.readAsText(blob);
    // }

    // if (jsonFile) {
    //     let reader = new FileReader();

    //     reader.readAsText(jsonFile);

    //     reader.onload = function () {
    //         // console.log(reader.result);
    //         setJsonData(reader.result)
    //     };

    //     reader.onerror = function () {
    //         console.log(reader.error);
    //     };
    // }

 */