import React from 'react';
import './ProductReviews.css';
import StarRating from './StarRating'; // Import the StarRating component

const ProductReviews = () => {

  const reviews = [
    {
      id: 1,
      user: {
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVvcGxlfGVufDB8fDB8fHww"
      },
      rating: 4.5,
      comment: "I've been using this product for a few months now, and I have to say, it's been a game-changer for me. The functionality it offers is exceptional, and it has significantly improved my workflow. The build quality is also impressive, making it a durable option for long-term use. Overall, I'm extremely satisfied with my purchase!",
      date: "2024-03-24"
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        email: "jane@example.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
      },
      rating: 5,
      comment: "Where do I even begin? From the moment I interacted with their customer service team to the delivery of the product, everything was seamless. The product itself exceeded my expectations in terms of both quality and performance. It's evident that a lot of thought and effort has gone into its design. I've already recommended it to several friends and family members!",
      date: "2024-03-23"
    },
    {
      id: 3,
      user: {
        name: "Michael Johnson",
        email: "michael@example.com",
        avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
      },
      rating: 4,
      comment: "I recently purchased this product, and so far, I'm impressed with its performance. It's user-friendly and has helped me streamline my tasks effectively. While there are minor improvements that could be made, overall, it's a great value for the price. I would definitely recommend it to others!",
      date: "2024-03-22"
    },
    {
      id: 4,
      user: {
        name: "Emily Brown",
        email: "emily@example.com",
        avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
      },
      rating: 4.7,
      comment: "This product exceeded my expectations! The quality is exceptional, and it's evident that the company cares about customer satisfaction. I've been using it for a few weeks now, and it has made a significant difference in my daily routine. The customer service team was also very helpful when I had questions. Highly recommend!",
      date: "2024-03-21"
    },
    // Add more reviews as needed
  ];


  return (
    <div className='mainBanners'>
      <div className='reviewHeader'>
        <div className='headerText'><h1>Our Customers <br></br>love us</h1></div>
        <div className='reviewArrows'>
          <button className="arrow right"><i className="fa-solid fa-arrow-left"></i></button>
          <button className="arrow left"><i className="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>

      <div className='reviewsContainer'>
        {reviews && reviews.map((review, index) => (
          <div className='singleReview' key={index}>
            <StarRating className='starRating' rating={review.rating} />
            <div className='comment'>{review.comment}</div>
            <div className='userDetails'>
              <img className='avatar' src={review.user.avatar} alt={review.user.name} />
              <div className='userInfo'>
                <div className='userName'>{review.user.name}</div>
                
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductReviews;



