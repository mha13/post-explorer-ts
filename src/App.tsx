import { useState } from "react";
import "./App.css";
import Phase1Page from "./pages/Phase1Page";
import Phase2Page from "./pages/Phase2Page";
import InterfaceVsTypePage from "./pages/InterfaceVsTypePage";
import PostExplorerPage from "./pages/PostExplorerPage";
import RandomPersonPage from "./pages/RandomPersonPage";

// The set of pages the nav can switch between.
// A union type means TS will error if we ever use a page name that isn't listed.
type Page = "phase1" | "phase2" | "interfaceVsType" | "postExplorer" | "randomPerson";

interface NavItem {
  id: Page;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "phase1", label: "Phase 1 · TS Basics" },
  { id: "phase2", label: "Phase 2 · Typing React" },
  { id: "interfaceVsType", label: "interface vs type" },
  { id: "postExplorer", label: "Post Explorer" },
  { id: "randomPerson", label: "Random Person" },
];

function App() {
  const [page, setPage] = useState<Page>("phase1");

  return (
    <div className="app">
      <nav className="nav">
        <span className="nav__brand">TS Sprint</span>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={page === item.id ? "nav__link nav__link--active" : "nav__link"}
            onClick={() => setPage(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main className="content">
        {page === "phase1" && <Phase1Page />}
        {page === "phase2" && <Phase2Page />}
        {page === "interfaceVsType" && <InterfaceVsTypePage />}
        {page === "postExplorer" && <PostExplorerPage />}
        {page === "randomPerson" && <RandomPersonPage />}
      </main>
    </div>
  );
}

export default App;