import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import "./LabTabs.css";
import { useSelector, useDispatch } from "react-redux";
import { Close as Closebtn } from "@mui/icons-material/";
import { renderTabs } from "../store/action";
import { useLocation } from "react-router-dom";
import allRoutes from "./data/data";
export default function LabTabs() {
  const dispatch = useDispatch();
  const mycurrentState = useSelector((state) => state.setTabs);
  const location = useLocation();
  console.log(location);
  const currentPath = location.hash;
  console.log(mycurrentState);
  // const [tabs, setTabs] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  // const [toDel,settoDel]=useState('');


  const comptoDel=(input)=>{
      let selected= mycurrentState.filter((ele)=>{
      if(ele.id===input)
      return ele;
    });
    console.log(selected);
    let updated=mycurrentState.filter((element)=>{
      console.log(element.name,selected[0].name)
        return element.name!=selected[0].name;
    });
      dispatch(renderTabs(updated));
  }


  useEffect(() => {
    let tabIndex = allRoutes.findIndex((elem) => elem.path === currentPath);
    console.log(tabIndex);
    let tabAlreadyexist = mycurrentState.findIndex(
      (ele) => ele.path === currentPath
    );
    if (tabAlreadyexist !== -1) {
      setSelectedIndex(tabAlreadyexist);
    } else {
      if (tabIndex !== -1 && tabAlreadyexist === -1) {
        dispatch(renderTabs(allRoutes[tabIndex]));
      } else {
        console.log(`page not found`);
      }
    }

    setSelectedIndex(tabIndex);
  }, [currentPath]);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedIndex(newValue);
  };
  useEffect(() => {
    console.log(`New Massage`);
  }, []);

  return (
    <div style={{ margin: `10px 50px` }}>
      <Box sx={{ width: "100%", typography: "body2" }}>
        <TabContext value={String(selectedIndex)}>
          <Box
            className="topBar"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {mycurrentState.map((ele, index) => {
                return (
                  <Tab
                    key={index}
                    label={<span>{ele.name} <Closebtn onClick={()=>comptoDel(ele.id)}/> </span>}
                    onClick={() => console.log("clicked" + ele.id)}
                    value={String(ele.id)}
                  />
                );
              })}
            </TabList>
          </Box>

          {mycurrentState.map((ele, index) => {
            return (
              <TabPanel key={index} value={String(ele.id)}>
                {ele.component}
              </TabPanel>
            );
          })}
        </TabContext>
      </Box>
    </div>
  );
}
