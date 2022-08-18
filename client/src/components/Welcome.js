function Welcome({ currentUser }) {
   const { first_name } = currentUser;
   return (
      <div id="welcome">
         <h2>Welcome to Serenity Springs, {first_name}!</h2>
         <div className="benes-list">
            <h3>Your place for:</h3>
            <ul>
               <li className="bene">
                  <h3>
                     ✅ an individually customized salon and spa experience
                  </h3>
               </li>
               <li className="bene">
                  <h3>✅ natural, handmade products</h3>
               </li>
            </ul>
         </div>
         <h3 className="center">Now serving the Greater Tampa Bay area!</h3>
      </div>
   );
}

export default Welcome;
