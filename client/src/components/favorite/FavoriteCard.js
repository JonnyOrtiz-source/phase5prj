function FavoriteCard({ currentUser, favorite, handleFave }) {
   const {
      id,
      name,
      description,
      price,
      image_url,
      service_type_name,
      time_interval,
   } = favorite;
   return (
      <div className="card center" key={id}>
         <img src={image_url} alt={name} />
         <h2>{name}</h2>
         <h3>{description}</h3>
         <h3>Price: ${price}</h3>
         <h3>Service Type: {service_type_name}</h3>
         {service_type_name === 'Spa' && <h5>`Duration: ${time_interval}`</h5>}
         <div className="card-actions">
            {!currentUser.is_admin && (
               <button onClick={() => handleFave(id)}>♡</button>
            )}
         </div>
      </div>
   );
}

export default FavoriteCard;
