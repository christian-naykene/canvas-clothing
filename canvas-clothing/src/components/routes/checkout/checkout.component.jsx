import { useContext } from "react";
import "./checkout.styles.scss";
import { CartContext } from "../../../context/cart.context";
import { CheckoutItem } from "../../checkout-item/checkout-item.component";

export const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  console.log("cartItems", cartItems);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span> Product </span>
        </div>
        <div className="header-block">
          <span> Description </span>
        </div>
        <div className="header-block">
          <span> Quantity </span>
        </div>
        <div className="header-block">
          <span> Price </span>
        </div>
        <div className="header-block">Remove</div>
      </div>
      {cartItems.map((item) => {
        return <CheckoutItem key={item.id} cartItem={item} />;
      })}
      <span className="total"> Total: £{cartTotal}</span>
    </div>
  );
};
