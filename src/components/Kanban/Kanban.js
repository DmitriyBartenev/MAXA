import { useEffect, useState } from "react";
import { columnsRawData } from "../KanbanData/KanbanData";
import KanbanColumn from "../KanbanColumn/KanbanColumn";
import "./kanban.scss";
import KanbanModal from '../KanbanModal/KanbanModal';
import { DragDropContext } from "react-beautiful-dnd";

const Kanban = () => {
    const [columns, setColumns] = useState(
        JSON.parse(window.localStorage.getItem("columns")) || columnsRawData
    );
    const [modal, setModal] = useState(false);
    
    

    const onDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) {
            console.log("no destination");
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            console.log("index and destination the same");
            return;
        }

        const start = columns[source.droppableId];
        const finish = columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);

            const swapTask = newTaskIds[source.index];
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, swapTask);

            const newColumnsState = columns.map((c) => {
                if (c.id === start.id) {
                    c.taskIds = newTaskIds;
                    return c;
                } else return c;
            });

            const newColumnsState2 = [...newColumnsState];
            setColumns(newColumnsState2);
        } else {
            if (finish.taskIds.length < finish.limit) {
                const startTaskIds = Array.from(start.taskIds);
                const [item] = startTaskIds.splice(source.index, 1);

                const finishTaskIds = Array.from(finish.taskIds);
                finishTaskIds.splice(destination.index, 0, item);

                const newColumnsState = columns.map((c) => {
                    if (c.id === start.id) {
                        c.taskIds = startTaskIds;
                        return c;
                    } else if (c.id === finish.id) {
                        c.taskIds = finishTaskIds;
                        return c;
                    } else return c;
                });
                const newColumnsState2 = [...newColumnsState];
                setColumns(newColumnsState2);
            } else return;
        }
    };

    const openModal = (data) => {
        const columnId = data.id;
        setModal(columnId);
    };

    const closeModal = () => {
        setModal(false);
    };

    const addTask = (newTask) => {
        setModal(false);
        const updatedColumns = columns.map((column) => {
            if (column.id === newTask.idColumn && column.taskIds.length < 5) {
                column.taskIds.push(newTask);
                return column;
            } else return column;
        });
        setColumns(updatedColumns);
    };

    /* const addColumn = () => {
        const newColumn = {
            id: uuidv4(),
            name: 'New column',
            limit: props.taskLimitNumber,
            color: "#5A9DF9",
            taskIds:[]
        }
        setColumns(()=>{
            const newColumns = [...columns, newColumn];
            return newColumns;
        })
        
    } */

    const removeTask = (taskId) => {
        const updatedColumns = columns
            .map((column) => {
                return Object.assign({}, column, {
                    taskIds: column.taskIds.filter(
                        (task) => task.id !== taskId
                    ),
                });
            })
            .filter((column) => column.taskIds.length >= 0);
        setColumns(updatedColumns);
    };

    const editTask = (taskId, newUser, newText) => {
        const updatedColumns = columns.map((column) => {
            return Object.assign({}, column, {
                taskIds: column.taskIds.map((task) => {
                    if (task.id === taskId) {
                        task.user = newUser;
                        task.text = newText;
                        return task;
                    }
                    return task;
                }),
            });
        });
        setColumns(updatedColumns);
    };

    useEffect(() => {
        window.localStorage.setItem("columns", JSON.stringify(columns));
    }, [columns]);

    return (
        <main>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="kanban">
                    {modal && (
                        <KanbanModal
                            closeModal={closeModal}
                            addTask={addTask}
                            columnData={modal}
                        />
                    )}
                    <div className="kanban__columns-container">
                        {columns.map((c) => {
                            return (
                                <KanbanColumn
                                    columnData={c}
                                    key={c.name}
                                    openModal={openModal}
                                    removeTask={removeTask}
                                    editTask={editTask}
                                />
                            );
                        })}
                    </div>
                </div>
            </DragDropContext>
        </main>
    );
};

export default Kanban;
