import './App.css'
import { useCatImage } from '../hooks/useCatImage'
import { useCatFact } from '../hooks/useCatFact'

const App = () => {
  const { fact, refreshFact } = useCatFact()
  const { imageURL } = useCatImage({ fact })

  const handledClick = async () => {
    refreshFact()
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
        {imageURL && <img src={imageURL} alt='Imagen obtenida a partir de las 3 primeras letras' />}
      </section>
    </main>
  )
}

export default App
