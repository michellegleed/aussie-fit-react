import React, { useEffect } from 'react';
import Moment from 'react-moment';

function Header(props) {

    const { groupName, nextClass } = props;

    useEffect(() => {
        console.log("NExt class as passed to header... ", nextClass)
    }, [])

    return (
        <div>
            <h1>{groupName}</h1>
            {nextClass != null ?
                <div>
                    <h2>{nextClass.title}</h2>
                    <h6><Moment format="ddd DD/MM/YY">
                        {nextClass.time}
                    </Moment></h6>
                    <h6><Moment format="h:mma">
                        {nextClass.time}
                    </Moment></h6>
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

