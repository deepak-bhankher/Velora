import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Drop this once inside <BrowserRouter>, above <Routes>.
// React Router doesn't reset scroll on navigation by default —
// this fixes it globally so every page opens from the top.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}