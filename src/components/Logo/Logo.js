import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <span>America</span><img src={burgerLogo} alt="myLogo"/><span>Burgers</span>
    </div>
)

export default logo;