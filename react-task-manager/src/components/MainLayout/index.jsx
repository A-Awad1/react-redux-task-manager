import AppContent from "../AppContent";
import "./index.scss";

export default function MainLayout() {
  return (
    <section className="layout">
      <div className="container">
        <AppContent />
      </div>
    </section>
  );
}
