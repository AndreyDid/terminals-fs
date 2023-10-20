import React, {useRef, useState} from "react";
import TextAreaField from "../common/form/textAreaField";
import TextField from "../inputs/textField";
import Button from "../common/button";
import useTerminals from "../../hooks/useTerminals";
import {createInfo} from "../../store/info";
import ContainerFormWrapper from "../common/containerForm";
import axios from "../../../axios";

const CreateInfo = () => {

    const inputFileRef = useRef(null)
    const [imageUrl, setImageUrl] = useState(null)

    const [data, setData] = useState({
        title: '',
        info: ''
    })

    const validatorConfig = {
        title: {
            isRequired: {
                message: "Это поле обязательно для заполнения"
            }
        },
        info: {
            isRequired: {
                message: "Это поле обязательно для заполнения"
            }
        }
    };

    const {
        history,
        dispatch,
        handleChange,
        isValid,
        validate,
        errors
    } = useTerminals(data, setData, validatorConfig)

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(createInfo({...data, imageUrl: imageUrl,}));
        // history.push('/')
    };

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData()
            const file = event.target.files[0]
            formData.append('image', file)
            const {data} = await axios.post('/uploads/', formData)
            setImageUrl(data.url)
        } catch (error) {
            console.warn(error)
            alert('Ошибка при загрузке файла')
        }
    }
    const onClickRemoveImage = () => {
        setImageUrl('')
    }

    return (
        <div>
            <ContainerFormWrapper>
                <form onSubmit={handleSubmit}>
                    <div className='d-flex justify-content-between mb-2'>
                        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
                        <Button
                            label='Добавить фото'
                            color="light"
                            rounded="rounded-1"
                            border="border"
                            onClick={() => inputFileRef.current.click()}
                        />
                        {imageUrl && (
                            <div>
                                <Button
                                    type='button'
                                    color='danger'
                                    size='btn-sm'
                                    rounded='rounded-1'
                                    icon={<i className="bi bi-trash"></i>}
                                    onClick={onClickRemoveImage}
                                />
                            </div>
                        )}
                    </div>
                    {imageUrl && (
                        <img className='img-thumbnail mb-2' src={`http://82.148.18.40${imageUrl}`}
                             alt="Uploaded"/>
                    )}
                    <TextField
                        label='Заголовок'
                        type='text'
                        name='title'
                        value={data.title}
                        onChange={handleChange}
                        error={errors.title}
                    />
                    <TextAreaField
                        label='Описание'
                        type='text'
                        name='info'
                        data={data.info}
                        onChange={handleChange}
                        error={errors.info}
                    />
                    <div className="d-flex justify-content-between">
                        <Button
                            type="submit"
                            color="light"
                            rounded="rounded-1"
                            border="border"
                            label="OK"
                            disabled={!isValid}
                        />
                        <Button
                            type="button"
                            color="light"
                            onClick={() => history.goBack()}
                            icon={<i className="bi bi-x-lg"></i>}
                            border='border'
                            rounded="rounded-1"
                        />
                    </div>
                </form>
            </ContainerFormWrapper>
        </div>
    )
}
export default CreateInfo