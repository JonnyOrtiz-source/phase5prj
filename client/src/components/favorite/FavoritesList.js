import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import FavoriteCard from './FavoriteCard';

function FavoritesList({
   currentUser,
   favorites,
   // handleFave,
   handleFavorites,
}) {
   useDocumentTitle('Serenity Springs - Favorites List');
   let favoritesEl;

   const deleteFave = (deletedFave) => {
      const updatedFavorites = favorites.filter(
         (favorite) => favorite.id !== deletedFave.id
      );
      handleFavorites(updatedFavorites);
   };

   if (!favorites.length) {
      favoritesEl = 'No faves yet';
      console.log(favoritesEl.length);
   } else {
      favoritesEl = favorites.map((favorite) => (
         <FavoriteCard
            key={favorite.id}
            currentUser={currentUser}
            favorite={favorite}
            // handleFave={handleFave}
            deleteFave={deleteFave}
         />
      ));
   }

   return (
      <div>
         <h2>Faves</h2>
         <div className="wrapper">{favoritesEl}</div>
      </div>
   );
}

export default FavoritesList;
