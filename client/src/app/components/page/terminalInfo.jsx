import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getTerminalById, getTerminalByOrderId} from "../../store/terminals";
import {getBodyById} from "../../store/body";
import useTerminals from "../../hooks/useTerminals";
import {PORT} from "./createTerminal";
import _ from "lodash";
import Works from "../ui/works";


const TerminalInfo = () => {
    const [data, setData] = useState()

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
    } = useTerminals()

    const {id} = params
    const currentTerminal = useSelector(getTerminalById(id))
    console.log(currentTerminal)

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

    return (
        <div className='container mt-4'>
            <div className='shadow-sm bg-light p-4 rounded-1 border'>
                {!isLoading && !bodyLoading && !workLoading && (
                    <div className='d-flex'>
                        <div style={{width: 30 + '%'}}>
                            {data.imageUrl !== null && (
                                <img className='img-thumbnail' src={`${PORT}${data.imageUrl}`}
                                     alt={data.imageUrl}/>
                            )}
                        </div>
                        <div className='d-flex m-2'>
                            <div>
                                <div className='fw-bolder'>Number: {data.number}</div>
                                <div className='fw-bolder'>City: {data.city}</div>
                                <div className='fw-bolder'>Body: {data.body.label}</div>
                                <div className='fw-bolder'>
                                    Works:
                                    <Works works={currentTerminal.works} sumTerminal={currentTerminal.sum}
                                           bodyTerminal={currentTerminal.body} setting={setting}/>
                                </div>
                                <div className='fw-bolder'>Sum: {data.sum}</div>
                            </div>
                            <div>
                                <div>Терминалов в заказе: {order.length}</div>
                                <div>Номер: {order[0].number} - {order.at(-1).number}</div>

                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TerminalInfo