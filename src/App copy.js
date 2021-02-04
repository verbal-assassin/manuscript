import React, { Fragment, useState, useEffect } from 'react';
import useHackerNews from './useHackerNewsHook'
import getArticles from './logic/getArticles' 

function App() {
  const [query, setQuery] = useState('redux')
  const [{
    data, isLoading, isError
  }, doFetch] = useHackerNews()

  return (
    <Fragment>
      <h2>list of articles</h2>
      <form onSubmit={event =>{
        doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`)
        event.preventDefault()
      }}>
        <input 
          type="text" 
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div>something went wrong</div>}

      {
        isLoading ? (
          <div>Loading...</div>
        ) : (
          <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
        )
      }
    </Fragment>
  );
}
 
export default App;
