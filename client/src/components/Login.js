import Register from './Register';
import { useState } from 'react';
import { useForm } from '../hooks/useForm';

function Login({ handleCurrentUser }) {
   const [toggle, setToggle] = useState(true);
   const [error, setError] = useState('');

   const initialData = {
      email: '',
      password: '',
   };

   const { formData, handleChange } = useForm(initialData);

   function handleClick() {
      setToggle((preToggle) => !preToggle);
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      fetch('/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ ...formData }),
      }).then((r) => {
         if (r.ok) {
            r.json().then((user) => {
               handleCurrentUser(user);
            });
         } else {
            r.json().then((json) => setError(json.error));
         }
      });
   };

   return (
      <div>
         {toggle ? (
            <div>
               <h2>Login</h2>
               {/* {loginError && <div className="login-error">{loginError}</div>} */}
               <div className="form-center">
                  <form onSubmit={handleSubmit}>
                     <fieldset>
                        <label>
                           Email: &nbsp;&nbsp;
                           <input
                              type="text"
                              name="email"
                              id="email"
                              value={formData.email}
                              onChange={handleChange}
                           />
                        </label>
                     </fieldset>
                     <fieldset>
                        <label>
                           Password: &nbsp;&nbsp;
                           <input
                              type="password"
                              name="password"
                              id="password"
                              value={formData.password}
                              onChange={handleChange}
                           />
                        </label>
                     </fieldset>
                     {error && <div className="login-error">{error}.</div>}
                     <button className="btn-submit" type="submit">
                        Login!
                     </button>
                  </form>
               </div>
            </div>
         ) : (
            <Register handleCurrentUser={handleCurrentUser} />
         )}
         <div className="form-center">
            <button onClick={handleClick}>
               {' '}
               {toggle ? 'Register' : 'Login'}
            </button>
         </div>
      </div>
   );
}

export default Login;
