import { useState } from "react"
import "./App.css"

function App() {

  const [verse, setVerse] = useState("")
  const [number, setNumber] = useState("")

  const onSubmit = e => {

    e?.preventDefault()

    const data = {
      newVerse: verse,
      numberVerse: number
    }

    console.log('data f -> ', data)

    const QUERY_MUTATION = `
          mutation($newVerse: String!, $numberVerse: String!) {
              setVerse(newVerse: $newVerse, numberVerse: $numberVerse) {
                  verse
                  numberVerse
              }
          }
    `;

    const QUERY = {
      query: QUERY_MUTATION,
      variables: {
        ...data
      }
    }

    fetch("http://localhost:4200/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(QUERY)
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err?.message))
  }

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="">Versiculo</label>
          <input type="text" placeholder="versiculo" onChange={(e) => setVerse(e.target.value)} />
        </div>
        <div>
          <label htmlFor="">Numero versiculo</label>
          <input type="text" placeholder="Ej: 1 timeto 20" onChange={(e) => setNumber(e.target.value)} />
        </div>
        <input type="submit" className="button" />
      </form>
    </>
  )
}

export default App
