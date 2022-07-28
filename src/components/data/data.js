import Home from "../Home/Home";
import Dashboard from "../dashboard/Dashboard";
import Invoices from "../invoices/Invoices";
import Contacts from "../contacts/Contacts";
import Order from "../orders/Order";

const allRoutes = [
  {id:0 ,path: "#/", name: "Home", component: <Home /> },
  {id:1 ,path: "#/dashboard", name: "Dashboard", component: <Dashboard /> },
  {id:2 ,path: "#/order", name: "Order", component: <Order /> },
  {id:3 ,path: "#/invoices", name: "Invoices", component: <Invoices /> },
  {id:4 ,path: "#/contacts", name: "contacts", component: <Contacts /> },
];

export default allRoutes;
