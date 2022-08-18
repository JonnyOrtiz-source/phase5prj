import logo from '../assets/serenitySpringsLogoNoName.png';

function Header() {
   return (
      <div>
         <header>
            <div className="parent">
               <div className="child">
                  <img
                     src={logo}
                     alt="serenity springs organic salon and spa logo"
                  />
               </div>
               <div className="child">
                  <h1>Serenity Springs</h1>
               </div>
            </div>
         </header>
      </div>
   );
}

export default Header;
