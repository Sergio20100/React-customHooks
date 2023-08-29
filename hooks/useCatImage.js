import { useEffect, useState } from 'react'

const CAT_ENDPOINT_IMAGE_URL_PREFIX = 'https://cataas.com'

export function useCatImage ({ fact }) {
  const [imageURL, setImageURL] = useState()

  // para cargar la IMAGEN
  useEffect(() => {
    if (!fact) return
    const firtsWord = fact.split(' ', 3).join(' ')
    // .slice(0, 3).join(' ')
    // console.log(firtsWord)
    const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firtsWord}?size=50&color=red&json=true`

    fetch(CAT_ENDPOINT_IMAGE_URL)
      .then(res => res.json())
      .then(response => {
        // console.log(response)
        const { url } = response
        setImageURL(url)
      })
  }, [fact])

  return { imageURL: `${CAT_ENDPOINT_IMAGE_URL_PREFIX}${imageURL}` }
}
