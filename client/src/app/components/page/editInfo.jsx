import React, {useEffect, useState} from "react";
import ContainerFormWrapper from "../common/containerForm";
import TextAreaField from "../common/form/textAreaField";
import Button from "../common/button";
import useTerminals from "../../hooks/useTerminals";
import TextField from "../inputs/textField";
import {useSelector} from "react-redux";
import {getInfoById, removeInfo, updateInfo} from "../../store/info";
import { PORT } from "./createTerminal";

const EditInfo = () => {
    const [data, setData] = useState()

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
        params,
        isLoading,
        setIsLoading,
        handleChange,
        isValid,
        validate,
        errors
    } = useTerminals(data, setData, validatorConfig)

    const {id} = params

    const currentInfo = useSelector(getInfoById(id))

    useEffect(() => {
        if (currentInfo && !data) {
            setData(prevState => ({...currentInfo}));
        }
    }, [currentInfo, data]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const handleDelete = (id) => {
        dispatch(removeInfo(id))
        history.goBack()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate();
        if (!isValid) return;
        dispatch(updateInfo({...data}))
        history.goBack()
    }
    return (
        <>
            {!isLoading && (
                <ContainerFormWrapper>
                    <form onSubmit={handleSubmit}>
                        <div className='d-flex justify-content-end mb-4'>
                            <Button
                                type='button'
                                color='danger'
                                size='btn-sm'
                                rounded='rounded-1'
                                icon={<i className="bi bi-trash"></i>}
                                onClick={() => handleDelete(currentInfo._id)}
                            />
                        </div>
                        <img className='img-thumbnail mb-2'
                             src={data.imageUrl !== undefined ? src=`${PORT}${data.imageUrl}` : '/images/no_img.jpg'}
                             alt={data.imageUrl}/>
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
                            value={data.info}
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
                                icon={<i className="bi bi-x-lg"></i>}
                                border='border'
                                rounded="rounded-1"
                                onClick={() => history.goBack()}
                            />
                        </div>
                    </form>
                </ContainerFormWrapper>
            )}
        </>
    )
}
export default EditInfo