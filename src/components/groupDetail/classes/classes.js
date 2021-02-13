import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import ClassCard from '../classCard/classCard';
import ClassForm from '../classForm/classForm';

function Classes(props) {

    const { classList } = props;

    const [showClassForm, setShowClassForm] = useState(false);

    const [classToEdit, setClassToEdit] = useState();

    const rerenderOnClassDeleted = () => {
        setClassCardDeleted((prevState) => prevState + 1)
    }

    const editClass = (classID) => {
        setClassToEdit(classID);
        setShowClassForm(true);
    }

    // const displayGroupForm = (bool) => {
    //     setShowGroupForm(bool);
    //     // this clears group details from form upon closing
    //     bool === false ? setGroupToEdit(null) : null;
    // }

    // const populateGroupForm = () => {
    //     return groupToEdit ? groupList.filter(group => group.id == groupToEdit)[0] : { group_name: "" };
    // }

    const displayClassForm = (bool) => {
        setShowClassForm(bool);
    }

    const populateClassForm = () => {
        return classToEdit ? classList.filter(session => session.id == classToEdit)[0] : { title: "", time: "" };
    }

    return (
        <div>
            <h2>Classes</h2>
            <button onClick={() => displayClassForm(true)}>New Class</button>
            {
                showClassForm ?
                    <ClassForm session={populateClassForm()} displayClassForm={displayClassForm} />
                    :
                    null
            }
            {
                classList != null && classList.length > 0 ?
                    classList.map(session => <ClassCard session={session} editClass={editClass} rerenderClassList={rerenderOnClassDeleted} />)
                    :
                    <h4>No classes found</h4>
            }
        </div>
    )
}

export default Classes;