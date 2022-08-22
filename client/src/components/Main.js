import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Login from './Login';
import Welcome from './Welcome';
import NewDurationForm from './duration/NewDurationForm';
import DurationsList from './duration/DurationsList';

function Main() {
   const [currentUser, setCurrentUser] = useState(null);
   const [isAdmin, setIsAdmin] = useState(false);
   const [durations, setDurations] = useState([]);

   useEffect(() => {
      fetch('/authorized_user').then((res) => {
         if (res.ok) {
            res.json().then((user) => {
               user.is_admin && setIsAdmin(true);
               setCurrentUser(user);
            });
         } else {
            console.log('You are not logged in. Please login.');
         }
      });
   }, []);

   useEffect(() => {
      fetch('/durations').then((res) => {
         if (res.ok) {
            res.json().then((duration) => {
               setDurations(duration);
            });
         } else {
            console.log('No durations');
         }
      });
   }, []);

   const handleCurrentUser = (user) => {
      setCurrentUser(user);
   };

   const handleDurations = (duration) => {
      setDurations(duration);
   };

   function addDuration(newDuration) {
      setDurations((durations) => [...durations, newDuration]);
   }

   if (!currentUser) return <Login handleCurrentUser={handleCurrentUser} />;

   return (
      <div className="main">
         user:{JSON.stringify(currentUser.email)}
         admin:{JSON.stringify(currentUser.is_admin)}
         <Nav handleCurrentUser={handleCurrentUser} currentUser={currentUser} />
         <Switch>
            {isAdmin && (
               <>
                  <Route path="/durations/new">
                     <NewDurationForm addDuration={addDuration} />
                  </Route>
                  <Route path="/durations">
                     <DurationsList
                        durations={durations}
                        addDuration={addDuration}
                        handleDurations={handleDurations}
                     />
                  </Route>
               </>
            )}

            <Route path="/login">
               <Login handleCurrentUser={handleCurrentUser} />
            </Route>

            <Route exact path="/">
               <Welcome currentUser={currentUser} />
            </Route>
         </Switch>
      </div>
   );
}

export default Main;
