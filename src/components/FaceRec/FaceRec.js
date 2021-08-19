import React from 'react';
import './Facerec.css';

const FaceRec = ({imageUrl,box}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={imageUrl} width='500px' height='auto'/>
                <div className='bounding-box' style={{top: box.toprow, right: box.rightcol, bottom: box.bottomrow, left: box.leftcol}}>
                    <div className="bounding-box-concepts">
                        <div className="concept bounding-box__concept" 
                        title={{name: box.name1}} 
                        role="button">
                            <span alt='' className="concept__name">{box.name1}</span></div>
                        </div>
                    </div>
            </div>

        </div>
    );
}

export default FaceRec;