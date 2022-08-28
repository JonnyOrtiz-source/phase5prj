import { Link } from 'react-router-dom';

function Nav({ handleCurrentUser, currentUser, handleCart }) {
   const logout = () => {
      fetch('/logout', {
         method: 'DELETE',
      }).then(() => {
         handleCurrentUser(null);
         handleCart([]);
      });
   };

   return (
      <div>
         <ul className="nav-container">
            <li className="nav-item">
               <Link className="nav-link" to="/services">
                  Services
               </Link>
            </li>

            {currentUser.is_admin && (
               <>
                  <li className="nav-item">
                     <Link className="nav-link" to="/durations">
                        Durations
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/service_types">
                        Service Types
                     </Link>
                  </li>
               </>
            )}

            {!currentUser.is_admin && (
               <>
                  <li className="nav-item">
                     <Link className="nav-link" to="/favorites">
                        Faves
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/bookings">
                        Book Now!
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/cart">
                        Cart
                     </Link>
                  </li>
               </>
            )}

            <li className="nav-item">
               <Link className="nav-link" to="/login" onClick={logout}>
                  Logout
               </Link>
            </li>
         </ul>
      </div>
   );
}

export default Nav;
