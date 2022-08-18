import { Link } from 'react-router-dom';

function Nav({ handleCurrentUser }) {
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
               <Link className="nav-link" to="/logout" onClick={logout}>
                  Logout
               </Link>
            </li>
         </ul>
      </div>
   );
}

export default Nav;
