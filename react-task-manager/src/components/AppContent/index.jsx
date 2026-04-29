import "./index.scss";
import AddForm from "../AddForm";
import ControlsBar from "../ControlsBar";
import TasksList from "../TasksList";

export default function AppContent() {
  return (
    <section className="app-content">
      <h1>
        <span>Task </span>Management
      </h1>
      <AddForm />
      <ControlsBar />
      <TasksList />
    </section>
  );
}
