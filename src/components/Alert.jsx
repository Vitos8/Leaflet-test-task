import React from 'react'
import "./List.css" 

const Alert = ({onClose}) => {
     return (
          <div className='list-overlay'> 
               <div className="list-modal">
                    <div className="list-container">
                         <div className="list-row">
                              <h2 className='list-title'>Error</h2>
                              <img onClick={() => onClose(false)} className='list-close' src="Close.png" alt="close" />
                         </div>
                         <p className='list-text'>Something went wrong try again</p>
                         <div className="list-btn-row">
                              <button className='list-btn' onClick={() => onClose(false)}>OK</button>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default Alert