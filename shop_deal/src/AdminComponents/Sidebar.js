import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';
import './Sidebar.css';

const Sidebar = ({ onComponentSelect, setClicked, clicked, selectedComponent }) => {
  const handleItemClick = (itemName) => {
    onComponentSelect(itemName.replace(/\s/g, ''));
    console.log(itemName);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // Add your logout logic here
    // For example, redirect to the login page or clear session storage
  };

  return (
    <CDBSidebar textColor="#333" backgroundColor="#f0f0f0" className={`cdb-sidebar ${clicked ? '' : 'toggled'} sidebar_fixed`}>
      <CDBSidebarHeader prefix={<i className="fa fa-bars hamicon" onClick={() => setClicked(!clicked)} />} >
        Admin Dashboard
      </CDBSidebarHeader>
      <CDBSidebarContent className="cdb-sidebar-content">
        <CDBSidebarMenu className='item'>
          <CDBSidebarMenuItem
            icon="th-large"
            className={selectedComponent === 'Dashboard' ? 'active ' : ''}
            onClick={() => handleItemClick('Dashboard')}
          >
            Dashboard
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            icon="sticky-note"
            className={selectedComponent === 'ManageCategory' ? 'active' : ''}
            onClick={() => handleItemClick('Manage Category')}
          >
            Manage Category
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            icon="chart-line"
            iconType="solid"
            className={selectedComponent === 'ManageUsers' ? 'active' : ''}
            onClick={() => handleItemClick('Manage Users')}
          >
            Manage Users
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            icon="box"
            className={selectedComponent === 'ManageProducts' ? 'active' : ''}
            onClick={() => handleItemClick('Manage Products')}
          >
            Manage Products
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            icon="shopping-cart"
            className={selectedComponent === 'ManageOrders' ? 'active' : ''}
            onClick={() => handleItemClick('Manage Orders')}
          >
            Manage Orders
          </CDBSidebarMenuItem>
          {/* Add similar code for other menu items */}
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter className="cdb-sidebar-footer" style={{ textAlign: 'center' }}>
        <button className="btn btn-danger" onClick={handleLogout}>
          <i className="fa fa-sign-out-alt" style={{ marginRight: '5px' }} />
          Logout
        </button>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
};

export default Sidebar;
