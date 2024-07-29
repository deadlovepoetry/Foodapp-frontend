import React, { useState } from 'react';
import '../components/Card.css'; // Adjust path if necessary
import { useDispatchCart, useCart } from '../components/ContextReducer'; // Adjust path if necessary

export default function Card({ item }) {
    const dispatch = useDispatchCart(); // Correctly obtain dispatch function
    const cart = useCart(); // Get current cart data

    const options = item.options[0]; // Access the first object in the options array
    const priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(priceOptions[0] || ""); // Default to the first option if available

    const handleAddToCart = () => {
        if (size === "") {
            alert("Please select a size.");
            return;
        }
        
        // Calculate the price for the current quantity and size
        const itemPrice = options[size];
        const totalPrice = itemPrice * qty;

        // Check if item with the same id and size already exists in the cart
        const existingItem = cart.find(food => food.id === item._id && food.size === size);

        if (existingItem) {
            // If item with the same size exists, update the quantity and price
            dispatch({
                type: "UPDATE",
                id: item._id,
                size: size,
                qty: qty, // Update quantity by adding the new quantity
                price: totalPrice // Update price based on new quantity
            });
        } else {
            // If item does not exist, add new item
            dispatch({
                type: "ADD",
                id: item._id,
                name: item.name,
                price: totalPrice,
                qty: qty,
                size: size,
                img: item.img
            });
        }
    };

    return (
        <div className="card-container">
            <div className="card-horizontal">
                <img
                    src={item.img}
                    className="card-img"
                    alt={item.name}
                />
                <div className="card-details">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-description">{item.description}</p>
                    <div className="card-options">
                        <select className="quantity-select" onChange={(e) => setQty(parseInt(e.target.value, 10))} value={qty}>
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>

                        <select className="size-select" onChange={(e) => setSize(e.target.value)} value={size}>
                            {priceOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <div className="total-price">
                            Total Price: {size ? options[size] * qty : '0'}
                        </div>
                    </div>
                    <button className="btn btn-success add-to-cart" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
