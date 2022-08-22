import React from 'react';

function ServiceTypeCard({ serviceType, deleteServiceType }) {
   const { id, service_type_name } = serviceType;

   const handleDelete = () => {
      fetch(`/service_types/${id}`, {
         method: 'DELETE',
      });

      deleteServiceType(serviceType);
   };

   return (
      <div className="card center" key={id}>
         <h3>{service_type_name}</h3>
         <div className="card-actions">
            <button onClick={handleDelete}>🚫</button>
         </div>
      </div>
   );
}

export default ServiceTypeCard;
