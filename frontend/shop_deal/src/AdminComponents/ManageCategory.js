import React, { useState } from 'react';
import AddCategory from './AddCategory';
import ViewCategory from './ViewCategory';
import UpdateCategory from './UpdateCategory';
import DeleteCategory from './DeleteCategory';

const ManageCategory = () => {
  const [selectedAction, setSelectedAction] = useState('');

  const handleActionSelect = (action) => {
    setSelectedAction(action);
  };

  return (
    <div>
      <h2>Manage Category Component</h2>
      <div className='row'>
        <div className='col-sm-6 col-md-6 col-lg-3'>
          <div
            className='mb-2 d-flex justify-content-center align-items-center zoom-btn'
            style={{ height: '120px', backgroundColor: '#A3DDCB', cursor: 'pointer' }}
            onClick={() => handleActionSelect('Add')}
          >
            Add Category
          </div>
        </div>
        <div className='col-sm-6 col-md-6 col-lg-3'>
          <div
            className='mb-2 box d-flex justify-content-center align-items-center zoom-btn'
            style={{ height: '120px', backgroundColor: '#F3F0D7', cursor: 'pointer' }}
            onClick={() => handleActionSelect('View')}
          >
            View Category
          </div>
        </div>
        <div className='col-sm-6 col-md-6 col-lg-3'>
          <div
            className='mb-2 box d-flex justify-content-center align-items-center zoom-btn'
            style={{ height: '120px', backgroundColor: '#E8E9A1', cursor: 'pointer' }}
            onClick={() => handleActionSelect('Update')}
          >
            Update Category
          </div>
        </div>
        <div className='col-sm-6 col-md-6 col-lg-3'>
          <div
            className='mb-2 box d-flex justify-content-center align-items-center zoom-btn'
            style={{ height: '120px', backgroundColor: '#E5707E', cursor: 'pointer' }}
            onClick={() => handleActionSelect('Delete')}
          >
            Delete Category
          </div>
        </div>
      </div>
      <div className='main_content'>
        {selectedAction === 'Add' && <AddCategory />}
        {selectedAction === 'View' && <ViewCategory />}
        {selectedAction === 'Update' && <UpdateCategory />}
        {selectedAction === 'Delete' && <DeleteCategory />}
      </div>
    </div>
  );
};

export default ManageCategory;
