import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import FavoriteCard from './FavoriteCard';

function FavoritesList({ currentUser, favorites, handleFave }) {
   useDocumentTitle('Serenity Springs - Favorites List');
   let favoritesEl;

   if (!favorites.length) {
      favoritesEl = 'No faves..yet';
   } else {
      favoritesEl = favorites.map((favorite) => (
         <FavoriteCard
            key={favorite.id}
            currentUser={currentUser}
            favorite={favorite}
            handleFave={handleFave}
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
