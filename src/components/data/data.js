import Home from "../Home/Home";
import Dashboard from "../dashboard/Dashboard";
import Invoices from "../invoices/Invoices";
import Contacts from "../contacts/Contacts";
import Order from "../orders/Order";

  let locations = [{ id:'1', path: "/",name:"Home", component: <Home/> },{ id:'2', path: "/dashboard", name:"Dashboard", component: <Dashboard/> },{id:'3', path: "/order",name:"Order", component: <Order/> },{ id:'4' , path: "/invoices",name:"Invoices" , component: <Invoices/> },{id:'5' , path: "/contacts", name:"contacts",component: <Contacts/> }]; 
  
export default locations;
