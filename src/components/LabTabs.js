import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import './LabTabs.css'
// import Order from './orders/Order.js'
// import Dashboard from './dashboard/Dashboard';
// import Home from './Home/Home';
// import Invoices from './invoices/Invoices';
// import Contacts from './contacts/Contacts';
import data from './data/data'
export default function LabTabs() {
  const [value, setValue] = React.useState('1');
  let currentPath= window.location.pathname;
  let render=[];
  let render2=[];
  let tabIndex = data.findIndex((elem) => elem.path === currentPath);
   if(tabIndex !==-1){
        render.push(...render,data[tabIndex])
        render2.push(...render,data[tabIndex])
        console.log(render)
        console.log(render2)
    
      }
    else{
      console.log(`page not found`);
    }





  
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  

  return (
    <div style={{margin:`10px 50px`}}>
    <Box sx={{ width: '100%', typography: 'body2'  }}>
      <TabContext value={value}>
        <Box className="topBar" sx={{ borderBottom: 1, borderColor: 'divider', }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {/* <Tab label="Home" value="1" />
            <Tab label="Dashboard" value="2" />
            <Tab label="Orders" value="3" />
            <Tab label="Invoies" value="4" />
            <Tab label="Contacts" value="5" /> */}
            {data.map((ele)=>{
              return(
                <Tab label={ele.name} value={ele.id}/>
              )
            })}
            
          </TabList>
        </Box>
        {/* <TabPanel value="1"><Home/></TabPanel>
        <TabPanel value="2">{data1[1].component}</TabPanel>
        <TabPanel value="3"><Order/></TabPanel>
        <TabPanel value="4"><Invoices/></TabPanel>
        <TabPanel value="5"><Contacts/></TabPanel> */}

        {data.map((ele)=>{
              return(
                <TabPanel value={ele.id}>{ele.component} </TabPanel>
              )
            })}
            
      </TabContext>
    </Box>
    </div>
  );
}