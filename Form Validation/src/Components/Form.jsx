import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; 

const countriesWithCities = {
  India: ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad', 'Ahmedabad', 'Pune', 'Jaipur'],
  USA: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'San Francisco', 'Dallas', 'Seattle'],
  Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton'],
  Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  Germany: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'],
  UK: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds'],
  Japan: ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya'],
  France: ['Paris', 'Lyon', 'Marseille', 'Nice'],
  Brazil: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'],
  SouthAfrica: ['Cape Town', 'Johannesburg', 'Durban', 'Pretoria'],
};


export default function Form() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', username: '', email: '', password: '',
    phoneCode: '', phoneNumber: '', country: '', city: '',
    pan: '', aadhar: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = 'First name is required';
    if (!form.lastName) newErrors.lastName = 'Last name is required';
    if (!form.username) newErrors.username = 'Username is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.password || form.password.length < 6) newErrors.password = 'Password must be at least 6 chars';
    if (!form.phoneCode || !form.phoneNumber) newErrors.phone = 'Complete phone number required';
    if (!form.country) newErrors.country = 'Select country';
    if (!form.city) newErrors.city = 'Select city';
    if (!form.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan)) newErrors.pan = 'Invalid PAN';
    if (!form.aadhar || !/^\d{12}$/.test(form.aadhar)) newErrors.aadhar = 'Invalid Aadhar';
    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validate();
  }, [form]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isValid) {
      toast.success("Form submitted successfully!", {
        autoClose: 1500,
        onClose: () => navigate('/success', { state: form }),
      });
    } else {
      toast.error("Please fix the errors!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">Registration Form</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {['firstName', 'lastName', 'username', 'email'].map((field) => (
            <div key={field}>
              <label className="block capitalize font-medium">{field.replace(/([A-Z])/g, ' $1')}</label>
              <input
                className="w-full border rounded p-2 focus:ring-2 focus:ring-indigo-400"
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
              />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
            </div>
          ))}

          {/* Password Field with Eye Icon */}
          <div className="col-span-2">
            <label className="block font-medium">Password</label>
            <div className="relative">
              <input
                className="w-full border rounded p-2 pr-10 focus:ring-2 focus:ring-indigo-400"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray-600" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-600" />
                )}
              </span>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label>Phone Code</label>
            <input
              className="w-full border rounded p-2"
              name="phoneCode"
              value={form.phoneCode}
              onChange={handleChange}
              placeholder="+91"
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              className="w-full border rounded p-2"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* Country & City */}
          <div>
            <label>Country</label>
            <select
              name="country"
              className="w-full border rounded p-2"
              value={form.country}
              onChange={handleChange}
            >
              <option value="">Select Country</option>
              {Object.keys(countriesWithCities).map((country) => (
                <option key={country}>{country}</option>
              ))}
            </select>
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </div>

          <div>
            <label>City</label>
            <select
              name="city"
              className="w-full border rounded p-2"
              value={form.city}
              onChange={handleChange}
              disabled={!form.country}
            >
              <option value="">Select City</option>
              {(countriesWithCities[form.country] || []).map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>

          {/* PAN */}
          <div>
            <label>PAN Number</label>
            <input
              name="pan"
              className="w-full border rounded p-2"
              value={form.pan}
              onChange={handleChange}
            />
            {errors.pan && <p className="text-red-500 text-sm">{errors.pan}</p>}
          </div>

          {/* Aadhar */}
          <div>
            <label>Aadhar Number</label>
            <input
              name="aadhar"
              className="w-full border rounded p-2"
              value={form.aadhar}
              onChange={handleChange}
            />
            {errors.aadhar && <p className="text-red-500 text-sm">{errors.aadhar}</p>}
          </div>

          {/* Submit */}
          <div className="col-span-2">
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded transition ${!isValid && 'opacity-50 cursor-not-allowed'}`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
