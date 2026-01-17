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

  // console.log("thisOrderProduct: ", thisOrderProduct);
  console.log(isLoading);
  
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />
      <title>Tracking</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on:{" "}
            {dayjs(thisOrderProduct.estimatedDeliveryTimesMs).format("MMMM D")}
          </div>

          <div className="product-info">{thisOrderProduct.product.name}</div>

          <div className="product-info">
            Quantity: {thisOrderProduct.quantity}
          </div>

          <img className="product-image" src={thisOrderProduct.product.image} />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}
