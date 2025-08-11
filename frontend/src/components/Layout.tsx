import { ThemeToggleButton } from "@/features/theme";
import { Link, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex justify-between items-center h-10 px-6 py-3 text-foreground backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background border-b border-border/10">
      <div className="logo">
        <Link to="/">Calculator</Link>
      </div>
      <div className="nav">
        <ThemeToggleButton />
      </div>
    </header>
  );
};

const Main = () => {
  return (
    <main className="flex-1">
      <Outlet />
    </main>
  );
};

const Layout = () => {
  return (
    <div className="bg-background text-foreground min-h-screen h-full">
      <Header />
      <Main />
    </div>
  );
};

export default Layout;
