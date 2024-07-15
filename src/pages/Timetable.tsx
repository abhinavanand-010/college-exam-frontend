// src/App.tsx

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from './Header.tsx';
import axios from 'axios';

interface Subject {
  id: number;
  name: string;
  semester: string;
  timings: string;
}
interface Form {
  BName: string;
  RoomNo: string;
  Date: string;
  Subject: string;
  Sem: number;
  Time: string;
}

const Timetable: React.FC = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [timeTable, setTimetable] = useState<Form[]>([]);
  const [formData, setFormData] = useState<Form>({
    BName: '',
    RoomNo: '',
    Date: '',
    Subject: '',
    Sem: 0,
    Time: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log(formData);
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:9000/api/Timetable', {
        BName: formData.BName,
        RoomNo: formData.RoomNo,
        Date: formData.Date,
        Subject: formData.Subject,
        Sem: formData.Sem,
        Time: formData.Time,
      });
      const data = await res.data;
      const timetable = [...timeTable];
      timetable.push(data.json);
      setTimetable(timetable);
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
      className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white min-h-screen flex flex-col"
      style={{
        backgroundImage: 'url("img/classroom.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="lg:w-1/2 md:w-3/4 sm:w-full bg-black bg-opacity-40 p-8 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Timetable Generator</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 lg:flex">
              <div className="lg:w-1/2 pr-2 mb-2 lg:mb-0">
                <label className="block text-gray-300">Building Name</label>
                <input
                  type="text"
                  id="buildingName"
                  className="w-full border p-2 bg-white text-black rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter building name"
                  name="BName"
                  value={formData.BName}
                  onChange={handleChange}
                />
              </div>
              <div className="lg:w-1/2 pl-2">
                <label className="block text-gray-300">Room Number</label>
                <input
                  type="text"
                  id="roomNumber"
                  className="w-full border p-2 bg-white text-black rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter room number"
                  name="RoomNo"
                  value={formData.RoomNo}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4 lg:flex">
              <div className="lg:w-1/2 pr-2 mb-2 lg:mb-0">
                <label className="block text-gray-300">Date</label>
                <input
                  type="date"
                  id="date"
                  className="w-full border p-2 bg-white text-black rounded focus:outline-none focus:ring focus:border-blue-300"
                  name="Date"
                  value={formData.Date}
                  onChange={handleChange}
                />
              </div>
              <div className="lg:w-1/2 pl-2">
                <label className="block text-gray-300">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="Subject"
                  value={formData.Subject}
                  onChange={handleChange}
                  className="w-full border p-2 bg-white text-black rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter subject"
                />
              </div>
            </div>

            <div className="mb-4 lg:flex">
              <div className="lg:w-1/2 pr-2 mb-2 lg:mb-0">
                <label className="block text-gray-300">Semester</label>
                <input
                  type="text"
                  id="semester"
                  name="Sem"
                  value={formData.Sem}
                  onChange={handleChange}
                  className="w-full border p-2 bg-white text-black rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter semester"
                />
              </div>
              <div className="lg:w-1/2 pl-2">
                <label className="block text-gray-300">Timings</label>
                <input
                  type="text"
                  id="timings"
                  name="Time"
                  value={formData.Time}
                  onChange={handleChange}
                  className="w-full border p-2 bg-white text-black rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter timings"
                />
              </div>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300 focus:outline-none"
              >
                Add Subject
              </button>
            </div>
          </form>

          <div className="mb-4">
            <table className="w-full border-collapse border border-white">
              <thead>
                <tr>
                  <th className="border border-white p-2">Subject</th>
                  <th className="border border-white p-2">Semester</th>
                  <th className="border border-white p-2">Timings</th>
                </tr>
              </thead>
              <tbody>
                {timeTable.map((subject) => (
                  <tr key={subject._id}>
                    <td className="border border-white p-2">{subject.BName}</td>
                    <td className="border border-white p-2">{subject.Sem}</td>
                    <td className="border border-white p-2">{subject.Time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showSuccessPopup && (
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md" onClick={() => setShowSuccessPopup(false)}>
              <p className="text-lg font-semibold">Timetable data added successfully!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timetable;
