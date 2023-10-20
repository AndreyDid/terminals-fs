import React, {useEffect, useState} from "react";
import {getTerminalById, getTerminalByOrderId, removeTerminal, updateTerminal} from "../../store/terminals";
import {useSelector} from "react-redux";
import {getBodyById} from "../../store/body";
import {sumPrice} from "../../utils/sumPrice";
import TextField from "../inputs/textField";
import SelectField from "../inputs/selectField";
import MultiSelectField from "../inputs/multiSelectField";
import Button from "../common/button";
import ContainerFormWrapper from "../common/containerForm";
import SelectDataField from "../inputs/selectDataField";
import useTerminals from "../../hooks/useTerminals";
import _ from "lodash";
import Loader from "../common/loader";
// import history from "../../utils/history";

const EditTerminalPage = () => {
    const [data, setData] = useState()

    const validatorConfig = {
        number: {
            isRequired: {
                message: "Это поле обязательно для заполнения"
            }
        },
        body: {
            isRequired: {
                message: "Это поле обязательно для заполнения"
            }
        },
        works: {
            isRequired: {
                message: "Это поле обязательно для заполнения"
            }
        },
        sum: {
            isRequired: {
                message: "Это поле обязательно для заполнения"
            }
        },
    };

    const {
        history,
        params,
        dispatch,
        bodies,
        works,
        workLoading,
        bodyLoading,
        isLoading,
        setIsLoading,
        settingLoading,
        month,
        year,
        handleChange,
        isValid,
        validate,
        errors,
        setting
    } = useTerminals(data, setData, validatorConfig)

    const {id} = params

    const currentTerminal = useSelector(getTerminalById(id))

    const currentBody = useSelector(getBodyById(currentTerminal.body))

    const order = useSelector(getTerminalByOrderId(currentTerminal.singleOrder))
    console.log('order', order)

    const transformBody = {
        label: currentBody === undefined ? 'Error' : currentBody.name,
        value: currentBody === undefined ? 'Error' : currentBody._id
    }

    function filterName(arr) {
        return _.orderBy(arr, ['name'], ['asc'])
    }

    const filterBodyName = filterName(bodies)
    const bodyList = filterBodyName.map(b => ({
        label: b.name,
        value: b._id
    }))

    const filterWorksName = filterName(works)
    const worksList = filterWorksName.map(b => ({
        label: b.name,
        value: b._id,
        sum: b.sum
    }))

    function getWorksListByIds(worksIds) {
        const worksArray = []
        for (const workId of worksIds) {
            for (const work of works) {
                if (work._id === workId) {
                    worksArray.push(work)
                    break
                }
            }
        }
        return worksArray
    }

    const transformData = (data) => {
        const result = getWorksListByIds(data).map(work => ({
            label: work.name,
            value: work._id,
            sum: work.sum
        }))
        return result
    }

    useEffect(() => {
        if (!bodyLoading && !workLoading && transformBody && currentTerminal && !data) {
            setData({
                ...currentTerminal,
                body: transformBody,
                works: transformData(currentTerminal.works)
            })
        }
    }, [bodyLoading, workLoading, currentTerminal, transformBody, data])
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false)
        }
    }, [data])

    const handleDelete = (id) => {
        dispatch(removeTerminal(id))
        history.goBack()
    }


    function handleIncrement() {
        return setData(prevState => ({...prevState, number: Number(data.number) + Number(1)}))
    }

    if (!settingLoading) {

        const sumTerminalDefault = setting[0].sumTerminal
        const sumPgiDefault = setting[0].sumPgi

        const handleSubmit = async (e) => {
            e.preventDefault()
            const worksPrice = data.works.map(s => s.sum)
            const allWorksPrice = sumPrice(worksPrice)
            const isValid = validate();
            if (!isValid) return;
            // for (const item of order) {
            // }
            const newData = {
                ...data,
                number: Number(data.number),
                works: data.works.map(w => w.value),
                // works: data.works,
                body: data.body.value,
                sum: data.body.label === 'ПГИ' ? Number(sumPgiDefault) + allWorksPrice : Number(sumTerminalDefault) + allWorksPrice
            }
            dispatch(
                updateTerminal({...newData})
            )
            history.goBack()
        }
        console.log(data)
        return (
            <>
                {!isLoading && !bodyLoading && !workLoading && (
                    <ContainerFormWrapper>
                        <form onSubmit={handleSubmit}>
                            <div className='d-flex justify-content-between'>
                                <h2 className='text-secondary'>Редактировать терминал</h2>
                                <div className='d-flex align-items-center justify-content-end'>
                                    <Button
                                        type='button'
                                        color='danger'
                                        size='btn-sm'
                                        rounded='rounded-1'
                                        icon={<i className="bi bi-trash"></i>}
                                        onClick={() => handleDelete(data._id)}
                                    />
                                </div>
                            </div>
                            <SelectDataField
                                month={month}
                                year={year}
                                data={data}
                                handleChange={handleChange}
                            />
                            <img className='img-thumbnail' src={`http://82.148.18.40${data.imageUrl}`} alt={data.imageUrl}/>
                            <TextField
                                type='number'
                                count={true}
                                label='№ терминала'
                                name='number'
                                value={data.number}
                                onChange={handleChange}
                                increment={handleIncrement}
                                error={errors.number}
                            />
                            <TextField
                                type='text'
                                label='Город'
                                name='city'
                                value={data.city}
                                onChange={handleChange}
                            />
                            <SelectField
                                label='Корпус'
                                name="body"
                                options={bodyList}
                                onChange={handleChange}
                                defaultValue={data.body}
                                error={errors.body}
                            />
                            <MultiSelectField
                                label='Выбрать доработки'
                                defaultOption='Доработки...'
                                name='works'
                                options={worksList}
                                onChange={handleChange}
                                defaultValue={data.works}
                                error={errors.works}
                            />
                            <TextField
                                label='Сумма'
                                type='number'
                                name='sum'
                                value={data.body.label === 'ПГИ' ? Number(sumPgiDefault) : Number(sumTerminalDefault)}
                                onChange={handleChange}
                                isDisabled={true}
                                error={errors.sum}
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
                )}
            </>
        )
    } else <Loader/>
}
export default EditTerminalPage