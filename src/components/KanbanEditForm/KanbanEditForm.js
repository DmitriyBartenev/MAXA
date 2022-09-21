import React from "react";
import useInputState from "../hooks/useInputState";
import "./kanbanEditForm.scss";

const KanbanEditForm = (props) => {
    const [text, handleChangeText] = useInputState(props.startText);
    const [user, handleChangeUser] = useInputState(props.startUser);
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                props.editTask(props.taskId, user, text);
                props.toggle();
            }}
            className="kanban-form"
        >
            <div className="kanban-form__input-container">
                <label htmlFor="user">For: </label>
                <input
                    className="kanban-form__input"
                    type="text"
                    name="user"
                    id="user"
                    value={user}
                    onChange={handleChangeUser}
                    required
                ></input>
            </div>
            <div className="kanban-form__input-container">
                <label htmlFor="task">Task: </label>
                <textarea
                    className="kanban-form__textarea"
                    type="text"
                    value={text}
                    onChange={handleChangeText}
                    name="task"
                    id="task"
                    required
                ></textarea>
            </div>
            <button
                className="kanban-form__form-btn"
                style={{ backgroundColor: `${props.color}` }}
            >
                Submit
            </button>
        </form>
    );
};

export default KanbanEditForm;
