import React from "react";
import {updateTerminal} from "../store/terminals";
import {sumPrice} from "../utils/sumPrice";
import Button from "./common/button";
import useTerminals from "../hooks/useTerminals";

const Modal = ({terminals, dispatch, setting, showModal, setShowModal}) => {

    const {
        works,
        bodies,
    } = useTerminals()

    // const handleDelete = (orderId) => {
    //     const order = filteredTerminal.filter(order => order.singleOrder === orderId)
    //     // console.log('delete order', order)
    //     for (const items of order) {
    //         // dispatch(removeTerminal(items._id))
    //     }
    // }

    function getBodiesListByIds(bodiesIds) {
        const bodyArray = []
        for (const body of bodies) {
            if (body._id === bodiesIds) {
                bodyArray.push(body)
                break
            }
        }
        return bodyArray
    }

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

    const transformDataBody = (data) => {
        const result = getBodiesListByIds(data).map(body => ({
            label: body.name,
            value: body._id,
        }))
        return result
    }

    const transformDataWorks = (data) => {
        const result = getWorksListByIds(data).map(work => ({
            label: work.name,
            value: work._id,
            sum: work.sum
        }))
        return result
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const sumTerminalDefault = setting[0].sumTerminal
        const sumPgiDefault = setting[0].sumPgi
        handleShow()
        const newTerminals = []
        const newWorks = []
        terminals.map(terminal => {
            const newData = {
                ...terminal,
                body: transformDataBody(terminal.body),
                works: transformDataWorks(terminal.works)
            }
            const works = (transformDataWorks(terminal.works).map(s => s.sum))

            newWorks.push(works[0].sum)

            const allWorksPrice = sumPrice(works)

            const newTerm = {
                ...newData,
                body: newData.body.map(body => body.value).join(''),
                works: newData.works.map(work => work.value),
                sum: newData.body.map(body => body.label).join('') === 'ПГИ' ? Number(sumPgiDefault) + allWorksPrice : Number(sumTerminalDefault) + allWorksPrice
            }
            dispatch(updateTerminal(newTerm))
        })
    }
    const handleShow = () => {
        setShowModal(false)
    }
    return (
        <>
            <button type='button' className='btn btn-light border btn-sm d-flex justify-content-between fw-bold'

                    onClick={handleSubmit}>
                <span>
                Обновить
                </span>
            </button>
        </>
    )
}
export default Modal