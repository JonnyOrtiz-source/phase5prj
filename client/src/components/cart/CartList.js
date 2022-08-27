import CartCard from './CartCard';

function CartList({ cart, handleCart }) {
   const cartEl = cart.map((cart) => (
      //show cart item
      <CartCard
         key={cart.id}
         // currentUser={currentUser}
         // service={service}
         // updateService={updateService}
         // deleteService={deleteService}
         // serviceTypes={serviceTypes}
         // durations={durations}
         // handleFave={handleFave}
         handleCart={handleCart}
      />
   ));
   return (
      <div>
         Cart
         {cartEl}
      </div>
   );
}

export default CartList;
