import React, { useEffect, useState } from "react";
import styles from "./TaskBar.module.css"

const TaskBar = ({addTodo}:any) => {
   
    const [todoItems, setTodoItems] = React.useState<any>({});

    const clearTodoItems = () => {
        setTodoItems({});
    };



    return (
        <div>
            <div>
             <label htmlFor="todoInput">Add Todo Item:</label>
             <input
              className={styles["todoInput"]}
                placeholder="Enter todo item"
                type="text"
                id="todoInput"
                name = "todoInput"
                value={todoItems.todoInput|| ""}
                onChange={(e)=>{
                    setTodoItems((prev:any) => ({
                        ...prev,
                        [e.target.name]: e.target.value
                    }));
                }}
             />
            </div>
            <button onClick={()=> {
                addTodo(todoItems);
                clearTodoItems();
            }} className={styles["addbtn"]}>
                Add Todo Item
            </button>
        </div>
    );
};

export default TaskBar;
