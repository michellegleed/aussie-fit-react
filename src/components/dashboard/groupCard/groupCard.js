import React from 'react';
import Moment from 'react-moment';

function GroupCard() {
    return (
        <div>
            <div>
                <h2>Swans-1</h2>
                <p>12</p>
            </div>
            <p>Next Session:</p>
            <p><Moment format="DD/MM/YY">2021-02-06T23:48:00+08:00</Moment> @ <Moment format="h:mma">2021-02-06T23:48:00+08:00</Moment></p>
        </div>
    )
}

export default GroupCard;