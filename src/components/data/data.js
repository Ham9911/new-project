import Home from "../Home/Home";
import Dashboard from "../dashboard/Dashboard";
import Invoices from "../invoices/Invoices";
import Contacts from "../contacts/Contacts";
import Order from "../orders/Order";

const allRoutes = [
  { path: "#/home", name: "Home", component: <Home /> },
  { path: "#/dashboard", name: "Dashboard", component: <Dashboard /> },
  { path: "#/order", name: "Order", component: <Order /> },
  { path: "#/invoices", name: "Invoices", component: <Invoices /> },
  { path: "#/contacts", name: "contacts", component: <Contacts /> },
];

export default allRoutes;
