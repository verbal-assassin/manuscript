import axios from 'axios';

async function getArticles(query) {
  const result = await axios(
    `${query}`,
  )

  return result
}

export default getArticles