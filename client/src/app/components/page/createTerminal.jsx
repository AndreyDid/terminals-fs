import React, {useCallback, useEffect, useRef, useState} from "react";
import {createTerminal} from "../../store/terminals";
import {sumPrice} from "../../utils/sumPrice";
import ContainerFormWrapper from "../common/containerForm";
import TextField from "../inputs/textField";
import MultiSelectField from "../inputs/multiSelectField";
import SelectField from "../inputs/selectField";
import Button from "../common/button";
import SelectDataField from "../inputs/selectDataField";
import useTerminals from "../../hooks/useTerminals";
import _ from "lodash";
import {nanoid} from "nanoid";
import axios from "../../../axios";

const CreateTerminal = () => {
    const inputFileRef = useRef(null)
    const [imageUrl, setImageUrl] = useState(null)

    const [value, setValue] = useState('')

    const [data, setData] = useState({
        month: '',
        year: '',
        imageUrl: '',
        number: '',
        city: '',
        body: '',
        works: '',
        sum: ''
    })

    const [numberTo, setNumberTo] = useState({
        number: ''
    })

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
        // sum: {
        //     isRequired: {
        //         message: "Это поле обязательно для заполнения"
        //     }
        // },
    };

    const {
        history,
        dispatch,
        bodies,
        works,
        bodyLoading,
        workLoading,
        currentDate,
        isLoading,
        setIsLoading,
        month,
        year,
        currentYearFilter,
        handleChange,
        isValid,
        validate,
        errors,
        setting,
        settingLoading
    } = useTerminals(data, setData, validatorConfig)

    const handleChangeStart = (target) => {
        const value = target.value
        setData((prevState) => ({...prevState, [target.name]: target.value}));
        if (value > Number(numberTo.number)) {
            setNumberTo({number: value})
        }
    };
    const handleChangeEnd = (target) => {
        setNumberTo((prevState) => ({...prevState, [target.name]: target.value}));
    };

    useEffect(() => {
        if (data) {
            setData({
                ...data,
                month: month[currentDate.getMonth()],
                year: currentYearFilter[0],
            })
        }
    }, [])
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false)
        }
    }, [data, isLoading, setIsLoading])

    const handleIncrement = useCallback(() => {
        return setNumberTo(prevState => ({...numberTo, number: Number(numberTo.number) + Number(1)}))
    }, [numberTo])

    function filterName(arr) {
        return _.orderBy(arr, ['name'], ['asc'])
    }

    if (!bodyLoading && !workLoading && !settingLoading) {

        const sumTerminalDefault = !settingLoading && setting[0].sumTerminal
        const sumPgiDefault = !settingLoading && setting[0].sumPgi

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

        const handleSubmit = async (e) => {
            e.preventDefault();
            const worksPrice = data.works.map(s => s.sum)
            const allWorksPrice = sumPrice(worksPrice)
            const isValid = validate();
            if (!isValid) return;
            const orderId = nanoid()
            for (let i = Number(data.number); i <= numberTo.number; i++) {
                const newData = {
                    ...data,
                    number: Number(i),
                    singleOrder: Number(data.number) < numberTo.number ? orderId : '',
                    works: data.works.map(w => w.value),
                    imageUrl: imageUrl,
                    body: data.body.value,
                    sum: data.body.label === 'ПГИ' ? Number(sumPgiDefault) + allWorksPrice : Number(sumTerminalDefault) + allWorksPrice
                }
                setValue(i)
                await dispatch(createTerminal({...newData}));
            }
            history.goBack()
        };

        const handleChangeFile = async (event) => {
            try {
                const formData = new FormData()
                const file = event.target.files[0]
                formData.append('image', file)
                const {data} = await axios.post('/uploads', formData)
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
            <ContainerFormWrapper>
                <h2 className='text-secondary'>Новый терминал</h2>
                {/*<YourComponent onChange={getImage}/>*/}
                {/*<UploadSelectel/>*/}
                {!isLoading && (
                    <form onSubmit={handleSubmit}>
                        <SelectDataField
                            month={month}
                            year={year}
                            data={data}
                            handleChange={handleChange}
                        />
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
                        <div className='d-flex'>
                            <div className='me-4'>
                                <TextField
                                    type='number'
                                    label='№ терминала'
                                    name='number'
                                    id='0001'
                                    value={data.number}
                                    onChange={handleChangeStart}
                                    placeholder='От'
                                    error={errors.number}
                                    // count={true}
                                    // increment={handleIncrement}
                                />
                            </div>
                            <TextField
                                type='number'
                                count={true}
                                name='number'
                                id='0002'
                                value={numberTo.number}
                                onChange={handleChangeEnd}
                                increment={handleIncrement}
                                placeholder='До'
                                error={errors.number}
                            />
                        </div>
                        <TextField
                            type='text'
                            label='Город'
                            name='city'
                            id='0003'
                            value={data.city}
                            onChange={handleChange}
                            placeholder='Введите город заказчика...'
                        />
                        <SelectField
                            label='Корпус'
                            name="body"
                            options={bodyList}
                            onChange={handleChange}
                            value={data.body}
                            placeholder='Выбрать корпус...'
                            error={errors.body}
                        />
                        <MultiSelectField
                            label='Доработки'
                            name='works'
                            options={worksList}
                            onChange={handleChange}
                            value={data.works}
                            placeholder='Выбрать доработки...'
                            error={errors.works}
                        />
                        <TextField
                            label='Сумма'
                            type='number'
                            name='sum'
                            id='0004'
                            isDisabled={true}
                            // value={data.sum}
                            value={data.body.label === 'ПГИ' ? Number(sumPgiDefault) : Number(sumTerminalDefault)}
                            onChange={handleChange}
                            error={errors.sum}
                        />
                        {!value ? (
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
                        ) : (
                            <p>Загружено терминалов: {value}</p>
                        )}
                    </form>
                )}
            </ContainerFormWrapper>
        )
    }
}

export default CreateTerminal