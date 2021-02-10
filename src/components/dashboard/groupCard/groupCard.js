import React from 'react';
import Moment from 'react-moment';

function GroupCard(props) {

    const { group, editGroup } = props;

    return (
        <div>
            <div>
                <h2>{group.group_name}</h2>
                <p>{group.number_of_participants}</p>
            </div>
            <div>
                <button onClick={() => editGroup(group.id)}>edit</button>
                <button>X</button>
            </div>
            <p>Next Session:</p>
            {
                group.next_class != null ?
                    <p><Moment format="DD/MM/YY">{group.next_class.time}</Moment> @ <Moment format="h:mma">{group.next_class.time}</Moment></p>
                    :
                    <h4>No upcoming classes</h4>
            }

        </div>
    )
}

export default GroupCard;