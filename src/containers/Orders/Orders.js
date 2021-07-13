import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

const orders = props => {

    const { onFetchOrders } = props

    useEffect(()=> {
        onFetchOrders(props.token, props.userId);
    },[onFetchOrders])

        let orders = props.orders.map(order => (
            <Order 
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}/>
        ))
        if(props.loading){
            orders = <Spinner/>
        }
        return(
            <div>
                {orders}
            </div>
        )
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));