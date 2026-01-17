import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Header } from "../components/Header";

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

          <div className="delivery-date">Arriving on Monday, June 13</div>

          <div class="product-info">
                Black and Gray Athletic Cotton Socks - 6 Pairs
              </div>

          <div class="product-info">Quantity: 1</div>

              <img
            class="product-image"
                src="images/products/athletic-cotton-socks-6-pairs.jpg"
              />

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
