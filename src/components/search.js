import React, { useEffect, useState } from 'react'
import { extractData, matchEntries } from './utility'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faUser, faComment, faSearch} from "@fortawesome/free-solid-svg-icons"
import axios from "axios";

function SearchComponent({data}) {
  // let [data, setData] = useState([])

  let [searchText, setSearchText] = useState(null)

  let [foundMatches, setFoundMatches] = useState([])
  
  let handleSearchText = evt => setSearchText(evt.target.value)

  // useEffect(() =>  setData(extractData()), [])

  // useEffect(() => {
  //   axios.get("http://localhost:3001/data")
  //   .then(res => {
  //     // console.log(data)
  //     setData(res.data)
  //   })
  //   .catch(err => console.log(err))
  // }, [])
  
  useEffect(() => {
    setFoundMatches(matchEntries(data, searchText))
  }, [searchText])

  // console.log(foundMatches, "ready!!", searchText)

  return (
    <div className='sc-container'>
        <SearchView handleSearchText={handleSearchText} />
        {searchText ? <ListingsView list={foundMatches} /> : null}
    </div>
  )
}

let ListingsView = ({list}) => {
  let renderListItems = () => list?.map(item => <RenderItemView key={item.id} comment={item} />)

  return (
    <div className='lv-wrapper'>
      <ul>
        {renderListItems()}
      </ul>
    </div>
  )
}

let RenderItemView = ({comment}) => {
  let {body, user} = {...comment}

  return (
    <li className='iv-wrapper'>
      <span className='user-part'><FontAwesomeIcon icon={faUser} /> {user.username} </span>
      <span className='comment-part'><FontAwesomeIcon icon={faComment} className="body-svg" /> {body}</span>
    </li>
  )
}

let SearchView = ({handleSearchText}) => {
  return (
    <div className='sv-wrapper'>
      <input type={'search'} onChange={handleSearchText} placeholder='Please type in here....' />
      <label><FontAwesomeIcon icon={faSearch} /> Search</label>
    </div>
  )
}

export default SearchComponent