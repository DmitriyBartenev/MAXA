import React from "react";
import KanbanTask from "../KanbanTask/KanbanTask";
import "./kanbanColumn.scss";
import { Droppable } from "react-beautiful-dnd";

const KanbanColumn = (props) => {
    return (
        <div
            className="kanbanColumn"
        >
            <div>
                <h2 className="kanbanColumn__name">{props.columnData.name}</h2>
                <p className="kanbanColumn__numbers">
                    {props.columnData.taskIds.length} / {props.columnData.limit}
                    
                </p>
                <Droppable droppableId={`${props.columnData.id - 1}`}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            className="kanbanColumn__tasks-container"
                            {...provided.droppableProps}
                        >
                            {props.columnData.taskIds.map((task, index) => {
                                return (
                                    <KanbanTask
                                        key={task.id}
                                        id={task.id}
                                        task={task}
                                        color={props.columnData.color}
                                        index={index}
                                        removeTask={props.removeTask}
                                        editTask={props.editTask}
                                    />
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
            <div className="kanbanColumn__footer">
                <button
                    className="kanbanColumn__btn-add"
                    onClick={() => props.openModal(props.columnData)}
                    disabled={
                        props.columnData.taskIds.length >= 5 ? true : false
                    }
                >
                    Add task
                </button>
            </div>
        </div>
    );
};

export default KanbanColumn;