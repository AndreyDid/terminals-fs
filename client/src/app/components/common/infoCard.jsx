import React from "react";
import Button from "./button";
import history from "../../utils/history";

const InfoCard = ({urlImg, title, info, id}) => {

    const handleClickInfo = (id) => {
        history.push(`${id}/editInfo`)
    }

    return (
        <div className='border mb-2'>
            <div className='d-flex position-relative'>
                <div className='opacity-50 position-absolute end-0'>
                    <Button
                        color='secondary'
                        icon={<i className="bi bi-pencil-square"></i>}
                        onClick={() => handleClickInfo(id)}
                    />
                </div>
                <img src={urlImg} alt={urlImg} className='object-fit-sm-contain border me-2 w-25'/>
                <div>
                    <h5 className='mt-2'>{title}</h5>
                    <hr/>
                    <p style={{whiteSpace: 'pre-wrap'}}>{info}</p>
                </div>
            </div>
        </div>
    )
}
export default InfoCard