/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import ManageCategory from './ManageCategory';
import ManageUsers from './ManageUsers';
import ManageProducts from './ManageProducts';
import ManageOrders from './ManageOrders';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('Dashboard');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    console.log("checking selected component", selectedComponent);
  }, [selectedComponent]);

  const checkAdminStatus = () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));

      if (userData && userData.isAdmin) {
        setIsAdmin(true);
      } else {
        Swal.fire("Access Denied", "You are not authorized to view this page!", "error").then(() => {
          navigate('/');
        });
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  const handleComponentSelect = (componentName) => {
    setSelectedComponent(componentName);
    console.log(componentName);
  };

  const [clicked, setClicked] = useState(true);

  return (
    <div className="admin-dashboard">
      <Sidebar onComponentSelect={handleComponentSelect} setClicked={setClicked} clicked={clicked} selectedComponent={selectedComponent} />
      <div className="main-content-container">
        <div className={`main-content ${clicked ? 'shifted' : ''}`}>
          {isAdmin && (
            < >
              {selectedComponent === 'Dashboard' && <Dashboard onComponentSelect={handleComponentSelect} />}
              {selectedComponent === 'ManageCategory' && <ManageCategory />}
              {selectedComponent === 'ManageUsers' && <ManageUsers />}
              {selectedComponent === 'ManageProducts' && <ManageProducts />}
              {selectedComponent === 'ManageOrders' && <ManageOrders />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
