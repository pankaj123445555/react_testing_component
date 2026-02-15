import React from "react";
import styles from "./TodoList.module.css";



const TodoList = ({ todos, removeTodo }:any) => {
    return (
        <div className={styles["todoListContainer"]}>
            <h2>Todo List</h2>
            {todos.length === 0 ? (
                <p>No todo items added yet.</p>
            ) : (
                <ul className={styles["todoList"]}>
                    {todos.map((todo:any, index:number) => (
                        <li key={index} className={styles["todoItem"]}>
                            {todo.todoInput}
                            <button onClick={() => removeTodo(index)}>Remove</button>
                        </li>
                    ))}  
                </ul>
            )}
        </div>
    );
};

export default TodoList;