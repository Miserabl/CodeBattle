// import React from 'react';
// import './Signupbox.css';
// import { useNavigate } from 'react-router-dom';

// const Loginbox = () => {
//   let navigate = useNavigate();
//   return (
//     <form className="form-control" action="/register" method="post">
//       <p className="title">Sign up</p>
//       <div className="input-field">
//         <input name="signup-email" required="" className="input" type="text" />
//         <label className="label">Enter your Email</label>
//       </div>
//       <div className="input-field">
//         <input name="signup-password" required="" className="input" type="password" />
//         <label className="label">Enter Password</label>
//       </div>
//       <a href="/forgot-password">Forgot your password?</a> {/* Link to your forgot-password route */}
//       <button type="submit" className="submit-btn" name="action" value="register" onClick={() => navigate('/findbattle')}>Sign Up</button>
//     </form>
//   );
// }

// export default Loginbox;
// import React, { useState } from 'react';
// import './Signupbox.css';
// import { useNavigate } from 'react-router-dom';

// const Signupbox = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignUp = async () => {
//     try {
//       const response = await fetch('/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         // Registration successful, store email in session storage
//         sessionStorage.setItem('email', email);

//         // Navigate to the dashboard page
//         navigate('/findbattle');
//       } else {
//         // Handle error response
//         // For example, display an error message to the user
//         console.error('Registration failed:', response.statusText);
//       }
//     } catch (error) {
//       // Handle network errors
//       console.error('Network error:', error.message);
//     }
//   };

//   return (
//     <div>
//       <form className="form-control">
//         <p className="title">Sign up</p>
//         <div className="input-field">
//           <input
//             name="signup-email"
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
//             name="signup-password"
//             required=""
//             className="input"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <label className="label">Enter Password</label>
//         </div>
//         <a href="/forgot-password">Forgot your password?</a> {/* Link to your forgot-password route */}
//         <button type="button" className="submit-btn" name="action" value="register" onClick={handleSignUp}>
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signupbox;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signupbox = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch(`http://localhost:8080/LeetcodeBattleBackend/register?email=${email}&password=${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
      });

      if (response.ok) {
        sessionStorage.setItem('email', email);
        navigate('/findbattle');
      } else {
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  };

  return (
    <div className="m-5 bg-white shadow-xl w-96 flex flex-col items-center p-6 rounded-lg space-y-2.5">
      <h1 className="text-3xl font-bold">Sign up</h1>
      <div className="relative w-full">
        <input
          name="signup-email"
          required
          className="mt-4 w-full rounded-lg h-11 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-2.5"
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="relative w-full">
        <input
          name="signup-password"
          required
          className="mt-4 w-full rounded-lg h-11 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-2.5"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <a href="/forgot-password" className="text-blue-500 hover:text-blue-700">Forgot your password?</a>
      <button
        type="button"
        className="mt-8 h-14 bg-gradient-to-b from-gray-900 to-black rounded-lg border-0 text-white text-lg font-bold w-full hover:shadow-lg transition-all duration-300 cursor-pointer"
        onClick={handleSignUp}
      >
        Sign Up
      </button>
    </div>
  );
};

export default Signupbox;


