import ServiceCard from './ServiceCard';
// import EditServiceForm from './service/EditServiceForm';
import { useState } from 'react';
import NewServiceForm from './NewServiceForm';
import Modal from 'react-modal';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

function ServicesList({
   services,
   currentUser,
   favorites,
   addService,
   updateService,
   handleServices,
   durations,
   serviceTypes,
   handleFave,
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

   useDocumentTitle('Serenity Springs - Services List');

   const deleteService = (deletedService) => {
      const updatedServices = services.filter(
         (service) => service.id !== deletedService.id
      );
      handleServices(updatedServices);
   };

   const serviceEl = services.map((service) => (
      <ServiceCard
         key={service.id}
         currentUser={currentUser}
         service={service}
         favorites={favorites}
         updateService={updateService}
         deleteService={deleteService}
         serviceTypes={serviceTypes}
         durations={durations}
         handleFave={handleFave}
      />
   ));

   return (
      <div>
         <h2>Services</h2>

         {currentUser.is_admin && (
            <div className="add-btn-container">
               <button className="add-button" onClick={openModal}>
                  Add Service
               </button>
            </div>
         )}
         <div className="wrapper"> {serviceEl}</div>

         <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
         >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add Service</h2>
            <NewServiceForm
               addService={addService}
               durations={durations}
               serviceTypes={serviceTypes}
            />
            <button onClick={closeModal}>close</button>
         </Modal>
      </div>
   );
}

export default ServicesList;
