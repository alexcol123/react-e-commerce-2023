import { useState } from 'react'
import useCategory from '../hooks/useCategory'
import Jumbotron from '../components/cards/Jumbotron'
import { Link, useNavigate } from 'react-router-dom'

const CategoriesList = () => {
  // Hooks
  const categories = useCategory()
  const navigate = useNavigate()

  return (
    <div>
      <Jumbotron title={'Categories'} subtitle={'List of all categories'} />
      <div className='container overflow-hidden'>
        <div className='row gx-5 gy-5 mt-3 mb-5'>
          {categories.map((c) => (
            <div key={c._id} className='col-md-6'>
              <button 
              onClick={()=>navigate(`/category/${c.slug}`)}
              className='btn btn-warning col-12 shadow p-3 fw-bold'>
                {c.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoriesList
