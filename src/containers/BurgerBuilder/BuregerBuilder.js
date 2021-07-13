import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Hoc from '../../hoc/hoc/Hoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const burgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));


    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients])

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        },0);

        return sum > 0;
    }

    const purchaseHandler = () => {
        if(isAuthenticated){
            setPurchasing( true);
        }else{
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }

    const purshaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseCountinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

        //check for disable ingredients buttons
        const disabledInfo = {
            ...ings
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }


        //check if ingredients load from dataBase
        let orderSummary = null;
        let burger = error ? <p>Ingredients cant be loaded</p> : <Spinner/>;

        if(ings) {
            burger =(
                <Hoc>
                    <Burger ingredients={ings}/>
                    <BuildControls 
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    ingredients={ings}
                    purchasable = {updatePurchaseState(ings)}
                    price={price}
                    isAuth = {isAuthenticated}
                    ordered={purchaseHandler}/>
                </Hoc>
            )
            orderSummary = <OrderSummary 
                            ingredients={ings}
                            purchaseCanceled={purshaseCancelHandler}
                            purchaseCountinued={purchaseCountinueHandler}
                            price={price}/>;
        }

        return(
            <Hoc>
                <Modal show={purchasing} modalClosed={purshaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Hoc>
        );
}
export default withErrorHandler(burgerBuilder, axios);