// src/App.tsx

import React, { ChangeEvent, FormEvent, useState } from 'react';
import Header from './Header.tsx';
import axios from 'axios';
interface Form {
  buildingName: string;
  floorNo: string;
  roomNo: string;
  capacity: string;
  type: string;
}
const Classroom: React.FC = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState<Form>({
    buildingName: '',
    floorNo: '',
    roomNo: '',
    capacity: '',
    type: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log(formData);
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:9000/api/classroom', {
        buildingName: formData.buildingName,
        floorNo: formData.floorNo,
        roomNo: formData.roomNo,
        capacity: formData.capacity,
        type: formData.type,
      });
      const data = await res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  return (
    <div
      className="relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("img/classroom.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <Header />
      <div className="flex items-center justify-center">
        <div className="lg:w-1/2 md:w-3/4 sm:w-full bg-black bg-opacity-40 p-8 rounded shadow-lg">
          <form action="" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4 text-white">CLASSROOM FORM</h2>
            <div className="mb-4 lg:flex">
              <div className="lg:w-1/2 pr-2 mb-2 lg:mb-0">
                <label className="block text-gray-300">Building Name</label>
                <input
                  type="text"
                  id="buildingName"
                  className="w-full border p-2"
                  name="buildingName"
                  value={formData.buildingName}
                  onChange={handleChange}
                />
              </div>
              <div className="lg:w-1/2 pl-2">
                <label className="block text-gray-300">Floor No</label>
                <input
                  type="text"
                  id="floorNo"
                  className="w-full border p-2"
                  name="floorNo"
                  value={formData.floorNo}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4 lg:flex">
              <div className="lg:w-1/2 pr-2 mb-2 lg:mb-0">
                <label className="block text-gray-300">Class/Lab Room Number</label>
                <input
                  type="text"
                  id="roomNo"
                  className="w-full border p-2"
                  name="roomNo"
                  value={formData.roomNo}
                  onChange={handleChange}
                />
              </div>
              <div className="lg:w-1/2 pl-2">
                <label className="block text-gray-300">Capacity</label>
                <input
                  type="text"
                  id="capacity"
                  className="w-full border p-2"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4 lg:flex">
              <div className="lg:w-1/2 pr-2 mb-2 lg:mb-0">
                <label className="block text-gray-300">Type (Class or Lab)</label>
                <select className="w-full border p-2" name="type" value={formData.type} onChange={handleChange}>
                  <option value="class">Class</option>
                  <option value="lab">Lab</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {showSuccessPopup && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
          onClick={() => setShowSuccessPopup(false)}
        >
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold">Classroom data added successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classroom;
