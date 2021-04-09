import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

function QuantityAdder(props) {
    const { quantity, maxItems, onIncrease, onDecrease } = props;
    return (
        <div>
            <ButtonGroup>
                <Button disabled={quantity <= 1} outline color='primary' onClick={onDecrease}>-</Button>
                <Button disabled outline color='primary'>{quantity}</Button>
                <Button disabled={quantity >= maxItems} outline color='primary' onClick={onIncrease}>+</Button>
            </ButtonGroup>
        </div>
    );
}

export default QuantityAdder;