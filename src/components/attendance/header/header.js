import React, { useEffect } from 'react';
import Moment from 'react-moment';

import './header.css';

function Header(props) {

    const { groupName, nextClass } = props;

    return (
        <div id="attendance-header">
            <h1>{groupName}</h1>
            {nextClass != null ?
                <div>
                    <h2>{nextClass.title}</h2>
                    <h4><Moment format="ddd DD/MM/YY">
                        {nextClass.time}
                    </Moment></h4>
                    <h4><Moment format="h:mma">
                        {nextClass.time}
                    </Moment></h4>
                </div>
                :
                <div>
                    <h2>No Upcoming Classes</h2>
                </div>
            }

        </div>
    )
}

export default Header;

