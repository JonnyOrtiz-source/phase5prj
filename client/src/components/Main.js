import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Login from './Login';
import Welcome from './Welcome';
import NewDurationForm from './duration/NewDurationForm';
import DurationsList from './duration/DurationsList';
import NewServiceTypeForm from './serviceType/NewServiceTypeForm';
import ServiceTypeList from './serviceType/ServiceTypeList';
import ServicesList from './service/ServicesList';
import NewServiceForm from './service/NewServiceForm';

function Main() {
   const [currentUser, setCurrentUser] = useState(null);
   const [durations, setDurations] = useState([]);
   const [serviceTypes, setServiceTypes] = useState([]);
   const [services, setServices] = useState([]);

   useEffect(() => {
      fetch('/authorized_user').then((res) => {
         if (res.ok) {
            res.json().then((user) => setCurrentUser(user));
         } else {
            console.log('You are not logged in. Please login.');
         }
      });
   }, []);

   useEffect(() => {
      if (currentUser && currentUser.is_admin) {
         fetch('/durations').then((res) => {
            if (res.ok) {
               res.json().then((duration) => setDurations(duration));
            } else {
               console.log('No durations');
            }
         });
      }
   }, [currentUser]);

   useEffect(() => {
      if (currentUser && currentUser.is_admin) {
         fetch('/service_types').then((res) => {
            if (res.ok) {
               res.json().then((serviceType) => setServiceTypes(serviceType));
            } else {
               console.log('No service types');
            }
         });
      }
   }, [currentUser]);

   useEffect(() => {
      fetch('/services').then((res) => {
         if (res.ok) {
            res.json().then((service) => setServices(service));
         } else {
            console.log('No services');
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

   const handleServices = (service) => {
      setServices(service);
   };

   function addDuration(newDuration) {
      setDurations((durations) => [...durations, newDuration]);
   }

   function addServiceType(newServiceType) {
      setServiceTypes((serviceTypes) => [...serviceTypes, newServiceType]);
   }

   function addService(newService) {
      setServices((services) => [...services, newService]);
   }

   function updateService(updatedService) {
      const updatedServices = services.map((ogProject) =>
         ogProject.id === updatedService.id ? updatedService : ogProject
      );

      setServices(updatedServices);
   }

   if (!currentUser) return <Login handleCurrentUser={handleCurrentUser} />;

   if (currentUser.is_admin) {
      if (!services.length || !durations.length || !serviceTypes.length) {
         return <h2>Loading..</h2>;
      }
   }

   return (
      <div className="main">
         <Nav handleCurrentUser={handleCurrentUser} currentUser={currentUser} />
         <Switch>
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

            <Route exact path="/services/new">
               <NewServiceForm
                  addService={addService}
                  durations={durations}
                  serviceTypes={serviceTypes}
               />
            </Route>

            <Route path="/services">
               <ServicesList
                  currentUser={currentUser}
                  services={services}
                  addService={addService}
                  updateService={updateService}
                  handleServices={handleServices}
                  durations={durations}
                  serviceTypes={serviceTypes}
               />
            </Route>

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
