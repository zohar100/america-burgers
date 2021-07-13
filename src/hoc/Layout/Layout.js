import React, { useState } from 'react';
import { connect } from 'react-redux';

import Hoc from '../hoc/Hoc';
import Toolbar from '../../components/Navigation/Toolbar/Tollbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';


const layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false)
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer)
    }

    return(
        <Hoc>
            <Toolbar 
            clicked={sideDrawerToggleHandler}
            isAuth={props.isAuthenticated}/>
            <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Hoc>
        )
}


const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(layout);