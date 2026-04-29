import "./index.scss";
import TaskCard from "../TaskCard";
import { useSelector } from "react-redux";

export default function TasksList() {
  const tasks = useSelector((e) => e.tasks.items || []);
  const filters = useSelector((e) => e.tasks.filters);
  const showDone = useSelector((e) => e.tasks.showDone);

  const filtered = tasks.filter((task) => {
    const priorityCheck = filters ? filters[task.priority] : true;
    const doneCheck = showDone ? true : !task.completed;
    return priorityCheck && doneCheck;
  });

  return filtered.length ? (
    <section className="tasks-list">
      <ul>
        {filtered.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </ul>
    </section>
  ) : (
    <div className="no-tasks-box">No Filtered Tasks</div>
  );
}
