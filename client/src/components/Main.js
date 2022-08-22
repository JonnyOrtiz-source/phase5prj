import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Login from './Login';
import Welcome from './Welcome';
import NewDurationForm from './duration/NewDurationForm';
import DurationsList from './duration/DurationsList';
import NewServiceTypeForm from './serviceType/NewServiceTypeForm';
import ServiceTypeList from './serviceType/ServiceTypeList';

function Main() {
   const [currentUser, setCurrentUser] = useState(null);
   const [isAdmin, setIsAdmin] = useState(false);
   const [durations, setDurations] = useState([]);
   const [serviceTypes, setServiceTypes] = useState([]);

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

   useEffect(() => {
      fetch('/service_types').then((res) => {
         if (res.ok) {
            res.json().then((serviceType) => {
               setServiceTypes(serviceType);
            });
         } else {
            console.log('No service types');
         }
      });
   }, []);

   const handleCurrentUser = (user) => {
      setCurrentUser(user);
   };

   const handleDurations = (duration) => {
      setDurations(duration);
   };

   const handleServiceTypes = (serviceType) => {
      setServiceTypes(serviceType);
   };

   function addDuration(newDuration) {
      setDurations((durations) => [...durations, newDuration]);
   }

   function addServiceType(newServiceType) {
      setServiceTypes((serviceTypes) => [...serviceTypes, newServiceType]);
   }

   if (!currentUser) return <Login handleCurrentUser={handleCurrentUser} />;

   return (
      <div className="main">
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
                  <Route path="/service_types/new">
                     <NewServiceTypeForm addServiceType={addServiceType} />
                  </Route>
                  <Route path="/service_types">
                     <ServiceTypeList
                        serviceTypes={serviceTypes}
                        addServiceType={addServiceType}
                        handleServiceTypes={handleServiceTypes}
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
