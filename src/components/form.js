import React, { useEffect, useState } from 'react'

import Axios from "axios"
import { insertDataToDatabase } from './utility'

function FormComponent({setUploaded}) {
    let [jsonFile, setJsonFile] = useState()
    
    let [jsonData, setJsonData] = useState()

    let [jsonParsedData, setJsonParsedData] = useState()

    let [normalizedJson, setNormalizedJson] = useState([])

    let handleJson = (file) => setJsonFile(file)

    // here we are reading data from uploaded file
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

    // once we have our json data from file extracted and then we parse it here
    useEffect(() => jsonData && setJsonParsedData(JSON.parse(jsonData)), [jsonData])

    // when we have a parsed json data from file, we are here giving it a flat structure 
    // rather nesting initial json structure for out server side to handle
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

    return (
        <div className='form-component'>
            <UploadFile setUploaded={setUploaded} handleJson={handleJson} normalizedJson={normalizedJson} />
        </div>
    )
}

let UploadFile = ({ handleJson, normalizedJson, setUploaded }) => {

    let handleFile = evt => {
        handleJson(evt.target.files[0])
    }

    let handleSubmitForm = evt => {
        evt.preventDefault();
        if(normalizedJson?.length) {
            insertDataToDatabase(normalizedJson)
        }
        setUploaded()
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
            accept="application/JSON"
        />
    )
}

export default FormComponent