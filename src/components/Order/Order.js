import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName, 
            count: props.ingredients[ingredientName]
        })
    }

    const ingredientsOutput = ingredients.map(ig => {
        return (
        <span 
        key={ig.name}
        style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'}}>{ig.name}: ({ig.count}) </span>
        )
    })

    return(
    <div className={classes.Order}>
        <p>ingredients: {ingredientsOutput}</p>
        <p>price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
    )

};

export default order;