// 'use client';
// import React, { useState, useEffect } from 'react';
// // import './styles.css'; // Import your CSS file for styling
// import Rating from '@mui/material/Rating';
// import { usePathname } from 'next/navigation';

// const Page = () => {
//     const router = usePathname();
//     const parts = router.split('/');
//     const item_name = parts[parts.length - 1];

//     const [url, setUrl] = useState(
//         'https://www.marionskitchen.com/wp-content/uploads/2019/09/Chinese-BBQ-Pork-Steamed-Buns4.jpg'
//     );

//     useEffect(() => {
//         async function getURL() {
//             try {
//                 //get picture of it
//                 const response2 = await fetch(`/api/pictures/%7Bitem_name%7D?name=${item_name}`);
//                 if (!response2.ok) {
//                     throw new Error('Failed to fetch image');
//                 }
//                 //about url
//                 const imageURL = await response2.json();
//                 const real_url = Object.values(imageURL)[2];
//                 setUrl(real_url);
//             } catch (error) {
//                 console.error('Error fetching menu data:', error);
//             }
//         }
//         getURL();
//     });

//     return (
//         <div
//             style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'flex-start',
//                 flexDirection: 'column',
//                 padding: '20px',
//             }}
//         >
//             <div style={{ marginBottom: '20px', maxWidth: '600px', display: 'flex', flexDirection: 'column' }}>
//                 <div
//                     style={{
//                         backgroundColor: '#f9f9f9',
//                         borderRadius: '10px',
//                         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                         padding: '20px',
//                         display: 'flex',
//                     }}
//                 >
//                     <img
//                         src={url}
//                         alt="Yummy Food"
//                         style={{ width: '50%', borderRadius: '10px', marginRight: '20px' }}
//                     />
//                     <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
//                         <div>
//                             <h1
//                                 style={{
//                                     fontSize: '24px',
//                                     fontWeight: 'bold',
//                                     textAlign: 'right',
//                                     marginBottom: '10px',
//                                 }}
//                             >
//                                 {item_name}
//                                 <Rating
//                                     name="half-rating-read"
//                                     value={4.5}
//                                     precision={0.5}
//                                     readOnly
//                                     style={{ paddingLeft: '6px', paddingTop: '4px' }}
//                                 />
//                             </h1>
//                             <div style={{ height: '2px', backgroundColor: '#ccc', margin: '10px 0' }}></div>
//                             <div style={{ marginBottom: '20px' }}>
//                                 <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Nutritional Info:</h2>
//                                 <ul>
//                                     <li>Protein: 14g</li>
//                                     <li>Fat: 46g</li>
//                                     <li>Carbs: 64g</li>
//                                     <li>Sugar: 9g</li>
//                                     <li>
//                                         <b>TOTAL CALORIES: 567</b>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                 <h2 style={{ fontSize: '30px', marginBottom: '10px', fontWeight: 500 }}>Reviews</h2>
//                 <div style={{ marginBottom: '10px' }}>
//                     <p>This food is absolutely delicious! I highly recommend it. - John Doe</p>
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <p>One of the best dishes I've ever tasted! - Jane Smith</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Page;
'use client';
import React, { useState, useEffect } from 'react';
// import './styles.css'; // Import your CSS file for styling
import Rating from '@mui/material/Rating';
import { usePathname } from 'next/navigation';

const Page = () => {
    const router = usePathname();
    const parts = router.split('/');
    const item_name = parts[parts.length - 1];

    const [url, setUrl] = useState(
        'https://www.marionskitchen.com/wp-content/uploads/2019/09/Chinese-BBQ-Pork-Steamed-Buns4.jpg'
    );
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch picture
                const pictureResponse = await fetch(`/api/pictures/%7Bitem_name%7D?name=${item_name}`);
                if (!pictureResponse.ok) {
                    throw new Error('Failed to fetch image');
                }
                const pictureData = await pictureResponse.json();
                const imageURL = Object.values(pictureData)[2];
                setUrl(imageURL);

                // Fetch reviews
                const reviewsResponse = await fetch(`/api/reviews/{item_name}?name=${item_name}`);
                if (!reviewsResponse.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const comments = await reviewsResponse.json();
                setComments(Array.from(Object.values(comments)));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    });

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexDirection: 'column',
                padding: '20px',
            }}
        >
            <div style={{ marginBottom: '20px', maxWidth: '600px', display: 'flex', flexDirection: 'column' }}>
                <div
                    style={{
                        backgroundColor: '#f9f9f9',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        display: 'flex',
                    }}
                >
                    <img
                        src={url}
                        alt="Yummy Food"
                        style={{ width: '50%', borderRadius: '10px', marginRight: '20px' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <h1
                                style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    textAlign: 'right',
                                    marginBottom: '10px',
                                }}
                            >
                                {item_name}
                                <Rating
                                    name="half-rating-read"
                                    value={4.5}
                                    precision={0.5}
                                    readOnly
                                    style={{ paddingLeft: '6px', paddingTop: '4px' }}
                                />
                            </h1>
                            <div style={{ height: '2px', backgroundColor: '#ccc', margin: '10px 0' }}></div>
                            <div style={{ marginBottom: '20px' }}>
                                <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Nutritional Info:</h2>
                                <ul>
                                    <li>Protein: 14g</li>
                                    <li>Fat: 46g</li>
                                    <li>Carbs: 64g</li>
                                    <li>Sugar: 9g</li>
                                    <li>
                                        <b>TOTAL CALORIES: 567</b>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ fontSize: '30px', marginBottom: '10px', fontWeight: 500 }}>Reviews</h2>
                <div style={{ marginBottom: '10px' }}>
                    {comments.map((comment) => (
                        <p key={comment.id}>
                            {comment.reviewer}: {comment.comment} : {comment.rating}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
