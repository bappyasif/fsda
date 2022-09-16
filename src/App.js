import './App.css';
import FormComponent from './components/form';
import SearchComponent from './components/search';
import { useEffect, useState } from 'react';
import { getDataFromApi } from './components/utility';

function App() {
  let [data, setData] = useState([])
  let [uploaded, setUploaded] = useState(false)
  
  useEffect(() => {
    getDataFromApi(setData)
  }, [])

  let handleFlag = () => setUploaded(true);

  useEffect(() => {
    uploaded && getDataFromApi(setData)
  }, [uploaded])

  return (
    <div className="App">
      <FormComponent setUploaded={handleFlag} />
      <SearchComponent data={data} />
    </div>
  );
}

export default App;
