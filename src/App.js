import React,{useState, useEffect} from 'react'
import Map from './components/Map';
import List from "./components/List";
import Alert from './components/Alert';
import axios from 'axios';


let App = () =>  {
     const [showMap, setShowMap] = useState(false);
     const [showList, setShowList] = useState(false);
     const [showError, setShowError] = useState(false);
     const [ip, setIp] = useState(null);

     useEffect(() => {
          axios.get('https://api.ipify.org/?format=json').then((res) => {
               setIp(res.data.ip);
          }).catch((err) => {
               console.log(err);
               setShowError(true);
          })
     }, []);

     return (
          <div className="App">
               <div className='btns-row'  style={{display: `${showList || showError === true ? 'none' : ''}`}}>
                    <button onClick={() => setShowMap(true)} className='map-btn'>Open map</button>
                    <button onClick={() => setShowList(true)} className='locations-map'>show locations</button>
               </div>
               {showMap && <Map onClose={setShowMap} ip={ip} onError={setShowError} /> }
               {showList && <List onClose={setShowList} ip={ip} onError={setShowError} />}
               {showError && <Alert onClose={setShowError} />}
          </div>
     );
}

export default App;
