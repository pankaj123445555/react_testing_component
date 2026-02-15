import { useState } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import styles from "./Todo.module.css";

type TodoItem = {
  id: number;
  name: string;
  isCompleted: boolean;
};

const initialData: TodoItem[] = [
  { id: 1, name: "task1", isCompleted: false },
  { id: 2, name: "task2", isCompleted: false },
];

const TodoComponent = () => {
  const [items, setItems] = useState<TodoItem[]>(initialData);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;

    setItems([
      ...items,
      {
        id: Date.now(),
        name: input,
        isCompleted: false,
      },
    ]);
    setInput("");
  };

  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEditStart = (item: TodoItem) => {
    setEditId(item.id);
    setEditValue(item.name);
  };

  const handleEditSave = (id: number) => {
    if (!editValue.trim()) return;

    setItems(
      items.map((item) =>
        item.id === id ? { ...item, name: editValue } : item,
      ),
    );
    setEditId(null);
    setEditValue("");
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditValue("");
  };

  return (
    <div className={styles.container}>
      <h2>Todo List</h2>

      
      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

     
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.listItem}>
            {editId === item.id ? (
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <div className={styles.actions}>
                  <span
                    className={styles.icon}
                    onClick={() => handleEditSave(item.id)}
                  >
                    <FiCheck size={18} />
                  </span>
                  <span className={styles.icon} onClick={handleEditCancel}>
                    <FiX size={18} />
                  </span>
                </div>
              </>
            ) : (
              <>
                <span>{item.name}</span>
                <div className={styles.actions}>
                  <span
                    className={styles.icon}
                    onClick={() => handleEditStart(item)}
                  >
                    <FiEdit2 size={18} />
                  </span>

                  <span
                    className={styles.icon}
                    onClick={() => handleDelete(item.id)}
                  >
                    <FiTrash2 size={18} />
                  </span>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoComponent;
