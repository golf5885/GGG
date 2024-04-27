'use client';

import React, { useState, useEffect } from 'react';
import FoodItemCard from '../../../components/FoodCards/FoodItemCard';
import './Page.css'; // Import CSS file for styling

const Page = () => {
    const [menuItems, setMenuItems] = useState([]); // Declare menuItems using useState

    useEffect(() => {
        async function fetchMenuData() {
            try {
                const response = await fetch('/api/Ortega/menu');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const menuData = await response.json();
                setMenuItems(Array.from(Object.values(menuData)[0]));
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        }
        fetchMenuData();
    }, []);

    return (
        <div className="page-container">
            <header className="text-center py-4">
                <h1 className="text-2xl" style={{ fontFamily: 'Almendra', fontSize: '30px', fontWeight: '400' }}>
                    Welcome to Ortega Dining Commons
                </h1>
            </header>
            <div className="food-cards-container">
                {menuItems.map((item) => (
                    <FoodItemCard
                        key={item.name}
                        isReadOnly={true}
                        id={item.name.toLowerCase().replace(/\s+/g, '-')}
                        img={
                            'https://www.marionskitchen.com/wp-content/uploads/2019/09/Chinese-BBQ-Pork-Steamed-Buns4.jpg'
                        }
                        name={item.name}
                    />
                ))}
            </div>
        </div>
    );
};

export default Page;
