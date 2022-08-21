import { useState, useEffect } from 'react';
import DurationCard from './DurationCard';
import { Link } from 'react-router-dom';

function DurationsList() {
   const [durations, setDurations] = useState([]);

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

   const deleteDuration = (deletedDuration) => {
      const updatedDurations = durations.filter(
         (duration) => duration.id !== deletedDuration.id
      );
      setDurations(updatedDurations);
   };

   const durationEl = durations.map((duration) => (
      <DurationCard
         key={duration.id}
         duration={duration}
         deleteDuration={deleteDuration}
      />
   ));

   return (
      <div>
         <h2>All Durations</h2>
         <Link to="/durations/new">Add Duration</Link>
         <div className="wrapper">{durationEl}</div>
      </div>
   );
}

export default DurationsList;
