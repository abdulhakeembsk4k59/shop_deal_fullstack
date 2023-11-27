import React, { useState } from 'react';
import AddUser from './AddUser';
import ViewUser from './ViewUser';
import DeleteUser from './DeleteUser';

const ManageUsers = () => {
  const [selectedAction, setSelectedAction] = useState('');

  const handleActionSelect = (action) => {
    setSelectedAction(action);
  };

  return (
    <div>
      <h2>Manage Users Component</h2>
      <div className='row'>
        <div className='col-sm-4'>
          <div
            className='mb-2 d-flex justify-content-center align-items-center zoom-btn'
            style={{ height: '120px', backgroundColor: '#A3DDCB', cursor: 'pointer' }}
            onClick={() => handleActionSelect('Add')}
          >
            Add User
          </div>
        </div>
        <div className='col-sm-4'>
          <div
            className='mb-2 box d-flex justify-content-center align-items-center zoom-btn'
            style={{ height: '120px', backgroundColor: '#F3F0D7', cursor: 'pointer' }}
            onClick={() => handleActionSelect('View')}
          >
            View User
          </div>
        </div>
        <div className='col-sm-4'>
          <div
            className='mb-2 box d-flex justify-content-center align-items-center zoom-btn'
            style={{ height: '120px', backgroundColor: '#F3F0D6', cursor: 'pointer' }}
            onClick={() => handleActionSelect('Delete')}
          >
            Delete User
          </div>
        </div>
      </div>
      <div className='main_content'>
        {selectedAction === 'Add' && <AddUser />}
        {selectedAction === 'View' && <ViewUser />}
        {selectedAction === 'Delete' && <DeleteUser />}
      </div>
    </div>
  );
};

export default ManageUsers;
