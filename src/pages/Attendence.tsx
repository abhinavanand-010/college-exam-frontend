// src/App.tsx

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from './Header.tsx';
import axios from 'axios';

interface Form {
  Buname: string;
  RoomNo: number;
}
const Attendance: React.FC = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [buildingName, setBuildingName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [absenteesList, setAbsenteesList] = useState<string[]>([]);
  const [formData, setFormData] = useState<Form>({
    Buname: '',
    RoomNo: 0,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log(buildingName, roomNumber, absenteesList);
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:9000/api/Attendance', {
        Buname: buildingName,
        RoomNo: roomNumber,
        Absentees: absenteesList,
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

  const handleAbsenteesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAbsenteesList(value.split(',').map((absentee) => absentee.trim()));
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
          <h2 className="text-2xl font-bold mb-4 text-white">Attendance Form</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-4 lg:flex">
              <div className="lg:w-1/2 pr-2 mb-2 lg:mb-0">
                <label className="block text-gray-300">Building Name</label>
                <input
                  type="text"
                  id="buildingName"
                  className="w-full border p-2"
                  value={buildingName}
                  onChange={(e) => setBuildingName(e.target.value)}
                />
              </div>
              <div className="lg:w-1/2 pl-2">
                <label className="block text-gray-300">Class/Lab Room Number</label>
                <input
                  type="text"
                  id="roomNumber"
                  className="w-full border p-2"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-300">Absentees List (comma-separated)</label>
              <input
                type="text"
                id="absenteesList"
                className="w-full border p-2"
                value={absenteesList.join(', ')}
                onChange={handleAbsenteesChange}
              />
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
            <p className="text-lg font-semibold">Attendance data added successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
