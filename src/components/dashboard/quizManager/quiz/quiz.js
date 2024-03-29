import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { fetchRequest } from '../../../../utils/fetchRequest';
import ErrorMessage from '../../../errorMessage/errorMessage';


import QuestionCard from '../questionCard/questionCard';
import QuestionForm from '../questionForm/questionForm';
import PlusIcon from '../../../icons/plus';
import PlusButton from '../../../buttons/plusButton/plusButton';

function Quiz() {

    const [questionList, setQuestionList] = useState();

    const [showQuestionForm, setShowQuestionForm] = useState(false);

    const [questionToEdit, setQuestionToEdit] = useState();

    const [saveUpdatesToAPI, setSaveUpdatesToAPI] = useState(0);

    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}questions/`)
            .then((result) => {
                if (result.ok) {
                    setQuestionList(JSON.parse(result.data.questions))
                }
                else {
                    setErrorMessage("Could not access question list. Refresh the page and try again.")
                }
            });
    }, []);

    // Is Evie snoring?

    // None

    // Take her for a walk

    // Does Evie smell like cornchips?

    // Take her for a bath

    // None

    // Is Evie a good dog?

    // None

    // Go see the dog trainer

    // Does Evie have big ears?

    // Brush them

    // None

    // Does Evie have bad breath?

    // Brush her teeth

    // None

    // Is Evie hungry?

    // Give her some chicken

    // She's always hungry! Give her some chicken

    const editQuestion = (index) => {
        setQuestionToEdit(index);
        setShowQuestionForm(true);
    }

    const displayQuestionForm = (bool) => {
        setShowQuestionForm(bool);
        if (bool === false) {
            setQuestionToEdit(null);
        }
    }

    const populateQuestionForm = () => {
        return questionToEdit != null ? questionList[questionToEdit] : { id: Date.now().toString(), question: "", yesAction: "", noAction: "" };
    }

    const addQuestionToQuiz = (question) => {
        setQuestionList((prevState) => [
            ...prevState,
            question
        ]);

        setSaveUpdatesToAPI((prevState) => prevState + 1);
    }

    const updateQuestion = (question, index) => {
        let items = Array.from(questionList);
        items[index] = question;
        setQuestionList(items);
        setSaveUpdatesToAPI((prevState) => prevState + 1);
    }

    const deleteQuestion = (index) => {
        let items = Array.from(questionList);
        items.splice(index, 1)
        setQuestionList(items);
        setSaveUpdatesToAPI((prevState) => prevState + 1);
    }

    const handleOnDragEnd = (result) => {
        const items = Array.from(questionList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setQuestionList(items);
        setSaveUpdatesToAPI((prevState) => prevState + 1);
    }


    useEffect(() => {
        if (saveUpdatesToAPI > 0) {
            fetchRequest(`${process.env.REACT_APP_API_URL}questions/`, "PUT", { questions: JSON.stringify(questionList) })
                .then(result => {

                    if (result.ok) {
                        setQuestionList(JSON.parse(result.data.questions))
                    }
                })
                // .catch(error => history.push("/network-error"))
                .catch(error => setErrorMessage(error.message))
        }
    }, [saveUpdatesToAPI])

    return (
        <div id="quiz-section">
            <div className="error-message">
                {
                    errorMessage ?
                        <ErrorMessage message={errorMessage} type="error" />
                        :
                        null
                }
            </div>
            <div className="section-title">
                <h1>Questions</h1>
                {/* <button onClick={() => displayQuestionForm(true)}><PlusIcon /></button> */}
                <PlusButton clickHandler={() => displayQuestionForm(true)} buttonText="New Question" />
            </div>
            <h4>Drag and drop questions in the list to change the order they show on the Attendance Page.</h4>
            {
                showQuestionForm ?
                    <QuestionForm question={populateQuestionForm()} index={questionToEdit} displayQuestionForm={displayQuestionForm} addQuestionToQuiz={addQuestionToQuiz} updateQuestion={updateQuestion} deleteQuestion={deleteQuestion} />
                    :
                    null
            }
            <div className="card-container">
                {
                    questionList != null && questionList.length > 0 ?
                        /// may need to make the contents of this a list! Using ul and li elements for DragDrop to work... not sure yet.
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="questionList">
                                {(provided) => (
                                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                                        {
                                            questionList.map((question, index) => {
                                                return (
                                                    <Draggable draggableId={question.id} index={index} key={question.id}>
                                                        {(provided) => (<li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}><QuestionCard index={index} question={question} editQuestion={editQuestion} deleteQuestion={deleteQuestion} /></li>)}
                                                    </Draggable>)
                                            })
                                            // <h3>{questionList[0].question}</h3>
                                        }
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                        :
                        <h4>No Questions Found</h4>
                }
            </div>


        </div >
    )
}

export default Quiz;