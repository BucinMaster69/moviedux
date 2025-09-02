import React from 'react';
import '../styles.css';

export default function footer(){
    const currentYear = new Date().getFullYear();
    return(
        <div className='footer'>
            <p className='footer-text'>
                © {currentYear} Moviedux, All rights reserved.
            </p>
        </div>
    )
}