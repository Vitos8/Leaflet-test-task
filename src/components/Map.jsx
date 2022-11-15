import React, { useState } from 'react'
import { MapContainer, TileLayer, useMapEvents,Marker, Popup } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import './Map.css'
import axios from 'axios';

const icon = L.icon({
     iconSize: [25, 41],
     iconAnchor: [10, 41],    
     popupAnchor: [2, -40],
     iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
     shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

let  AddMarker = ({ saveMarker, marker,  }) => {
     const map = useMapEvents({
          click: (e) => {
               const { lat, lng } = e.latlng;
               saveMarker([lat, lng]);
          }
     });
     return null;
}

const Map = ({onClose, ip,onError}) => {
     const [marker, setMarker] = useState([51.505, -0.09]);

     let saveMarker = (newMarkerCoord) => {
          setMarker(newMarkerCoord);
     }

     let onSaveLocation = () => {
          axios.post('https://dev-sso.transparenterra.com/api/save-location', {
               ip,
               coord_x: marker[0], 
               coord_y: marker[1]
          }).then((res) => {
               onClose(false);
          }).catch(() => {
               onError(true)
          });
     }

     console.log(marker);
     return (
          <div className="map-overlay">
               <div className='map-modal center'>
                    <div className="map-container">
                         <div className="map-row">
                              <h1 className='map-title'>Transparenterra community map</h1>
                              <img onClick={() => onClose(false)} className='map-img' src="Close.png" alt="Close" />
                         </div>
                         <MapContainer className='map center' center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
                              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                   <Marker
                                        position={marker}
                                        draggable={true}
                                        icon={icon}>
                              </Marker>
                              <AddMarker saveMarker={saveMarker} marker={marker} />
                         </MapContainer>    
                         <div className="map-btn-row">
                              <button onClick={onSaveLocation} className='map-btn' >Save</button>
                         </div> 
                    </div>
               </div>
          </div>
     )
}

export default Map