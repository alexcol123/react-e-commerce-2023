import { useState, useEffect } from 'react'
import Jumbotron from '../../components/cards/Jumbotron'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import AdminMenu from '../../components/nav/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import CategoryForm from '../../components/forms/CategoryForm'
import SmallModal from '../../components/modals/SmallModal'

const AdminCategory = () => {
  // Context
  const [auth, setAuth] = useAuth()
  // State
  const [name, setName] = useState('')
  const [categories, setCategories] = useState([])
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updatingName, setUpdatingName] = useState('')

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const { data } = await axios.get('/categories')
      setCategories(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      let answer = window.confirm('Are you sure you want to Delete ?')
      if (answer) {
        const { data } = await axios.delete('/category/' + selected._id)
        if (data?.error) {
          toast.error(data.error)
        } else {
          loadCategories()
          toast.success(`Category:   was Deleted`)
          setName('')
          setSelected(null)
          setUpdatingName('')
        }
        setVisible(false)
      } else {
        setVisible(false)
        toast.success(`Deletion was cancelled by User`)
      }
    } catch (error) {
      console.log(error)
      toast.error('Create category failed. Try Again')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put('/category/' + selected._id, {
        name: updatingName,
      })
      if (data?.error) {
        toast.error(data.error)
      } else {
        loadCategories()
        toast.success(`Category:  "${data.name}"  was Updated`)
        setName('')
        setSelected(null)
        setUpdatingName('')
      }
      setVisible(false)
    } catch (error) {
      console.log(error)
      toast.error('Create category failed. Try Again')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/category', { name })
      if (data?.error) {
        toast.error(data.error)
      } else {
        loadCategories()
        toast.success(`Category:  "${data.name}"  was Created`)
        setName('')
      }
    } catch (error) {
      console.log(error)
      toast.error('Create category failed. Try Again')
    }
  }

  return (
    <div className='myRelative '>
      <Jumbotron
        title={` ${auth?.user?.name}`}
        subtitle='Admin Dashboard'
        backgroundColor='bg-dark bg-gradient'
        textCol='text-warning'
      />

      {/* Modal */}
      {visible && (
        <SmallModal
          setVisible={setVisible}
          value={updatingName}
          setValue={setUpdatingName}
          handleSubmit={handleUpdate}
          handleDelete={handleDelete}
        />
      )}

      <div className='container-fluid'>
        <div className='row'>
          {/* Sidebar */}

          <AdminMenu />
          {/* Main */}
          <div className='col-md-9'>
            <div className='p-3 mb-2  border mt-1'>
              <h4 className='text-center '>Create Category </h4>
            </div>

            {/* Form */}
            <CategoryForm
              value={name}
              setValue={setName}
              handleSubmit={handleSubmit}
            />

            <hr />

            <div className='col'>
              <div className='p-3 mb-2  border mt-1'>
                <h4 className='text-center '> Category List </h4>
              </div>
              {categories?.map((c) => (
                <button
                  onClick={(e) => {
                    setVisible(true)
                    setSelected(c)
                    setUpdatingName(c.name)
                  }}
                  key={c._id}
                  type='button'
                  className='btn btn-dark text-warning m-3   shadow'
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCategory
