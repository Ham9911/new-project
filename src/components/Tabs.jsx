import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./LabTabs.css";
import { useSelector, useDispatch } from "react-redux";
import { Close as Closebtn } from "@mui/icons-material/";
import { renderTabs, renderAfterDel } from "../store/action";
import { useLocation } from "react-router-dom";
import allRoutes from "./data/data";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      }
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  //   const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const mycurrentState = useSelector((state) => state.setTabs);
  const location = useLocation();
  const currentPath = location.hash;
  console.log(mycurrentState);
  // const [tabs, setTabs] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  // const [toDel,settoDel]=useState('');
  console.log(selectedIndex);
  const comptoDel = (input) => {
    let selected = mycurrentState.filter((ele) => {
      if (ele.id === input) return ele;
    });
    let updatedTabs = mycurrentState.filter((element) => {
      return element.name !== selected[0].name;
    });
    console.log(updatedTabs.length);
    if (updatedTabs.length === 0) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(updatedTabs[updatedTabs.length - 1].id);
    }

    dispatch(renderAfterDel(updatedTabs));
  };

  useEffect(() => {
    let tabIndex = allRoutes.findIndex((elem) => elem.path === currentPath);
    let tabAlreadyexist = mycurrentState.findIndex(
      (ele) => ele.path === currentPath
    );
    if (tabAlreadyexist !== -1) {
      setSelectedIndex(tabAlreadyexist);
    } else {
      if (tabIndex !== -1 && tabAlreadyexist === -1) {
        dispatch(renderTabs(allRoutes[tabIndex]));
      } else {
        console.log(`${currentPath} not found`);
      }
    }
    setSelectedIndex(tabIndex);
  }, [currentPath]);

  useEffect(() => {
    console.log(`New Massage`);
  }, []);
  console.log("currentState", mycurrentState);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    console.log(newValue);
    setSelectedIndex(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
    
          value={Number(selectedIndex)}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {mycurrentState.map((ele, index) => {
            return <Tab label={<span>
                        {ele.name}{" "}
                        <Closebtn onClick={() => comptoDel(ele.id)} />{" "}
                        </span> } key={Number(ele.id)} value={ele.id} />;
          })}
          {/* <Tab label="Items One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      {mycurrentState.map((element, index) => {
        return (
          <>
            <TabPanel
              value={Number(selectedIndex)}
              key={Number(element.id)}
              index={Number(element.id)}
            >
              <element.component />
            </TabPanel>
          </>
        );
      })}
      {/* <TabPanel value={value} index={ele.id}>
        Item One
      </TabPanel> */}
      {/* <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </Box>
  );
}
