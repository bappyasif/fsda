import './App.css';
import FormComponent from './components/form';
import SearchComponent from './components/search';
import { useEffect, useState } from 'react';
import { getDataFromApi } from './components/utility';

function App() {
  let [data, setData] = useState([])
  let [uploaded, setUploaded] = useState(false)

  // considering data is already in database and want to load them upon entry
  useEffect(() => {
    getDataFromApi(setData)
  }, [])

  let handleFlag = () => setUploaded(true);

  // this is handy because, when data is not yet in database but just uploaded them through our form
  // then this hook will fetch data from databse whenever there is a new submit of data
  useEffect(() => {
    uploaded && getDataFromApi(setData);
    // uploaded && console.log("here!!")
  }, [uploaded])

  return (
    <div className="App">
      <FormComponent setUploaded={handleFlag} />
      <SearchComponent data={data} />
    </div>
  );
}

export default App;
