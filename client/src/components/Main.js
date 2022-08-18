import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Login from './Login';
import Welcome from './Welcome';

function Main() {
   const [currentUser, setCurrentUser] = useState(null);

   useEffect(() => {
      fetch('/authorized_user').then((res) => {
         if (res.ok) {
            res.json().then((user) => {
               setCurrentUser(user);
            });
         } else {
            console.log('You are not logged in. Please login.');
         }
      });
   }, []);

   const handleCurrentUser = (user) => {
      setCurrentUser(user);
   };

   if (!currentUser) return <Login handleCurrentUser={handleCurrentUser} />;

   return (
      <div className="main">
         <Nav handleCurrentUser={handleCurrentUser} />

         <Switch>
            <Route path="/login">
               <Login handleCurrentUser={handleCurrentUser} />
            </Route>

            <Route path="/">
               <Welcome currentUser={currentUser} />
            </Route>
         </Switch>
      </div>
   );
}

export default Main;
