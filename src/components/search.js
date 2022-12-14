import React, { useEffect, useState } from 'react'
import { matchEntries } from './utility'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faComment, faSearch } from "@fortawesome/free-solid-svg-icons"

function SearchComponent({ data }) {
  let [searchText, setSearchText] = useState(null)

  let [foundMatches, setFoundMatches] = useState([])

  let handleSearchText = evt => setSearchText(evt.target.value)

  useEffect(() => {
    setFoundMatches(matchEntries(data, searchText))
  }, [searchText])

  return (
    <div className='sc-container'>
      <DataSearchReadyAnnouncement data={data} />
      <SearchView handleSearchText={handleSearchText} />
      {searchText ? <ListingsView list={foundMatches} /> : null}
    </div>
  )
}

let DataSearchReadyAnnouncement = ({ data }) => {
  let [announcement, setAnnouncement] = useState()

  let removeSearchReadyAnnouncement = () => {
    let timeout = setTimeout(() => setAnnouncement(''), 6000)

    return () => clearTimeout(timeout)
  }

  useEffect(() => setAnnouncement('data ready for search'), [])

  useEffect(() => removeSearchReadyAnnouncement(), [data])

  return (
    <p className='dsra-wrapper' style={{display: data.length ? "block" : "none", visibility: announcement ? "visible" : "hidden"}}>{ data.length ? announcement : '' }</p>
  )
}

let ListingsView = ({ list }) => {
  let renderListItems = () => list?.map(item => <RenderItemView key={item.id} comment={item} />)

  return (
    <div className='lv-wrapper'>
      <ul>
        {renderListItems()}
      </ul>
    </div>
  )
}

let RenderItemView = ({ comment }) => {
  let { body, user } = { ...comment }

  return (
    <li className='iv-wrapper'>
      <span className='user-part'><FontAwesomeIcon icon={faUser} /> {user.username} </span>
      <span className='comment-part'><FontAwesomeIcon icon={faComment} className="body-svg" /> {body} </span>
    </li>
  )
}

let SearchView = ({ handleSearchText }) => {
  return (
    <div className='sv-wrapper'>
      <input type={'search'} onChange={handleSearchText} placeholder='Please type in here....' />
      <label><FontAwesomeIcon icon={faSearch} /> Search</label>
    </div>
  )
}

export default SearchComponent