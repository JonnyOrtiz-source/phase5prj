import { useState, useEffect } from 'react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import FavoriteCard from './FavoriteCard';

function FavoritesList() {
   const [favorites, setFavorites] = useState([]);

   useEffect(() => {
      fetch('/favorites').then((res) => {
         if (res.ok) {
            res.json().then((favorite) => setFavorites(favorite));
         } else {
            console.log('No favorites');
         }
      });
   }, []);

   useDocumentTitle('Serenity Springs - Favorites List');
   let favoritesEl;

   if (!favorites.length) {
      favoritesEl = 'No faves..yet';
   } else {
      favoritesEl = favorites.map((favorite) => (
         <FavoriteCard
            key={favorite.id}
            // currentUser={currentUser}
            favorite={favorite}
            // updateService={updateService}
            // deleteService={deleteService}
            // serviceTypes={serviceTypes}
            // durations={durations}
         />
      ));
   }

   return <div>{favoritesEl}</div>;
}

export default FavoritesList;
