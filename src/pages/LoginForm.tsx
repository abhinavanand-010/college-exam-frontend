import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
interface Form {
  role: string;
  username: string;
  password: string;
}
const Login: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [loginMessage, setLoginMessage] = useState<string>('');
  const [popupColor, setPopupColor] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(3);
  const [formData, setFormData] = useState<Form>({
    role: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleLogin = () => {
    const username = (document.getElementById('username') as HTMLInputElement)?.value;
    const password = (document.getElementById('password') as HTMLInputElement)?.value;

    if (username === 'test' && password === '123') {
      setLoginMessage('Success! Logged in.');
      setPopupColor('green');
      setShowPopup(true);

      // Wait for 3 seconds and then navigate to /admin
      setTimeout(() => {
        setCountdown(3); // Reset countdown
        setShowPopup(false);
        navigate('/admin');
      }, 3000);
    } else {
      setLoginMessage('Incorrect username or password.');
      setPopupColor('red');
      setShowPopup(true);
    }
  };

  useEffect(() => {
    if (loginMessage !== '') {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Clear the interval after 3 seconds
      setTimeout(() => {
        clearInterval(interval);
        setCountdown(3); // Reset countdown
        setShowPopup(false);
      }, 3000);
    }
  }, [loginMessage]);

  const closePopup = () => {
    setShowPopup(false);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:9000/api/Login', {
        User: formData.username,
        Password: formData.password,
        Role: formData.role,
      });
      const data = await res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="w-96 bg-black bg-opacity-40 p-8 rounded shadow-lg absolute right-10 top-1/2 transform -translate-y-1/2">
        <form action="" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-white">Examination Login</h2>
          <div className="mb-4">
            <label className="block text-gray-300">Choose Role</label>
            <select
              className="w-full border p-2"
              name="role"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setFormData({ ...formData, role: e.target.value });
              }}
              value={formData.role}
            >
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Username</label>
            <input
              type="text"
              id="username"
              className="w-full border p-2"
              name="username"
              onChange={handleChange}
              value={formData.username}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              className="w-full border p-2"
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">
            Login
          </button>
        </form>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center" onClick={closePopup}>
          <div
            className={`bg-white p-4 rounded shadow-lg ${popupColor === 'green' ? 'text-green-600' : 'text-red-600'}`}
          >
            <p>{loginMessage}</p>
            {countdown > 0 && <p>Redirecting in {countdown} seconds...</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
