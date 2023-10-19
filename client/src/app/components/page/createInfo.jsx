import React, {useState} from "react";
import TextAreaField from "../common/form/textAreaField";
import TextField from "../inputs/textField";
import Button from "../common/button";
import useTerminals from "../../hooks/useTerminals";
import {createInfo} from "../../store/info";
import ContainerFormWrapper from "../common/containerForm";

const CreateInfo = () => {
    const [data, setData] = useState({
        image: '',
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
        dispatch(createInfo({...data}));
        // history.push('/')
    };

    return (
        <div>
            <ContainerFormWrapper>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label='Ссылка на фотографию'
                        type='text'
                        name='image'
                        value={data.image}
                        onChange={handleChange}
                        error={errors.image}
                    />
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