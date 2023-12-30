import React from 'react'
import DefaultTopbar from '../../Components/DefaultTopbar/DefaultTopbar'
import Footer from '../../Components/Footer/Footer'
import TopBar from '../../Components/TopBar/TopBar';
import './Pricing.css'
function Pricing() {
    return (
        <div>
            <DefaultTopbar />
            <TopBar pricing={true} />   
            <div class="background-pricing2">
                <div class="container-pricing">
                    <div class="panel-pricing pricing-table">

                        <div class="pricing-plan">
                            <img src="https://s22.postimg.cc/8mv5gn7w1/paper-plane.png" alt="" class="pricing-img" />
                                <h2 class="pricing-header">Educational</h2>
                                <ul class="pricing-features">
                                    <li class="pricing-features-item">Access to all books</li>
                                    <li class="pricing-features-item">Progress Saving</li>
                                    <li class="pricing-features-item">Offline access upto 7 days</li>
                                </ul>
                                <span class="pricing-price">Free</span>
                                <a href="/signup" class="pricing-button">Sign up</a>
                        </div>

                        <div class="pricing-plan">
                            <img src="https://s21.postimg.cc/tpm0cge4n/space-ship.png" alt="" class="pricing-img" />
                                <h2 class="pricing-header">Family</h2>
                                <ul class="pricing-features">
                                    <li class="pricing-features-item">Access to all books upto 4 devices</li>
                                    <li class="pricing-features-item">Progress Saving</li>
                                    <li class="pricing-features-item">Lifetime Offline Access</li>
                                </ul>
                                <span class="pricing-price">$15/month</span>
                                <a href="/signup" class="pricing-button is-featured">Signup</a>
                        </div>

                        <div class="pricing-plan">
                            <img src="https://s28.postimg.cc/ju5bnc3x9/plane.png" alt="" class="pricing-img" />
                                <h2 class="pricing-header">Personal</h2>
                                <ul class="pricing-features">
                                    <li class="pricing-features-item">Access to all books</li>
                                    <li class="pricing-features-item">Progress Saving</li>
                                    <li class="pricing-features-item">Lifetime Offline Access</li>
                                </ul>
                                <span class="pricing-price">$10/month</span>
                                <a href="/signup" class="pricing-button">Signup</a>
                        </div>

                    </div>
                </div>
            </div>
            <div classname ="pricing-footer" ><Footer /></div>
        </div>
    )
}

export default Pricing