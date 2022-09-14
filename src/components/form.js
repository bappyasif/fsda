import React, { useEffect, useState } from 'react'

function FormComponent() {
    let [jsonFile, setJsonFile] = useState()
    
    let [jsonData, setJsonData] = useState()

    let [jsonParsedData, setJsonParsedData] = useState()

    let handleJson = (file) => setJsonFile(file)

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

    console.log(jsonParsedData, "<><>")

    return (
        <div className='form-component'>
            FormComponent
            <UploadFile handleJson={handleJson} />
            {jsonParsedData?.comments.length}
        </div>
    )
}

let UploadFile = ({ handleJson }) => {

    let handleFile = evt => {
        handleJson(evt.target.files[0])
    }

    let handleSubmitForm = evt => {
        evt.preventDefault();
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