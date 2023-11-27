import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend when the component mounts
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    try {
      // Make a request to the backend to get all categories
      const response = await axios.get('http://localhost:4000/get_all_categories');

      // Update the state with the fetched categories
      setCategories(response.data.categories);
    } catch (error) {
      // Handle errors, e.g., show an alert
      console.error('Error fetching categories:', error.message);
    }
  };

  return (
    <div className='pt-5'>
      <h2>View Category</h2>

      <div className="row pt-3">
        {categories.map((category) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={category._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text">{category.description}</p>
                {/* Add more details if needed */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCategory;
