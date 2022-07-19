import {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import "./LabTabs.css";
// import CloseIcon from "@mui/icons-material/Close";
import allRoutes from "./data/data";
export default function LabTabs() {
  
  const currentPath = window.location.hash;
  console.log(currentPath)
  const [tabs, setTabs] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
//  function setLocal(val){
//     localStorage.setItem('tabList',JSON.stringify(val));
//     console.log(`local set`);
//   }
//   function getLocal(){
//    return JSON.parse(localStorage.getItem('tabList'))
//   }
  useEffect(() => {
    console.log(currentPath)
    let tabIndex = allRoutes.findIndex((elem) => elem.path === currentPath);

    if (tabIndex!==-1) {
      // let oldData=getLocal();
      // console.log(oldData)
      // let checktabs=oldData.findIndex((elem) => elem.path === allRoutes[tabIndex].path);
      // if(checktabs===-1){
      setTabs([...tabs,allRoutes[tabIndex]]);  
      // }
      
      // setTabs(oldData);
      // setTabs((data) =>{ 
      //   console.log(data);
      //   return [...data, allRoutes[tabIndex]]})
    
    } else {
      console.log(`page not found`);
    }
    setSelectedIndex(tabIndex);
  }, [currentPath, window.location]);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedIndex(newValue);
  };
  useEffect(()=>{
    console.log(`New Massage`)
  },[])

  return (
    <div style={{ margin: `10px 50px` }}>
      <Box sx={{ width: "100%", typography: "body2" }}>
        <TabContext value={String(selectedIndex)}>
          <Box
            className="topBar"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {tabs.map((ele, index) => {
                return <Tab key={index} label={ele.name} value={String(selectedIndex)} />;
              })}
            </TabList>
          </Box>

          {tabs.map((ele, index) => {
            return (
              <TabPanel key={index} value={String(selectedIndex)}>
                {ele.component}
              </TabPanel>
            );  
          })}
        </TabContext>
      </Box>
    </div>
  );
}
