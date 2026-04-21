import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Dashboard } from "./components/Dashboard";
import { IncomeSetup } from "./components/IncomeSetup";
import { BudgetCategories } from "./components/BudgetCategories";
import { ExpenseTracker } from "./components/ExpenseTracker";
import { Analytics } from "./components/Analytics";
import { About } from "./components/About";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "dashboard", Component: Dashboard },
      { path: "income", Component: IncomeSetup },
      { path: "budget", Component: BudgetCategories },
      { path: "expenses", Component: ExpenseTracker },
      { path: "analytics", Component: Analytics },
      { path: "about", Component: About },
      { path: "*", Component: NotFound },
    ],
  },
]);
