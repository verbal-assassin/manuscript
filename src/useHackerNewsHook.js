import { useEffect, useState } from "react"
import getArticles from './logic/getArticles'

const useHackerNews = () => {
  const [data, setData] = useState( { hits: [] })
  const [url, setUrl] = useState('https://hn.algolia.com/api/v1/search?query=redux')

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true);
 
      try {
        const result = await getArticles(url)
 
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
 
      setIsLoading(false);
    };
 
    fetchData();
  }, [url]);
 
  return [{ data, isLoading, isError }, setUrl];
}

export default useHackerNews
 