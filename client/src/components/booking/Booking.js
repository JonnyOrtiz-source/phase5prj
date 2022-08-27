import { InlineWidget } from 'react-calendly';

export default function Booking() {
   return (
      <div>
         <h3>
            For a free consultation, or to book an appointment, click "Make an
            appointment" below and choose an available date/time. Then provide
            your name, email address, and any additional information you'd like
            to share with us for us to consider before our meeting. We will
            email you a Zoom link to meet you virtually for the first time on
            the date/time you chose. Thank you and we look forward to meeting
            you!
         </h3>
         <InlineWidget url="https://calendly.com/yourserenitysprings" />
      </div>
   );
}
