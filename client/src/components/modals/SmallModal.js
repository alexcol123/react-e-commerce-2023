import React from 'react'

const SmalModal = ({
  setVisible,
  value,
  setValue,
  handleSubmit,
  handleDelete,
}) => {
  return (
    <div className=' myAbsolute myModal'>
      <div className='bg-white p-3 rounded  border  border-warning shadow-lg '>
        <form onSubmit={handleSubmit}>
          <h3 className='text-center mt-2 mb-4 text-warning bg-dark p-2 rounded'>
            Update Category
          </h3>
          <div className='mb-3'>
            <label htmlFor='categoryName' className='form-label'>
              Category Name
            </label>
            <input
              type='text'
              className='form-control'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              id='categoryName'
            />

            <div id='emailHelp' className='form-text'>
              Category name must be unique.
            </div>
          </div>
          {/* <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='exampleInputPassword1'
            />
          </div> */}
          {/* <div className='mb-3 form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='exampleCheck1'
            />
            <label className='form-check-label' htmlFor='exampleCheck1'>
              Check me out
            </label>
          </div> */}

          <div className='d-grid gap-2 d-md-flex justify-content-md-between'>
            <div>
              <button className='btn btn-sm btn-warning me-2 ' type='submit'>
                Submit
              </button>
              <button
                onClick={() => setVisible(false)}
                className='btn btn-sm btn-outline-dark'
                type='button'
              >
                Cancel
              </button>
            </div>

            <button
              onClick={handleDelete}
              className='btn btn-sm btn-danger me-md-2 '
              type='button'
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SmalModal
