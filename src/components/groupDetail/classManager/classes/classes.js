import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';


import { fetchRequest } from '../../../../utils/fetchRequest';
import ErrorMessage from '../../../errorMessage/errorMessage';

import ClassCard from '../classCard/classCard';
import ClassForm from '../classForm/classForm';
import PlusIcon from '../../../icons/plus';
import PlusButton from '../../../buttons/plusButton/plusButton';

function Classes(props) {

    const [classList, setClassList] = useState();
    const { group } = props;

    const [errorMessage, setErrorMessage] = useState();

    const [showClassForm, setShowClassForm] = useState(false);

    const [classToEdit, setClassToEdit] = useState();
    const [deleteClassID, setDeleteClassID] = useState();

    const [refetchClasses, setRefetchClasses] = useState(0);

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}groups/${group}/`)
            .then((result) => {
                if (result.ok) {
                    setClassList(result.data.classes);
                }
                else {
                    setErrorMessage("No classes found for this group.")
                }
            });
    }, [refetchClasses]);

    const editClass = (classID) => {
        setClassToEdit(classID);
        setShowClassForm(true);
    }

    const deleteClass = (classID) => {
        setDeleteClassID(classID);
    }

    const refetchClassList = () => {
        setRefetchClasses((prevState) => prevState + 1)
    }

    const displayClassForm = (bool) => {
        setShowClassForm(bool);
        // this clears group details from form upon closing
        if (bool === false) {
            setClassToEdit(null);
        }
    }

    const populateClassForm = () => {
        return classToEdit ? classList.filter(session => session.id == classToEdit)[0] : { title: "", group: group, time: "" };
    }

    const getClassTitle = () => {
        const sess = deleteClassID ? classList.filter(session => session.id == deleteClassID)[0] : null;
        return sess.title;
    }

    const deleteData = () => {
        if (deleteClassID) {
            fetchRequest(`${process.env.REACT_APP_API_URL}classes/${deleteClassID}/`, "DELETE")
                .then(result => {

                    if (result.ok) {
                        refetchClassList();
                        setDeleteClassID(null);
                    } else {
                        // the API returned an error - do something with it
                        setErrorMessage("Unable to delete this class. Check your network connection and try again.");
                    }
                })
                .catch(error => setErrorMessage("Network error."));
            // .catch(error => history.push("/network-error"))
        }
    }

    return (
        <div id="class-section">
            <div className="error-message">
                {
                    errorMessage ?
                        <ErrorMessage message={errorMessage} type="error" />
                        :
                        null
                }
            </div>
            <h2>Classes</h2>
            {/* <button className="icon-button" onClick={() => displayClassForm(true)}><PlusIcon /></button> */}
            <PlusButton clickHandler={() => displayClassForm(true)} buttonText="New Class" />
            {
                showClassForm ?
                    <ClassForm session={populateClassForm()} displayClassForm={displayClassForm} refetchClassList={refetchClassList} />
                    :
                    null
            }
            {
                deleteClassID ?
                    <div className="modal">
                        <div className="modal-content">
                            <h4>Permanently delete {getClassTitle()}?</h4>
                            <div className="button-row">
                                <button onClick={() => deleteData()}>OK</button>
                                <button onClick={() => setDeleteClassID(null)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
            {
                classList != null && classList.length > 0 ?
                    classList.map(session => <ClassCard key={session.id} session={session} editClass={editClass} deleteClass={deleteClass} />)
                    :
                    <h4>No classes found</h4>
            }
        </div>
    )
}

export default Classes;