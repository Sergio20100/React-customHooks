import React, { useState, useEffect } from 'react'
import './App.css'
const CAT_ENDPOINT_RANDOM_FACT_URL = 'https://catfact.ninja/fact'
const CAT_ENDPOINT_IMAGE_URL_PREFIX = 'https://cataas.com'

const App = () => {
  const [fact, setFact] = useState()
  const [imageURL, setImageURL] = useState()

  const getRandomFact = () => {
    fetch(CAT_ENDPOINT_RANDOM_FACT_URL)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }
  // para cargar la cita
  useEffect(() => {
    getRandomFact()
  }, [])
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

  const handledClick = () => {
    getRandomFact()
  }

  return (
    <main>
      <header>
        <h1>App de gatos</h1>
        <button onClick={handledClick}>Get new fact</button>
      </header>
      <section>
        {!fact
          ? (<p> cargando... </p>)
          : (
            <p> {fact} </p>

            )}
        {imageURL && <img src={`${CAT_ENDPOINT_IMAGE_URL_PREFIX}${imageURL}`} alt='Imagen obtenida a partir de las 3 primeras letras' />}
      </section>
    </main>
  )
}

export default App
