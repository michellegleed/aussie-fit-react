import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import ClassCard from '../classCard/classCard';
import ClassForm from '../classForm/classForm';
import PlusIcon from '../../../icons/plus';

import { fetchRequest } from '../../../../utils/fetchRequest';

function Classes(props) {

    const [classList, setClassList] = useState();
    const { group } = props;

    const [showClassForm, setShowClassForm] = useState(false);

    const [classToEdit, setClassToEdit] = useState();

    const [refetchClasses, setRefetchClasses] = useState(0);

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}groups/${group}/`)
            .then((result) => {
                if (result.ok) {
                    setClassList(result.data.classes);
                }
                else {
                    history.push("/notfound");
                    console.log("no group data")
                }
            });
    }, [refetchClasses]);

    const editClass = (classID) => {
        setClassToEdit(classID);
        setShowClassForm(true);
    }

    const refetchClassList = () => {
        setRefetchClasses((prevState) => prevState + 1)
    }

    const displayClassForm = (bool) => {
        setShowClassForm(bool);

        // this clears group details from form upon closing
        bool === false ? setClassToEdit(null) : null;
    }

    const populateClassForm = () => {
        return classToEdit ? classList.filter(session => session.id == classToEdit)[0] : { title: "", group: group, time: "" };
    }

    return (
        <div>
            <h2>Classes</h2>
            <button className="icon-button" onClick={() => displayClassForm(true)}><PlusIcon /></button>
            {
                showClassForm ?
                    <ClassForm session={populateClassForm()} displayClassForm={displayClassForm} refetchClassList={refetchClassList} />
                    :
                    null
            }
            {
                classList != null && classList.length > 0 ?
                    classList.map(session => <ClassCard session={session} editClass={editClass} refetchClassList={refetchClassList} />)
                    :
                    <h4>No classes found</h4>
            }
        </div>
    )
}

export default Classes;