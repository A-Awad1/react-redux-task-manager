import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { togglePriority, toggleShowDone, clearDone } from "~/redux/slices/tasks";

export default function ControlsBar() {
  const dispatch = useDispatch();

  const filters = useSelector((e) => e.tasks.filters);
  const showDone = useSelector((e) => e.tasks.showDone);

  const changePriority = (priority) => (e) =>
    dispatch(togglePriority({ priority, value: e.target.checked }));

  return (
    <section className="controls-bar card">
      <div className="priority-filter">
        {["high", "medium", "low"].map((e) => (
          <div key={e}>
            <input
              type="checkbox"
              id={`filter-${e}`}
              className={`priority ${e}`}
              checked={filters?.[e]}
              onChange={changePriority(e)}
            />
            <label htmlFor={`filter-${e}`}>{e}</label>
          </div>
        ))}
      </div>
      <div className="done-controls">
        <div>
          <input
            type="checkbox"
            id="show-done"
            checked={showDone}
            onChange={(e) => dispatch(toggleShowDone(e.target.checked))}
          />
          <label htmlFor="show-done">show done</label>
        </div>
        <button onClick={() => dispatch(clearDone())}>clear done</button>
      </div>
    </section>
  );
}
