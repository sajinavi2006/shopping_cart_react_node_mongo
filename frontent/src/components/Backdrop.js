import './Backdrop.css';
import React from 'react'

const Backdrop = ({ show, click }) => {
    return show && <div className='backdrop' onClick={click}>Backdrop</div>
}

export default Backdrop