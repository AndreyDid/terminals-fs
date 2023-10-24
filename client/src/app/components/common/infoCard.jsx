import React from "react";
import Button from "./button";
import history from "../../utils/history";

const InfoCard = ({urlImg, title, info, id}) => {

    const handleClickInfo = (id) => {
        history.push(`${id}/editInfo`)
    }
    return (
        // <div className='border mb-2'>
        //     <div className='d-flex position-relative'>
        //         <div className='opacity-50 position-absolute end-0'>
        //             <Button
        //                 color='secondary'
        //                 icon={<i className="bi bi-pencil-square"></i>}
        //                 onClick={() => handleClickInfo(id)}
        //             />
        //         </div>
        //         <img src={`http://82.148.18.40${urlImg}`} alt={urlImg} className='object-fit-sm-contain border me-2 w-25'/>
        //         <div>
        //             <h5 className='mt-2'>{title}</h5>
        //             <hr/>
        //             <p style={{whiteSpace: 'pre-wrap'}}>{info}</p>
        //         </div>
        //     </div>
        // </div>
        <div className='col'>
            <div className="card h-100 w-100">
                <div className='opacity-75 position-absolute end-0'>
                    <Button
                        color='dark'
                        icon={<i className="bi bi-pencil-square"></i>}
                        onClick={() => handleClickInfo(id)}
                    />
                </div>
                <img src={urlImg ? `http://82.148.18.40${urlImg}` : 'images/no_img.jpg'}
                     className="card-img-top border-bottom" alt={urlImg}/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <hr/>
                    <p className="card-text" style={{whiteSpace: 'pre-wrap'}}>{info}</p>
                </div>
            </div>
        </div>
    )
}
export default InfoCard