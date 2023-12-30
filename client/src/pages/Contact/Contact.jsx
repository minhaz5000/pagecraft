import React from 'react'
import './Contact.css'
import TopBar from '../../Components/TopBar/TopBar'
import Footer from '../../Components/Footer/Footer'
function Contact() {
  return (
    <div className='contactpage'>
        <TopBar contact={true} />
        <div className='Hero-text'>
            <h1>Contact us</h1>
            <p>PageCraft is here to provide you with more information and answers to any questions that you might have and provide you the best experience</p>
        </div>
        <div className='subsection'>
            <h2>Reason for Inquiry</h2>
            {/* <p>Please select the purpose for your Inquiry</p> */}
        </div>
        <div className='query-category'>
            <div className='query-subsection'>
                <h3>Request a demo</h3>
                <p>You can ask us for any demonstration of using our product. </p>
                <button>Request Demo</button>
            </div>
            <div className='query-subsection'>
                <h3>Sales inquiry</h3>
                <p>Reach out to our sales team for immediate assistance for all sales related inquiries</p>
                <button>Sales Inquiry</button>
            </div>
            <div className='query-subsection'>
                <h3>Customer support</h3>
                <p>Get in touch with our 24/7 customer support for any sort of asistance</p>
                <button>Customer Support</button>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Contact