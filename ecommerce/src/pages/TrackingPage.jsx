import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Header } from "../components/Header";
import dayjs from "dayjs";
import "./TrackingPage.css";

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    setIsLoading(true);

    const getOrder = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );
      setOrder(response.data);
      console.log(response.data);
    };

    getOrder();

    setIsLoading(false);
  }, [orderId]);

  if (!order) return null;

  const thisOrderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  // console.log("thisOrderProduct", thisOrderProduct);
  const totalDeliveryTimeMs = (thisOrderProduct.estimatedDeliveryTimeMs - order.orderTimeMs);
  
  // console.log(totalDeliveryTimeMs);
  // console.log("estimated: ", thisOrderProduct.estimatedDeliveryTimeMs);
  // console.log("orderTime", order.orderTimeMs);
  
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  // const timePassedMs = totalDeliveryTimeMs * 40;
  // console.log("timePassedMs",timePassedMs);
  let deliveryPercent = (timePassedMs/totalDeliveryTimeMs);
  // console.log("deliveryPercent", deliveryPercent);


  if (deliveryPercent > 100) {
    deliveryPercent = 100;  
  } 

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;
  
  return (
    <>
      {isLoading && <div>Loading...</div>}

      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />
      <title>Tracking</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent >=100 ? ("Delivered On: ") : ("Arriving on: ") }            
            {dayjs(thisOrderProduct.estimatedDeliveryTimeMs).format("MMMM D")}
          </div>

          <div className="product-info">{thisOrderProduct.product.name}</div>

          <div className="product-info">
            Quantity: {thisOrderProduct.quantity}
          </div>

          <img className="product-image" src={thisOrderProduct.product.image} />

          <div className="progress-labels-container">
            
            <div className={`progress-label ${isPreparing && 'current-status'}`} >Preparing</div>
            <div className={`progress-label ${isShipped && 'current-status'}`} >Shipped</div>
            <div className={`progress-label ${isDelivered && 'current-status'}`} >Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${deliveryPercent}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );
}
