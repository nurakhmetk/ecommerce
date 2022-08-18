import React from 'react';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 Ecommerce Headphones All rights reserved</p>
      <p className='icons'>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
      <p className='footer-warning-text'>
        This isn't real commercial website. It was made for training purposes,
        all payment transactions do not charge real money. But for more
        security, do not enter your real bank card details.
      </p>
      <p className='footer-warning-text'>
        Payment testing card details: Card number -{' '}
        <strong>4242 4242 4242 4242</strong>, Month - <strong> 04/42</strong>,
        CVV - <strong>424</strong>
      </p>
      <p className='footer-warning-text'>
        Designed and created by Kairat Nurakhmet
      </p>
    </div>
  );
};

export default Footer;
