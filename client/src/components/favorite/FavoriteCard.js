import React from 'react';

function FavoriteCard({ favorite }) {
   const {
      id,
      //   service_id,
      name,
      description,
      price,
      image_url,
      //   service_type_id,
      service_type_name,
      //   duration_id,
      time_interval,
   } = favorite;
   return (
      <div>
         {/* <p>{JSON.stringify(favorite)}</p> */}

         <div className="card center" key={id}>
            <img src={image_url} alt={name} />
            <h2>{name}</h2>
            <h3>{description}</h3>
            <h3>Price: ${price}</h3>
            <h3>Service Type: {service_type_name}</h3>
            {service_type_name === 'Spa' && (
               <h5>`Duration: ${time_interval}`</h5>
            )}
            {/* <div className="card-actions">
            {currentUser.is_admin && (
               <>
                  <button className="add-button" onClick={openModal}>
                     ✍🏼
                  </button>

                  <Modal
                     isOpen={modalIsOpen}
                     onAfterOpen={afterOpenModal}
                     onRequestClose={closeModal}
                     style={customStyles}
                     contentLabel="Example Modal"
                  >
                     <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                        Add Service
                     </h2>
                     <EditServiceForm
                        service={service}
                        updateService={updateService}
                        durations={durations}
                        serviceTypes={serviceTypes}
                     />
                     <button onClick={closeModal}>close</button>
                  </Modal>
               </>
            )}
            <button onClick={handleDelete}>🚫</button>
            {!currentUser.is_admin && (
               <button onClick={() => handleFave(id)}>♡</button>
            )}
         </div> */}
         </div>
      </div>
   );
}

export default FavoriteCard;
