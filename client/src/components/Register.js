import { useState } from 'react';
import { useForm } from '../hooks/useForm';

function Register({ handleCurrentUser }) {
   const [error, setError] = useState('');
   const initialData = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
   };

   const { formData, handleChange } = useForm(initialData);

   const handleSubmit = (e) => {
      e.preventDefault();

      const configObj = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ ...formData }),
      };

      fetch(`/users`, configObj).then((res) => {
         if (res.ok) {
            res.json().then((user) => {
               handleCurrentUser(user);
            });
         } else {
            res.json().then((data) => setError(data.errors));
         }
      });
   };

   return (
      <div>
         <h2>Register</h2>
         <div className="form-center">
            <form onSubmit={handleSubmit}>
               <fieldset>
                  <label>
                     First Name: &nbsp;&nbsp;
                     <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={formData.firstName}
                        onChange={handleChange}
                     />
                  </label>
               </fieldset>
               <fieldset>
                  <label>
                     Last Name: &nbsp;&nbsp;
                     <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={formData.lastName}
                        onChange={handleChange}
                     />
                  </label>
               </fieldset>
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
               <fieldset>
                  <label>
                     Confirm Password: &nbsp;&nbsp;
                     <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                     />
                  </label>
               </fieldset>

               {error.email && (
                  <div className="login-error">
                     {error.email && `Email ${formData.email} ${error.email}`}.
                  </div>
               )}
               {error.password_confirmation && (
                  <div className="login-error">
                     Password confirmation {error.password_confirmation}
                  </div>
               )}

               <button className="btn-submit" type="submit">
                  Register!
               </button>
            </form>
         </div>
      </div>
   );
}

export default Register;
