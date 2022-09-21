import React from "react";
import "./kanbanModal.scss";
import useInputState from "../hooks/useInputState";
import { v4 as uuidv4 } from "uuid";

const KanbanModal = (props) => {
    const [text, handleChangeText] = useInputState("");
    const [user, handleChangeUser] = useInputState("");

    const idColumn = props.columnData;

    const newTask = {
        id: uuidv4(),
        text: text,
        idColumn: idColumn,
        user: user,
    };

    return (
        <div className="kanban-modal">
            <section className="kanban-modal__content">
                <span
                    className="kanban-modal__close-btn"
                    onClick={props.closeModal}
                >╳</span>
                <form
                    className="kanban-modal__form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        props.addTask(newTask);
                    }}
                >
                    <div className="kanban-modal__input-container">
                        <label htmlFor="user"></label>
                        <input
                            className="kanban-modal__input"
                            type="text"
                            name="user"
                            id="user"
                            value={user}
                            onChange={handleChangeUser}
                            placeholder="For..."
                            required
                        ></input>
                    </div>
                    <div className="kanban-modal__input-container">
                        <label htmlFor="task"></label>
                        <textarea
                            className="kanban-modal__input-area"
                            type="text"
                            value={text}
                            onChange={handleChangeText}
                            name="task"
                            id="task"
                            placeholder="Task..."
                            required
                        ></textarea>
                    </div>
                    <button className="kanban-modal__input-submit-btn">
                        Submit
                    </button>
                </form>
            </section>
        </div>
    );
};

export default KanbanModal;
