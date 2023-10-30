import React from "react";
import InfoCard from "../common/infoCard";
import {useSelector} from "react-redux";
import {getInfo, getInfoLoadingStatus} from "../../store/info";
import {Link} from "react-router-dom";

const InfoPage = () => {

    const info = useSelector(getInfo())
    const infoLoading = useSelector(getInfoLoadingStatus())
    return (
        <div className='container mt-2'>
            <div>
                <div className='row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4'>
                    <div className='col'>
                        <Link to={'/createInfo'}>
                            <div className="card h-100 w-100 d-flex justify-content-center align-items-center btn btn-light">
                                    <i className="bi bi-file-plus text-secondary" style={{fontSize: 200}}></i>
                            </div>
                        </Link>
                    </div>
                    {!infoLoading && info.map(i => (
                        <InfoCard
                            key={i._id}
                            info={i.info}
                            id={i._id}
                            title={i.title}
                            urlImg={i.imageUrl}
                        />
                    ))}
                </div>
            </div>
            {/*row row-cols-1 row-cols-md-4 g-4*/}
            {/*           <div className="">*/}
            {/*               <div className=''>*/}
            {/*                   <div className=''>*/}
            {/*                       <div className='d-flex bg-light'>*/}
            {/*                           <Link to={'/createInfo'} className='bg-light'>+</Link>*/}
            {/*                       </div>*/}
            {/*                   </div>*/}
            {/*               </div>*/}
            {/*               {!infoLoading && info.map(i => (*/}
            {/*                   <div className="card mb-3">*/}
            {/*                       <div className="row g-0">*/}
            {/*                           <div className="col-md-4">*/}
            {/*                               <img src={i.image} className="img-fluid rounded-start" alt="..."/>*/}
            {/*                           </div>*/}
            {/*                           <div className="col-md-8">*/}
            {/*                               <div className="card-body">*/}
            {/*                                   <h5 className="card-title">{i.title}</h5>*/}
            {/*                                   <p className="card-text">{i.info}</p>*/}
            {/*                                   <p className="card-text"><small className="text-body-secondary">Last updated 3 mins*/}
            {/*                                       ago</small></p>*/}
            {/*                               </div>*/}
            {/*                           </div>*/}
            {/*                       </div>*/}
            {/*                   </div>*/}
            {/*                   // <InfoCard*/}
            {/*                   //     id={i._id}*/}
            {/*                   //     info={i.info}*/}
            {/*                   //     urlImg={i.image}*/}
            {/*                   //     title={i.title}*/}
            {/*                   // />*/}
            {/*               ))}*/}
            {/*           </div>*/}
        </div>
    )
}
export default InfoPage