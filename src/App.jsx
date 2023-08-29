import React, { useState, useEffect } from 'react'
import './App.css'
const CAT_ENDPOINT_RANDOM_FACT_URL = 'https://catfact.ninja/fact'
const CAT_ENDPOINT_IMAGE_URL_PREFIX = 'https://cataas.com'

const App = () => {
  const [fact, setFact] = useState('whatever')
  const [imageURL, setImageURL] = useState('whatever')

  useEffect(() => {
    // DE MANERA ASINCRONA
    // async function getRandomFact () {
    //   const res = await fetch(CAT_ENDPOINT_RANDOM_FACT_URL)
    //   const jsonRes = await res.json()
    //   setFact(jsonRes.fact)
    // }
    // async function getRandomImage(fact) {
    //   const texto = fact
    //   const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${texto}?size=50&color=red&json=true`
    // }
    // getRandomFact()
    // DE MANERA SINCRONA
    fetch(CAT_ENDPOINT_RANDOM_FACT_URL)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)

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
      })
  }, [])

  return (
    <main>
      <h1>App de gatos</h1>
      <section>
        {fact === 'whatever'
          ? (<p> cargando... </p>)
          : (
            <p> {fact} </p>

            )}
        {imageURL !== 'whatever' && <img src={`${CAT_ENDPOINT_IMAGE_URL_PREFIX}${imageURL}`} alt='Imagen obtenida a partir de las 3 primeras letras' />}
      </section>
    </main>
  )
}

export default App
