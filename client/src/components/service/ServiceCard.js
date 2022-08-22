import { useState } from 'react';
import Modal from 'react-modal';
import EditServiceForm from './EditServiceForm';

function ServiceCard({
   service,
   deleteService,
   updateService,
   isAdmin,
   serviceTypes,
   durations,
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
            {isAdmin && (
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
            {!isAdmin && <button onClick={handleFave}>♡</button>}
         </div>
      </div>
   );
}

export default ServiceCard;
