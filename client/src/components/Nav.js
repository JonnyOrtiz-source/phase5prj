import { Link } from 'react-router-dom';

function Nav({ handleCurrentUser, currentUser, cart, handleCart }) {
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
                        Faves{' '}
                        {currentUser.favorites.length > 0 &&
                           `(${currentUser.favorites.length})`}
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/bookings">
                        Book Now!
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/cart">
                        Cart {cart.length > 0 && `(${cart.length})`}
                     </Link>
                  </li>
               </>
            )}
         </ul>
         {currentUser &&
            `${currentUser.first_name[0].toUpperCase()}${currentUser.last_name[0].toUpperCase()} logged in.  `}
         <Link to="/login" onClick={logout}>
            ⎋
         </Link>
      </div>
   );
}

export default Nav;
