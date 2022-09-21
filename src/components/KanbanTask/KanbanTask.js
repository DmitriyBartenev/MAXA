import React from "react";
import "./kanbanTask.scss";
import { Draggable } from "react-beautiful-dnd";
import useToggle from "../hooks/useToggleState";
import KanbanEditForm from "../KanbanEditForm/KanbanEditForm";

const KanbanTask = (props) => {
    const [isEditing, toggle] = useToggle(false);

    return (
        <Draggable draggableId={`${props.task.id}`} index={props.index}>
            {(provided) => (
                <div
                    className="kanban-task"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {isEditing ? (
                        <KanbanEditForm
                            color={props.color}
                            editTask={props.editTask}
                            taskId={props.task.id}
                            toggle={toggle}
                            startUser={props.task.user}
                            startText={props.task.text}
                        />
                    ) : (
                        <>
                            <div className="kanban-task__assigned">
                                <span>
                                    {props.task.user}
                                </span>
                            </div>
                            <div className="kanban-task__content">
                                {props.task.text}
                            </div>
                            <div className="kanban-task__options">
                                <button
                                    className="kanban-task__btn-edit"
                                    style={{
                                        backgroundColor: `${props.color}`,
                                    }}
                                    onClick={toggle}
                                >
                                    Edit
                                </button>
                                <button
                                    className="kanban-task__btn-delete"
                                    style={{
                                        backgroundColor: `${props.color}`,
                                    }}
                                    onClick={() =>
                                        props.removeTask(props.task.id)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </Draggable>
    );
};

export default KanbanTask;
