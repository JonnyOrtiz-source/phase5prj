import { Link } from 'react-router-dom';

function Nav({ handleCurrentUser, currentUser }) {
   const logout = () => {
      fetch('/logout', {
         method: 'DELETE',
      }).then(() => {
         handleCurrentUser(null);
      });
   };

   return (
      <div>
         <ul className="nav-container">
            <li className="nav-item">
               <Link className="nav-link" to="/">
                  Home
               </Link>
            </li>
            <li className="nav-item">
               <Link className="nav-link" to="/services">
                  Services
               </Link>
            </li>

            {currentUser.is_admin && (
               <li className="nav-item">
                  <Link className="nav-link" to="/durations">
                     Durations
                  </Link>
               </li>
            )}

            <li className="nav-item">
               <Link className="nav-link" to="/faves">
                  Faves
               </Link>
            </li>
            <li className="nav-item">
               <Link className="nav-link" to="/cart">
                  🛒 Cart
               </Link>
            </li>
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
