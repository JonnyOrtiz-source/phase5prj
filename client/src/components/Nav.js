import { Link } from 'react-router-dom';

function Nav({ handleCurrentUser, currentUser }) {
   const logout = () => {
      fetch('/logout', {
         method: 'DELETE',
      }).then(() => {
         handleCurrentUser(null);
      });
   };

   const handleWishlist = () => {
      if (!currentUser.is_admin && !currentUser.wishlist) {
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
                  fetch(`/users/${currentUser.id}`).then((res) => {
                     if (res.ok)
                        res.json().then((user) => handleCurrentUser(user));
                  });
               });
            } else {
               res.json().then(
                  (data) => console.log(data.errors)
                  // TODO: HANDLE ERROR
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
               <Link
                  className="nav-link"
                  to="/services"
                  onClick={handleWishlist}
               >
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
               </>
            )}

            <li className="nav-item">
               <Link className="nav-link" to="/cart">
                  Cart
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
