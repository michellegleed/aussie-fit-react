import React from 'react';
import Moment from 'react-moment';

function Dashboard() {
    return (
        <div>
            <div>
                <h1>Groups</h1>
                <button>New Group</button>
                <div>
                    <div>
                        <h2>Swans-1</h2>
                        <p>12</p>
                    </div>
                    <p>Next Session:</p>
                    <p><Moment format="DD/MM/YY">2021-02-06T23:48:00+08:00</Moment> @ <Moment format="h:mma">2021-02-06T23:48:00+08:00</Moment></p>
                </div>
                <div>
                    <div>
                        <h2>Tigers-1</h2>
                        <p>15</p>
                    </div>
                    <p>Next Session:</p>
                    <p><Moment format="DD/MM/YY">2021-02-06T23:48:00+08:00</Moment> @ <Moment format="h:mma">2021-02-06T23:48:00+08:00</Moment></p>
                </div>
            </div>

            <div>
                <h1>Questions</h1>
                <button>New Question</button>
                <div>
                    <div>
                        <button>Edit</button>
                    </div>
                    <p>Q: Have you weighed in?</p>
                    <p>Yes: Nil</p>
                    <p>No: See Brendan</p>
                </div>
                <div>
                    <div>
                        <button>Edit</button>
                    </div>
                    <p>Q: Do you have any injuries today?</p>
                    <p>Yes: See physio</p>
                    <p>No: Nil</p>
                </div>
            </div>

        </div>
    )
}

export default Dashboard;