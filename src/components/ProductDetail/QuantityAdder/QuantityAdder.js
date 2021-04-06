import React, { useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

function QuantityAdder(props) {
    const [quantity, setQuantity] = useState(1);
    const MAX_ITEM = 5;

    function handleAdd() {
        setQuantity(quantity + 1);
    }

    function handleRemove() {
        setQuantity(quantity - 1);
    }

    return (
        <div>
            <ButtonGroup>
                <Button disabled={quantity <= 1} outline color='primary' onClick={() => handleRemove()}>-</Button>
                <Button disabled outline color='primary'>{quantity}</Button>
                <Button disabled={quantity >= MAX_ITEM} outline color='primary' onClick={() => handleAdd()}>+</Button>
            </ButtonGroup>
        </div>
    );
}

export default QuantityAdder;