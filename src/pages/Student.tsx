// src/App.tsx

import React, { ChangeEvent, FormEvent, useState } from 'react';
import Header from './Header.tsx';
import axios from 'axios';

interface Form {
  Sname: string;
  SDOB: string;
  Division: string;
  USN: string;
  Rno: number;
  Sem: number;
  Branch: string;
}
const Student: React.FC = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState<Form>({
    Sname: '',
    SDOB: '',
    Division: '',
    USN: '',
    Rno: 0,
    Sem: 0,
    Branch: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:9000/api/student', {
        Sname: formData.Sname,
        SDOB: formData.SDOB,
        Division: formData.Division,
        USN: formData.USN,
        Rno: formData.Rno,
        Sem: formData.Sem,
        Branch: formData.Branch,
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
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("img/student_bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <Header />
      <div className="flex items-center justify-center">
        <div className="lg:w-1/2 md:w-3/4 sm:w-full bg-black bg-opacity-40 p-8 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">STUDENT FORM</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-4 lg:flex">
              <div className="lg:w-1/2 pr-2 mb-2 lg:mb-0">
                <label className="block text-gray-300">Name</label>
                <input
                  type="text"
                  id="Sname"
                  className="w-full border p-2"
                  name="Sname"
                  value={formData.Sname}
                  onChange={handleChange}
                />
              </div>
              <div className="lg:w-1/2 pl-2">
                <label className="block text-gray-300">DOB</label>
                <input
                  type="text"
                  id="SDOB"
                  className="w-full border p-2"
                  name="SDOB"
                  value={formData.SDOB}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4 lg:flex">
              <div className="lg:w-1/2 pl-2">
                <label className="block text-gray-300">Division</label>
                <input
                  type="text"
                  id="Division"
                  className="w-full border p-2"
                  name="Division"
                  value={formData.Division}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4 lg:flex">
              <div className="lg:w-1/2 pr-2 mb-2 lg:mb-0">
                <label className="block text-gray-300">USN</label>
                <input
                  type="text"
                  id="USN"
                  className="w-full border p-2"
                  name="USN"
                  value={formData.USN}
                  onChange={handleChange}
                />
              </div>
              <div className="lg:w-1/2 pl-2">
                <label className="block text-gray-300">Roll No</label>
                <input
                  type="text"
                  id="Rno"
                  className="w-full border p-2"
                  name="Rno"
                  value={formData.Rno}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4 lg:flex">
              <div className="lg:w-1/2 pr-2 mb-2 lg:mb-0">
                <label className="block text-gray-300">Semester</label>
                <input
                  type="text"
                  id="Sem"
                  className="w-full border p-2"
                  name="Sem"
                  value={formData.Sem}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4 lg:flex">
                <div className="lg:w-1/2 pr-2 mb-2 lg:mb-0">
                  <label className="block text-gray-300">Select Branch</label>
                  <select className="w-full border p-2" name="Branch" value={formData.Branch} onChange={handleChange}>
                    <option value="CSE">CSE</option>
                    <option value="CSE-AI">CSE-AI</option>
                  </select>
                </div>
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
            <p className="text-lg font-semibold">Student data added successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;
