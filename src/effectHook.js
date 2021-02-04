//  covid link https://covidtracking.com/api/states/info
import React, {useState, useEffect } from 'react'

function EffectHook() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState( {hits: [] })

  
  useEffect( async () => {
    const result = await fetch('https://hn.algolia.com/api/v1/search?query=redux')
    setData(result.data)
  }, [])
  
  return (
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

export default EffectHook