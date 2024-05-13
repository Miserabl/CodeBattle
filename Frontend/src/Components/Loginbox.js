// import React from 'react';
// import './Loginbox.css';
// import { useNavigate } from 'react-router-dom';

// const Loginbox = () => {
//   let navigate = useNavigate();
//   return (
//     <form className="form-control" action="/login" method="post">
//       <p className="title">Login</p>
//       <div className="input-field">
//         <input name="login-email" required="" className="input" type="text" />
//         <label className="label">Enter Email</label>
//       </div>
//       <div className="input-field">
//         <input name="login-password" required="" className="input" type="password" />
//         <label className="label">Enter Password</label>
//       </div>
//       <a href="/forgot-password">Forgot your password?</a> {/* Link to your forgot-password route */}
//       <button type="submit" className="submit-btn" name="action" value="login"  onClick={() => navigate('/findbattle')}>Sign In</button>
//     </form>
//   );
// }

// export default Loginbox;

// import React, { useState } from 'react';
// import './Loginbox.css';
// import { useNavigate } from 'react-router-dom';

// const Loginbox = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await fetch(`/login?email=${email}&password=${password}`);

//       if (response.status === 200) {
//         // Login successful, store email in session storage
//         sessionStorage.setItem('email', email);

//         // Navigate to the dashboard page
//         navigate('/findbattle');
//       } else {
//         // Handle error response
//         const errorMessage = await response.text();
//         setError(errorMessage || 'Invalid email or password');
//         console.error('Login failed:', errorMessage);
//       }
//     } catch (error) {
//       // Handle network errors
//       setError('Network error. Please try again.');
//       console.error('Network error:', error.message);
//     }
//   };

//   return (
//     <div>
//       <form className="form-control">
//         <p className="title">Log in</p>
//         <div className="input-field">
//           <input
//             name="login-email"
//             required=""
//             className="input"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <label className="label">Enter your Email</label>
//         </div>
//         <div className="input-field">
//           <input
//             name="login-password"
//             required=""
//             className="input"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <label className="label">Enter Password</label>
//         </div>
//         {error && <p className="error-message">{error}</p>}
//         <button type="button" className="submit-btn" name="action" value="login" onClick={handleLogin}>
//           Log In
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Loginbox;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Loginbox = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:8080/LeetcodeBattleBackend/login?email=${email}&password=${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
      });

      if (response.status === 200) {
        sessionStorage.setItem('email', email);
        navigate('/findbattle');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || 'Invalid email or password');
        console.error('Login failed:', errorMessage);
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Network error:', error.message);
    }
  };

  return (
    <div className="m-5 bg-white shadow-2xl w-96 flex flex-col items-center p-6 rounded-lg gap-2.5">
      <h1 className="text-3xl font-bold">Log in</h1>
      <div className="relative w-full">
        <input
          name="login-email"
          required
          className="mt-4 w-full rounded-lg h-11 border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-2.5"
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="relative w-full">
        <input
          name="login-password"
          required
          className="mt-4 w-full rounded-lg h-11 border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-2.5"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        type="button"
        className="mt-8 h-14 bg-gradient-to-b from-gray-900 to-black rounded-lg border-0 text-white text-lg font-bold w-full hover:shadow-lg transition-all duration-300"
        onClick={handleLogin}
      >
        Log In
      </button>
    </div>
  );
};

export default Loginbox;

