import React from "react";

const Preview = ({image, onDelete}) => {
    const {url} = image
    return (
        <div className='container w-25'>
            <div>
                <div className='d-flex justify-content-between'>
                    {image.ref && <i className="bi bi-cloud-check bg-light opacity-75 rounded-2"></i>}
                    <button onClick={() => onDelete(image)} type="button" className="btn-close"
                            aria-label="Close"></button>
                </div>
                <img className='img-fluid' src={url} alt={url}/>
            </div>
        </div>
    )
}
export default Preview