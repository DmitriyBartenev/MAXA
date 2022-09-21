import { v4 as uuidv4 } from "uuid";

const taskLimitNumber = 5;

export const columnsRawData = [
    {
        id: 1,
        name: "To do 💪",
        limit: taskLimitNumber,
        color: "#A162D8 ",
        taskIds: [
            {id: uuidv4(),text: "Cook dinner",idColumn: 1,user: "Maria"},
            {id: uuidv4(),text: "Wash the dishes",idColumn: 1,user: "Maria"},
            {id: uuidv4(),text: "Go for a walk", idColumn: 1, user: "Alexander"},
        ],
    },
    {
        id: 2,
        name: "In the process 😩",
        limit: taskLimitNumber,
        color: "#5A9DF9",
        taskIds: [
            {id: uuidv4(), text: "Coding test app", idColumn: 2, user: "Dmitriy"},
            {id: uuidv4(), text: "Don't forget to eat and rest", idColumn: 2, user: 'Dmitriy'}
        ],
    },
    {
        id: 3,
        name: "Done 😴",
        limit: taskLimitNumber,
        color: "#1387BE",
        taskIds: [
            { id: uuidv4(), text: "Gym", idColumn: 3, user: "Pavel" },
            { id: uuidv4(), text: "Eat your yummy breakfast", idColumn: 3, user: "Mikhail" },
        ],
    },
    {
        id: 4,
        name: "Side tasks",
        limit: taskLimitNumber,
        color: "#FF5F6F",
        taskIds: [
            {id: uuidv4(),text: "Check e-mail",idColumn: 4,user: "Gennadiy",},
            { id: uuidv4(), text: "Continue read psychology", idColumn: 4, user: "Peter" },
        ],
    }
];
 