import React from 'react'
import Jumbotron from '../components/cards/Jumbotron'
import { useAuth } from '../context/auth'

const Home = () => {
  const [auth, setAuth] = useAuth()

  console.log(auth)

 
  return (
    <div>
      <Jumbotron title='Adidas Store' />
      <h1> This is Home page</h1>
    </div>
  )
}

export default Home
