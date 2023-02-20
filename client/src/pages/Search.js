import { useSearch } from '../context/search'
import ProductCard from '../components/cards/ProductCard'
import Jumbotron from '../components/cards/Jumbotron'

const Search = () => {
  const [{ results, keyword }, setValues] = useSearch()

  return (
    <div className=''>
      <Jumbotron className='mb-3' title='Adidas' subtitle={  results.length ?  `  Results for  "${keyword}"`:  `No Results for  "${keyword}"`} />

      {/*  Products */}
      <div className='container-lg mt-3'>
        <div className='row row-cols-1 row-cols-md-2  row-cols-lg-3  g-3'>
          {results?.map((p) => (
            <ProductCard key={p?._id} p={p} />
          ))}{' '}
        </div>
      </div>
    </div>
  )
}

export default Search
