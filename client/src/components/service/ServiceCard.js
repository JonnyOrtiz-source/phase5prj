import { useState } from 'react';
import Modal from 'react-modal';
import EditServiceForm from './EditServiceForm';

function ServiceCard({
   currentUser,
   service,
   deleteService,
   updateService,
   serviceTypes,
   durations,
   addCartItem,
   handleFave,
   setCart,
}) {
   const [modalIsOpen, setIsOpen] = useState(false);

   const customStyles = {
      content: {
         top: '50%',
         left: '50%',
         right: 'auto',
         bottom: 'auto',
         marginRight: '-50%',
         transform: 'translate(-50%, -50%)',
      },
   };

   Modal.setAppElement('#root');

   let subtitle;

   function openModal() {
      setIsOpen(true);
   }

   function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
   }

   function closeModal() {
      setIsOpen(false);
   }

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

   const found = currentUser.favorites.find(
      ({ service_id }) => service_id === id
   );

   return (
      <div className="card center" key={id}>
         {JSON.stringify(id)}
         <img src={image_url} alt={name} />
         <h2>{name}</h2>
         <h3>{description}</h3>
         <h3>Price: ${price}</h3>
         <h3>Service Type: {service_type_name}</h3>
         {service_type_name === 'Spa' && <h5>`Duration: ${time_interval}`</h5>}
         <div className="card-actions">
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
                  <button onClick={handleDelete}>🚫</button>
               </>
            )}
            {!currentUser.is_admin && !found && (
               <button onClick={() => handleFave(id)}>❤️ FAVE ME!</button>
            )}
            {!currentUser.is_admin && (
               <button onClick={() => addCartItem(service)}>
                  🛒 add to cart
               </button>
            )}
         </div>
      </div>
   );
}

export default ServiceCard;
