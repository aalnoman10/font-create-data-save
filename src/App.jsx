import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/friends')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  const handleF = (e) => {
    e.preventDefault()

    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value

    const newUser = { name, email, password }
    console.log(newUser);

    fetch('http://localhost:5000/friends', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(ND => {
        console.log(ND);
        const newData = [...data, ND]
        setData(newData)
      })
  }

  return (
    <>
      <h1>Vite</h1>
      <form onSubmit={handleF}>
        <input type="text" name="name" />
        <br />
        <input type="email" name="email" />
        <br />
        <input type="password" name="password" />
        <br />
        <input type="submit" value="Submit" />
      </form>
      {
        data.map(d => <p key={d.id}>{d.name}</p>)
      }
    </>
  )
}

export default App
