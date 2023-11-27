import React, { useState } from 'react';
import AddProducts from './AddProducts';
import ViewProducts from './ViewProducts';
import UpdateProducts from './UpdateProducts';
import DeleteProducts from './DeleteProducts';

const ManageProducts = () => {
  const [selectedAction, setSelectedAction] = useState('');

  const handleActionSelect = (action) => {
    setSelectedAction(action);
  };

  return (
    <div>
      <h2>Manage Products Component</h2>
      <div className='row'>
        <div className='col-sm-3'>
          <div
            className='mb-2 d-flex justify-content-center align-items-center zoom-btn'
            style={{ height: '120px', backgroundColor: '#A3DDCB', cursor: 'pointer' }}
            onClick={() => handleActionSelect('Add')}
          >
            Add Product
          </div>
        </div>
        <div className='col-sm-3'>
          <div
            className='mb-2 box d-flex justify-content-center align-items-center zoom-btn'
            style={{ height: '120px', backgroundColor: '#F3F0D7', cursor: 'pointer' }}
            onClick={() => handleActionSelect('View')}
          >
            View Product
          </div>
        </div>
        <div className='col-sm-3'>
          <div
            className='mb-2 box d-flex justify-content-center align-items-center zoom-btn'
            style={{ height: '120px', backgroundColor: '#F3F0D6', cursor: 'pointer' }}
            onClick={() => handleActionSelect('Update')}
          >
            Update Product
          </div>
        </div>
        <div className='col-sm-3'>
          <div
            className='mb-2 box d-flex justify-content-center align-items-center zoom-btn'
            style={{ height: '120px', backgroundColor: '#E5707E', cursor: 'pointer' }}
            onClick={() => handleActionSelect('Delete')}
          >
            Delete Product
          </div>
        </div>
      </div>
      <div className='main_content'>
        {selectedAction === 'Add' && <AddProducts />}
        {selectedAction === 'View' && <ViewProducts />}
        {selectedAction === 'Update' && <UpdateProducts />}
        {selectedAction === 'Delete' && <DeleteProducts />}
      </div>
    </div>
  );
};

export default ManageProducts;
