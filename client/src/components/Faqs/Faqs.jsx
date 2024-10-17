import React from 'react'
import './Faqs.css'
import pImg from '../../assets/hero-img-2.jpg';
import pImg2 from '../../assets/chair.png';


const Faqs = () => {
  const faqs = [
    {
      question: 'What is React?',
      answer: 'React is a JavaScript library for building user interfaces.',
    },
    {
      question: 'How do I install React?',
      answer: 'You can install React using npm or yarn. For example, run: npm install react react-dom',
    },
    {
      question: 'What is React?',
      answer: 'React is a JavaScript library for building user interfaces.',
    },
    {
      question: 'How do I install React?',
      answer: 'You can install React using npm or yarn. For example, run: npm install react react-dom',
    },
    // Add more FAQs as needed
  ];
  return (
    <div className='faqsmain'>

      <div className='f-grid'>

        <div className='fleft-grid'>
          <div className='faqs-heading'>
            <h1>Our Modern Furniture basic <br></br> basic collection</h1>
          </div>
          <div className='faqs-section'>
            <div className="faq-container">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <div className="faq-item" key={index}>
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>


        <div className='fright-grid'>

        <img src={pImg} />
     

        </div>

      </div>



    </div>
  )
}

export default Faqs