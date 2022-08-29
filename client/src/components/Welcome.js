import { useDocumentTitle } from '../hooks/useDocumentTitle';

function Welcome({ currentUser }) {
   useDocumentTitle('Serenity Springs - Welcome');

   const { first_name } = currentUser;

   return (
      <div id="welcome">
         <h2>Welcome to Serenity Springs, {first_name}!</h2>
         <div className="benes-list">
            <h3>Here for you with:</h3>
            <h3>‣ an individually customized salon and spa experience</h3>
            <h3>‣ natural, handmade products</h3>
         </div>
         <h3 className="center">Now serving the Greater Tampa Bay area!</h3>
      </div>
   );
}

export default Welcome;
