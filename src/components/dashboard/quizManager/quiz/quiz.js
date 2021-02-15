import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { fetchRequest } from '../../../../utils/fetchRequest';


import QuestionCard from '../questionCard/questionCard';
import QuestionForm from '../questionForm/questionForm';

function Quiz() {

    const [questionList, setQuestionList] = useState();

    const [showQuestionForm, setShowQuestionForm] = useState(false);

    const [questionToEdit, setQuestionToEdit] = useState();

    const [saveUpdatesToAPI, setSaveUpdatesToAPI] = useState(0);

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}questions/`)
            .then((result) => {
                if (result.ok) {
                    setQuestionList(JSON.parse(result.data.questions))
                }
                else {
                    history.push("/notfound");
                    console.log("no group data")
                }
            });
    }, [])

    const displayQuestionForm = (bool) => {
        setShowQuestionForm(bool);
        bool === false ? setQuestionToEdit(null) : null;
    }

    const populateQuestionForm = () => {
        return questionToEdit ? questionList.filter(question => question.index == questionToEdit) : { question: "", yesAction: "None", noAction: "None", index: questionList.length };
    }

    const addQuestionToQuiz = (question) => {
        setQuestionList((prevState) => [
            ...prevState,
            question
        ]);

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
            console.log("**** Sending PUT request to back-end ****")
            fetchRequest(`${process.env.REACT_APP_API_URL}questions/`, "PUT", { questions: JSON.stringify(questionList) })
                .then(result => {
                    console.log("result is", result)
                    if (result.ok) {
                        setQuestionList(JSON.parse(result.data.questions))
                    } else {
                        // the API returned an error - do something with it
                        console.error(data);
                        setErrorMessage("All fields are required.");
                    }
                })
                // .catch(error => history.push("/network-error"))
                .catch(error => console.log(error))
        }
    }, [saveUpdatesToAPI])

    return (
        <div>
            <h1>Questions</h1>
            <button onClick={() => displayQuestionForm(true)}>New Question</button>
            <h4>Drag and drop questions in the list to change the order they show on the Attendance Page.</h4>
            {
                showQuestionForm ?
                    <QuestionForm question={populateQuestionForm()} displayQuestionForm={displayQuestionForm} addQuestionToQuiz={addQuestionToQuiz} />
                    :
                    null
            }
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
                                                <Draggable draggableId={question.question} index={index}>
                                                    {(provided) => (<li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}><QuestionCard question={question} /></li>)}
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


        </div >
    )
}

export default Quiz;