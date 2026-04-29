import "./index.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "~/redux/slices/tasks";

export default function AddForm() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    dispatch(addTask({ title: trimmed, priority }));
    setTitle("");
  };

  return (
    <section className="add-form card">
      <form onSubmit={submit}>
        <div>
          <label htmlFor="title">task title</label>
          <textarea
            name="title"
            id="title"
            placeholder="e.g. Finish reading the book"
            rows="1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="task-priority">priority</label>
          <div>
            <div className="priorities-wrapper">
              {["high", "medium", "low"].map((e) => (
                <div key={e}>
                  <input
                    type="radio"
                    name="priority"
                    id={`${e}-pri`}
                    value={e}
                    checked={priority === e}
                    onChange={() => setPriority(e)}
                  />
                  <label htmlFor={`${e}-pri`} className={`priority ${e}`}>
                    {e}
                  </label>
                </div>
              ))}
            </div>
            <input type="submit" value="+ Add" />
          </div>
        </div>
      </form>
    </section>
  );
}
