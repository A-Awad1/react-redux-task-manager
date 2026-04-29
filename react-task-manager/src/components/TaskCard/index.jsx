import "./index.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask, deleteTask, toggleComplete } from "~/redux/slices/tasks";
import EditIcon from "../svg/EditIcon";
import DeleteIcon from "../svg/DeleteIcon";
import CheckIcon from "../svg/CheckIcon";
import CloseIcon from "../svg/CloseIcon";

export default function TaskCard({ task }) {
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);

  const toggleEdit = () => {
    setTitle(task.title);
    setPriority(task.priority);
    setEditing(!editing);
  };

  const saveEdit = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    dispatch(editTask({ id: task.id, title: trimmed, priority }));
    setEditing(false);
  };

  return (
    <li
      className={`card priority ${task.priority} ${task.completed && "completed"} ${editing && "editing"}`}
    >
      <div>
        <div className="check-box">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch(toggleComplete(task.id))}
          />
          <CheckIcon />
        </div>
        {editing ? (
          <div className="edit-box">
            <textarea value={title} onChange={(e) => setTitle(e.target.value)} rows="1" />
            <div className="radios">
              {["high", "medium", "low"].map((e) => (
                <div key={e} className={`priority ${e}`}>
                  <input
                    type="radio"
                    name={`priority-${task.id}`}
                    id={`upd-${e}-pri`}
                    value={e}
                    checked={priority === e}
                    onChange={() => setPriority(e)}
                  />
                  <label htmlFor={`upd-${e}-pri`}>{e}</label>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>{task.title}</p>
        )}
      </div>
      <div>
        {editing ? (
          <>
            <button onClick={saveEdit}>
              <CheckIcon />
            </button>
            <button onClick={toggleEdit}>
              <CloseIcon />
            </button>
          </>
        ) : (
          <button onClick={toggleEdit}>
            <EditIcon />
          </button>
        )}
        <button className="delete" onClick={() => dispatch(deleteTask(task.id))}>
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
}
