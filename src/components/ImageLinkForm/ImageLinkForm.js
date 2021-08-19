import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange , onButtonSubmit}) => {
    return (
      <div className='ma4 mt0'>
        <p className='f3'>
            {'This app will detect face.'}
        </p>
        <div className='center'>
            <div className='pa4 center form br3 shadow-5'>
            <input className='f4 pa2 w-70 center br40' type='text' onChange={onInputChange}/>
            <button 
                onClick={onButtonSubmit}
                className='w-30 grow br f4 measure-narrow Justified Alignment link ph3 pv2 dib white bg-blue'>
                    Detect
            </button>
            </div>
        </div>
      </div>
    );
}

export default ImageLinkForm;