import React, { useRef, useState } from 'react';
import axios from 'axios';

function FileUpload({ onChange }) {

    // для хранения загруженного файла
    const [file, setFile] = useState('');

    // для хранения ответа от бекенда
    const [data, getFile] = useState({ name: "", path: "" });

    const [progress, setProgess] = useState(0); // progessbar
    const el = useRef(); // для доступа к инпуту

    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0]; // доступ к файлу
        console.log(file);
        setFile(file); // сохранение файла
    }

    const uploadFile = () => {
        const formData = new FormData();
        formData.append('file', file); // добавление файла
        axios.post('http://localhost:8080/uploads', formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                    ProgressEvent.loaded / ProgressEvent.total * 100
                ) + '%';
                setProgess(progress);
            }
        }).then(res => {
            console.log(res);
            getFile({
                name: res.data.name,
                path: 'http://localhost:8080' + res.data.path
            })
            onChange(res.data.path)
        }).catch(err => console.log(err))
    }

    return (
        <div>
            <div className="file-upload">
                <input type="file" ref={el} onChange={handleChange} />
                <div className="progessBar" style={{ width: progress }}>
                    {progress}
                </div>
                <button onClick={uploadFile} className="upbutton">
                    Upload
                </button>
                <hr />
                {/* для показа полученного изображения */}
                {data.path && <img src={data.path} alt={data.name} />}
            </div>
        </div>
    );
}

export default FileUpload;