import React, {useState} from "react";
import {Link} from "react-router-dom";
import {sumPrice} from "../../utils/sumPrice";
import Body from "./body";
import Works from "./works";
import Button from "../common/button";
import _ from 'lodash'
import SearchField from "../common/form/searchField";
import useTerminals from "../../hooks/useTerminals";
import history from "../../utils/history";
import PropTypes from "prop-types";
import Select from "react-select";
import {removeTerminal} from "../../store/terminals";
import Modal from "../modal";


const TerminalsTable = ({terminals, extraWorks}) => {
    const [btnOn, setBtnOn] = useState(true)

    const {year, month, currentMonth, currentYear, dispatch, setting} = useTerminals()

    const selectMonth = localStorage.getItem('month')
    const selectYear = localStorage.getItem('year')

    const filterCurrentYear = year.filter(y => Number(y.label) === currentYear)

    //--- Фильтрация по месяцу и поисковая строка---
    const [selectedMonth, setSelectedMonth] = useState(selectMonth === null ? month[currentMonth] : JSON.parse(selectMonth))
    const [selectedYear, setSelectedYear] = useState(selectYear === null ? filterCurrentYear[0] : JSON.parse(selectYear))
    const [searchQuery, setSearchQuery] = useState('')

    const handleMonthSelect = item => {
        if (searchQuery !== '') setSearchQuery('')
        setSelectedMonth(item)
        localStorage.setItem('month', JSON.stringify(item))
    }
    const handleYearSelected = item => {
        if (searchQuery !== '') setSearchQuery('')
        setSelectedMonth(null)
        setSelectedYear(item)
        localStorage.setItem('year', JSON.stringify(item))
    }

    const handleSearchQuery = ({target}) => {
        setSearchQuery(target.value)
    }

    function filterTerminals(sortedDataTerminals, selectedYear, selectedMonth, searchQuery) {
        let filteredTerminals = sortedDataTerminals;

        if (selectedYear) {
            filteredTerminals = filteredTerminals.filter(
                terminal => terminal.year.value === selectedYear.value
            );
        }

        if (selectedMonth) {
            filteredTerminals = filteredTerminals.filter(
                terminal => terminal.month.value === selectedMonth.value
            );
        }

        if (searchQuery) {
            filteredTerminals = sortedDataTerminals.filter(
                terminal => String(terminal.number).includes(searchQuery)
            );
        }

        return filteredTerminals;
    }

    const sortedDataTerminals = _.orderBy(terminals, ['created_at'], ['asc'])

    const filteredExtraWorks = filterTerminals(extraWorks, selectedYear, selectedMonth)
    const filteredTerminal = filterTerminals(sortedDataTerminals, selectedYear, selectedMonth, searchQuery)
    // ----------------------------------------------------------

    //--- Кол-во терминалов и сумма всех терминалов и доработок---
    const terminalCount = filteredTerminal.length

    const filterSumAllPrice = filteredTerminal.map(s => s.sum)
    const filterSumAllPriceExtraWorks = filteredExtraWorks.map(e => e.sum)
    const sumAllTermPrice = sumPrice(filterSumAllPrice)
    const allExtraWorkSumPrice = sumPrice(filterSumAllPriceExtraWorks)

    const percent = 5
    const worksSumPrice = filteredExtraWorks.length > 0 ? sumAllTermPrice + (selectedMonth === null ? allExtraWorkSumPrice : Number(filteredExtraWorks[0].sum)) : sumAllTermPrice + 0

    const result = worksSumPrice / 100 * percent

    //--------------------------------------------------
    const handleClick = (id) => {
        // history.push(history.location.pathname + `/${id}/editTerminal`)
        history.push(history.location.pathname + `${id}/editTerminal`)
    }

    // const handleClickTerminalInfo = (id) => {
    //     // history.push(history.location.pathname + `/${id}/editTerminal`)
    //     history.push(history.location.pathname + `${id}/terminalInfo`)
    // }

    const handleClickExtraWorks = (id) => {
        history.push(history.location.pathname + `${id}/editExtraWorks`)
    }

    const handleDelete = (orderId) => {
        const order = filteredTerminal.filter(order => order.singleOrder === orderId)
        // console.log('delete order', order)
        for (const items of order) {
            dispatch(removeTerminal(items._id))
        }
    }

    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => {
        setShowModal((prevState) => !prevState)
    }

    const checkBtn = () => {
        setBtnOn((prevState) => !prevState)
    }
    return (
        <div className='container flex-column mt-2'>
            <div className='d-flex justify-content-between'>
                <Link to={'/infoPage'}
                      className='d-flex justify-content-between btn btn-light border mb-2'>
                    <div>Информация</div>
                </Link>
                <Link to={'/createSetting'}
                      className='d-flex justify-content-between btn btn-light border mb-2'>
                    <div>Настройки</div>
                </Link>
            </div>
            <div className="d-flex pt-1 mb-2">
                <div style={{width: 250, marginRight: 15}}>
                    <Select
                        isSearchable={false}
                        closeMenuOnSelect={true}
                        defaultValue={selectedYear}
                        options={year}
                        onChange={handleYearSelected}
                    />
                </div>
                <div style={{width: 250, marginRight: 15}}>
                    <Select
                        isSearchable={false}
                        closeMenuOnSelect={true}
                        defaultValue={selectedMonth}
                        options={month}
                        onChange={handleMonthSelect}
                    />
                </div>
                <SearchField
                    name='search'
                    onChange={handleSearchQuery}
                    value={searchQuery}
                />
            </div>
            <div className="form-check">
                <input onClick={checkBtn} className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Удаление заказа
                </label>
            </div>
            <hr/>
            <table className="table table-sm table align-middle">
                <thead>
                <tr>
                    <th scope="col" className='col-1'>№</th>
                    <th scope="col" className='col-2'>
                        <div>
                            <Link className='btn btn-light btn-sm border d-flex justify-content-between'
                                  to={'/createBody'}>
                                <span>
                                    Корпус
                                </span>
                                <span>
                                    +
                                </span>
                            </Link>
                        </div>
                    </th>
                    <th scope="col" colSpan='1'>
                        <Link className='btn btn-light border btn-sm d-flex justify-content-between'
                              to={'/createWorks'}>
                            <span>
                                Доработки
                            </span>
                            <span>
                                +
                            </span>
                        </Link>
                    </th>
                    <th scope='col' className='col-1' colSpan='2'>
                        {!showModal && (
                            <button type='button'
                                    className='btn btn-light border btn-sm d-flex justify-content-between fw-bold'
                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                    title="Обновить цену терминалов в месяце"
                                    onClick={handleShowModal}>
                <span>
                Цена
                </span>
                            </button>
                        )}
                        {showModal && (
                            <Modal terminals={filteredTerminal} showModal={showModal} setShowModal={setShowModal}
                                   dispatch={dispatch}
                                   setting={setting}/>
                        )}
                    </th>
                    {/*{showModal ?*/}
                    {/*    <th scope="col">*/}
                    {/*        <Modal terminals={filteredTerminal} showModal={showModal} dispatch={dispatch}*/}
                    {/*               setting={setting}/>*/}
                    {/*    </th>*/}
                    {/*    :*/}
                    {/*    <th scope="col">Цена</th>*/}
                    {/*}*/}
                </tr>
                </thead>
                <tbody>
                {filteredTerminal.length > 0 && filteredTerminal.map(t => (
                    <tr key={t._id}>
                        <td key={t._id} className='align-items-center'>
                            <p className='m-0 p-0 fw-bold'>{t.number}</p>
                        </td>
                        <td>
                            <Body id={t.body}/>
                        </td>
                        <td>
                            {t.city !== undefined &&
                                <div className='fst-italic fw-light' style={{fontSize: 12}}>{t.city}</div>
                            }
                            <Works works={t.works} sumTerminal={t.sum} bodyTerminal={t.body} setting={setting}/>
                        </td>
                        <td><p className='m-0 p-0'>{t.sum}</p></td>
                        <td>
                            <div className='d-flex justify-content-end'>
                                <div className='d-flex'>
                                    <Button
                                        type='button'
                                        color='light'
                                        border="border"
                                        size='btn-sm'
                                        rounded='rounded-1'
                                        icon={<i className="bi bi-pencil-square"></i>}
                                        onClick={() => handleClick(t._id)}
                                    />
                                    {!btnOn && t.singleOrder && (
                                        <div className='ms-1'>
                                            <Button
                                                type='button'
                                                color='danger'
                                                size='btn-sm'
                                                rounded='rounded-1'
                                                icon={<i className="bi bi-trash"></i>}
                                                onClick={() => handleDelete(t.singleOrder)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
                <tr>
                    <th scope='row' colSpan='5'>
                        <div className='d-grid mx-auto'>
                            {!filteredExtraWorks.length > 0 ? (
                                    <Link to={'/createExtraWorks'}
                                          className='d-flex justify-content-between btn btn-light border'>
                                        <div>Доп. работы:</div>
                                        <div>+</div>
                                    </Link>
                                ) :
                                <div className='d-flex justify-content-between btn btn-light disabled border'>
                                    Доп. работы:
                                </div>
                            }
                        </div>
                    </th>
                </tr>
                {filteredExtraWorks.length > 0 && filteredExtraWorks.map(e => (
                        <tr key={e._id}>
                            <th scope='row' colSpan='3'>
                                <div className='fw-semibold' style={{whiteSpace: 'pre-wrap'}}>
                                    <p>{e.extraWorks}</p>
                                </div>
                            </th>
                            <th colSpan='1'>{e.sum}</th>
                            <th className='text-end'>
                                <Button
                                    type='button'
                                    color='light'
                                    border="border"
                                    size='btn-sm'
                                    rounded='rounded-1'
                                    icon={<i className="bi bi-pencil-square"></i>}
                                    onClick={() => handleClickExtraWorks(e._id)}
                                />
                            </th>
                        </tr>
                    )
                )}
                <tr>
                    <th scope='row' colSpan='1'>
                        Итого:
                    </th>
                    <th>{terminalCount}</th>
                    <th colSpan='3' className='text-end'>
                        {sumAllTermPrice} + {allExtraWorkSumPrice} = {sumAllTermPrice + allExtraWorkSumPrice} -
                        5%({result})
                        = {worksSumPrice - result}
                    </th>
                </tr>
                <tr>
                    <th scope='row' colSpan='6'>
                        <div className='d-grid mx-auto'>
                            <Link to={'/createTerminal'} className='btn btn-light border'>+</Link>
                        </div>
                    </th>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
TerminalsTable.propTypes = {
    terminals: PropTypes.array,
    extraWorks: PropTypes.array
}
export default TerminalsTable
