import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import './Cart.css'; // Ensure this CSS file is updated

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className='cart-img'>
        <div className='empty-cart'>
          <div className='text-center fs-3'>The Cart is Empty!</div>
        </div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/auth/orderData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  const totalPrice = data.reduce((total, food) => total + food.price * food.qty, 0);

  return (
    <div className='cart-img'>
      <div className='cart-container'>
        <div className='container mt-5 table-responsive'>
          <table className='table table-hover'>
            <thead className='text-success fs-4'>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Option</th>
                <th scope='col'>Amount</th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody>
              {data.map((food, index) => (
                <tr key={index} className="text-white fs-4">
                  <th scope='row'>{index + 1}</th>
                  <td>{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>{food.price * food.qty}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => dispatch({ type: "REMOVE", index })}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='total-price-container'>
            <h1 className='fs-2 text-light'>Total Price: {totalPrice.toFixed(2)}/-</h1>
          </div>
          <div className='checkout-container'>
            <button className='btn btn-success mt-5' onClick={handleCheckOut}>Check Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}
