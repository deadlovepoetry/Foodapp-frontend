import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import Card from '../components/Card';


export default function Home() {
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/foodData`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log("Fetched Data:", data); // Log the fetched data to inspect it
                setFoodItem(data[0]);
                setFoodCat(data[1]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const filterItemsByCategory = (categoryName) => {
        return foodItem.filter(item => item.CategoryName === categoryName);
    };

    return (
        <div>
            <Navbar />
            <Carousel />
            <div className='m-3'>
                {foodCat.length > 0 ? (
                    foodCat.map((category) => (
                        <div key={category._id}>
                            <div className="fs-3 m-3">{category.CategoryName}</div>
                            <hr />
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                {filterItemsByCategory(category.CategoryName).map((item) => (
                                    <div key={item._id} className="col">
                                        <Card item={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <Footer />
        </div>
    );
}
