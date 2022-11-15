import React, { useEffect, useState } from 'react'
import "./List.css"
import axios from 'axios'

const List = ({onClose, ip}) => {
     const [data, setData] = useState();

     useEffect(() => {
          ip && axios.get('https://dev-sso.transparenterra.com/api/location-list').then((res) => {
               let filtered = res.data.data.filter((item) => item.ip === ip);
               setData(filtered)
          });
     },[])

     return (
          <div className='list-overlay'> 
               <div className="list-modal">
                    <div className="list-container">
                         <div className="list-row">
                              <h2 className='list-title'>List of locations</h2>
                              <img onClick={() => onClose(false)} className='list-close' src="Close.png" alt="close" />
                         </div>
                         <table className='table'>
                              <tr  >
                                   <th>Ip</th>
                                   <th>Coord_x</th>
                                   <th>Coord_y</th>
                              </tr>
                              {data && data.map((item, index) => (
                                   <tr key={index}>
                                        <td>{item.ip}</td>
                                        <td>{item.coord_x}</td>
                                        <td>{item.coord_y}</td>
                                   </tr>
                              ))}
                         </table>
                    </div>
               </div>
          </div>
     )
}

export default List