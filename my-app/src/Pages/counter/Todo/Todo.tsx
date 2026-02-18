import { useState } from 'react';
import styles from './Todo.module.css';
import TodoList from '../../../components/TodoList/TodoList';
import TaskBar from '../../../components/Taskbar/TaskBar';

const Todo = () => {
  const [todos, setTodos] = useState<any[]>([]);

  const addTodo = (todo: any) => {
    setTodos([...todos, todo]);
  };

  const removeTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className={styles['todoContainer']}>
      <div>
        <TaskBar addTodo={addTodo} />
      </div>
      <div className={styles['todoList']}>
        <TodoList todos={todos} removeTodo={removeTodo} />
      </div>
    </div>
  );
};

export default Todo;
