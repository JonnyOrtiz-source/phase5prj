import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Nav({ handleCurrentUser, currentUser }) {
   const [wishlist, setWishlist] = useState([]);

   useEffect(() => {
      fetch('/wishlists').then((res) => {
         if (res.ok) {
            res.json().then((wishlist) => setWishlist(wishlist));
         } else {
            console.log('Wishlist not available');
         }
      });
   }, []);

   const history = useHistory();

   const logout = () => {
      fetch('/logout', {
         method: 'DELETE',
      }).then(() => {
         handleCurrentUser(null);
      });
   };

   const handleFaveLink = () => {
      // if no wish list for the user already, create it
      if (!currentUser.is_admin && wishlist.length === 0) {
         const configObj = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               user_id: currentUser.id,
            }),
         };
         fetch('/wishlists', configObj).then((res) => {
            if (res.ok) {
               res.json().then((newWishlist) => {
                  setWishlist(newWishlist);
                  history.push('/favorites');
               });
            } else {
               res.json().then(
                  (data) => console.log(data.errors)
                  //   setError(data.errors.service_type_name[0])
                  // data.errors.duration[0]
                  // data.errors.service_type[0]
               );
            }
         });
      }
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
                     <Link
                        className="nav-link"
                        to="/favorites"
                        onClick={handleFaveLink}
                     >
                        Faves
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/bookings">
                        Book Now!
                     </Link>
                  </li>
               </>
            )}

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
