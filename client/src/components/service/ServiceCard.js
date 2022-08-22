function ServiceCard({ service, deleteService }) {
   const {
      id,
      name,
      description,
      price,
      image_url,
      service_type_name,
      time_interval,
   } = service;

   const handleDelete = () => {
      fetch(`/services/${id}`, {
         method: 'DELETE',
      });

      deleteService(service);
   };

   const handleFave = () => {
      console.log('fave clicked');
   };

   return (
      <div className="card center" key={id}>
         <img src={image_url} alt={name} />
         <h3>{name}</h3>
         <h5>Description: {description}</h5>
         <h5>Price: ${price}</h5>
         <h5>Service Type: {service_type_name}</h5>
         {service_type_name === 'Spa' && <h5>`Duration: ${time_interval}`</h5>}
         <div className="card-actions">
            <button onClick={handleDelete}>🚫</button>
            <button onClick={handleFave}>♡</button>
         </div>
      </div>
   );
}

export default ServiceCard;
