import React from 'react'
import './ProductFurniture.css'
import pImg from '../../assets/hero-img-2.jpg';
import pImg2 from '../../assets/chair.png';

const ProductFurniture = () => {
  return (
    <div className='main'>
      <div className='f-grid'>

        <div className='fleft-grid'>

          <div className='fleft-top'>

            <img src={pImg} />

          </div>

          <div className='fleft-bottom'>

            <h2>100% of our equipment is the most<br /> reconditioned after use</h2>

            <button>Explore All <i class="fa-solid fa-chevron-right"></i></button>

          </div>

        </div>


        <div className='fright-grid'>

          <h1>Our Modern Furniture <br></br> Basic <i class="fa-solid fa-star-of-life"></i> Collection </h1>

          <p>Every space is a fresh opportunity for our creativity to unfold<br></br> and connect with different personalities</p>

          <div className='right-furniture'>
            <div className='fbackground-color'>

             

            </div>
            <img src={pImg2} />

          </div>

        </div>

      </div>

    </div>
  )
}

export default ProductFurniture;