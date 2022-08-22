import { useForm } from '../../hooks/useForm';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Dropdown = ({ label, value, options, handleChange, shoeTypes }) => {
   return (
      <label>
         {label}
         <select value={value} onChange={handleChange}>
            {options.map((option) => (
               <option key={option.value} value={option.value}>
                  {option.label}
               </option>
            ))}
         </select>
      </label>
   );
};

function NewServiceForm({ addService, durations, serviceTypes }) {
   const [message, setMessage] = useState('');
   const [error, setError] = useState('');
   const [serviceType, setServiceType] = useState('5');
   const [duration, setDuration] = useState('25');

   const history = useHistory();

   const initialData = {
      name: '',
      description: '',
      price: '',
      image_url: '',
      service_type_id: '',
      duration_id: '25',
   };

   const { formData, handleChange } = useForm(initialData);

   const serviceTypeOptions = serviceTypes.map((serviceType) => {
      return { label: serviceType.service_type_name, value: serviceType.id };
   });

   const handleServiceTypeChange = (e) => {
      console.log(e.target.value);
      setServiceType(e.target.value);
   };

   const durationOptions = durations.map((duration) => {
      return { label: duration.time_interval, value: duration.id };
   });

   const handleDurationChange = (e) => {
      console.log(e.target.value);
      setDuration(e.target.value);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log('new service clicked');
      if (!formData.name) {
         setError('No service type entered');
      } else {
         // post it
         const configObj = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               ...formData,
               service_type_id: serviceType,
               duration_id: duration,
            }),
         };

         fetch(`/services`, configObj).then((res) => {
            if (res.ok) {
               res.json().then((newService) => {
                  addService(newService);
                  setMessage(`${newService.name} added`);
                  history.push('/services');
               });
            } else {
               res.json().then(
                  (data) => console.log(data.errors)
                  //   setError(data.errors.service_type_name[0])
                  // data.errors.duration[0]
                  // data.errors.service_type[0]
               );
            }
         });
      }
   };

   return (
      <div>
         <div className="form-center">
            <form onSubmit={handleSubmit}>
               <fieldset>
                  <label>
                     Service Name: &nbsp;&nbsp;
                     <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                     />
                  </label>
               </fieldset>
               <fieldset>
                  <label>
                     Description: &nbsp;&nbsp;
                     <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        cols="30"
                     />
                  </label>
               </fieldset>
               <fieldset>
                  <label>
                     Price: &nbsp;&nbsp;
                     <input
                        type="text"
                        name="price"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                     />
                  </label>
               </fieldset>
               <fieldset>
                  <label>
                     Image URL: &nbsp;&nbsp;
                     <input
                        type="url"
                        name="image_url"
                        id="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                     />
                  </label>
               </fieldset>
               <fieldset>
                  <Dropdown
                     label="Select service type: "
                     options={serviceTypeOptions}
                     value={serviceType}
                     handleChange={handleServiceTypeChange}
                  />
               </fieldset>
               {serviceType === '3' && (
                  <fieldset>
                     <Dropdown
                        label="Select duration: "
                        options={durationOptions}
                        value={duration}
                        handleChange={handleDurationChange}
                     />
                  </fieldset>
               )}
               {error && (
                  <div className="error">
                     "{formData.service_type_name}" {error}
                  </div>
               )}
               {message && <div className="message">{message}</div>}

               <button className="btn-submit" type="submit">
                  Enter
               </button>
            </form>
         </div>
      </div>
   );
}

export default NewServiceForm;
