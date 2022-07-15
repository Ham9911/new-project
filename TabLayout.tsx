import React, { useEffect } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Tab,
  Tabs,
  Typography,
  withStyles,
  createStyles,
  WithStyles
} from "@material-ui/core";
import { useState } from "react";
import { Close as CloseIcon } from "@material-ui/icons";
import { LayoutRoute } from "../../redux/types";
import { history } from "../../redux/store";
import { AppRoutesStatic } from "../AppRouter";
import {
  makePathStaticWithParams,
  getLayoutRoute
} from "../../helpers/routesHelper";

const styles = (theme: any) =>
  createStyles({
    tabContainer: {
      width: "100%",
      marginBottom: "48px",
      display: "flex",
      flexDirection: "column"
    },
    tabs: {
      Width: "160px",
      minWidth: "100px",
      background: "#fff",
      border: "1px solid rgba(0 0 0 0)",
      borderRadius: "4px 4px 0px 0px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "8px 1px"
    },
    w16: { width: "160px" }
  });

interface TabLayoutProps extends WithStyles<typeof styles> {}

interface TabHeaderProps {
  handleChange: (event: React.ChangeEvent<{}>, newIndex: number) => void;
  selectedTabIndex: number;
  tabRoutes: LayoutRoute[];
  deleteTab: (
    e: any,
    tabRoutes: LayoutRoute[],
    tabRoute: LayoutRoute,
    idx: number,
    isSelected: boolean
  ) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  key: number;
  tab: LayoutRoute;
  isSelected: boolean;
}

const TabHeaders = (props: TabHeaderProps) => {
  const { handleChange, selectedTabIndex, tabRoutes, deleteTab } = props;
  const [ripple, setRipple] = useState(false);

  return (
    <Tabs
      value={selectedTabIndex}
      onChange={handleChange}
      indicatorColor="primary"
      aria-label="simple tabs example"
      variant="scrollable"
      scrollButtons="auto"
    >
      {tabRoutes.map((tabRoute, idx) => (
        <Tab
          key={`Tab-${idx}`}
          label={
            <span>
              {`${tabRoute.label} `}
              <IconButton
                size="small"
                onMouseOver={() => setRipple(true)}
                onMouseLeave={() => setRipple(false)}
                onClick={(e: any) =>
                  deleteTab(
                    e,
                    tabRoutes,
                    tabRoute,
                    idx,
                    selectedTabIndex === idx
                  )
                }
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </span>
          }
          id={`simple-tab-${tabRoute.actualPath}`}
          aria-controls={`simple-tabpanel-${tabRoute.actualPath}`}
          disableRipple={ripple}
        />
      ))}
    </Tabs>
  );
};

const TabPanel = (props: TabPanelProps) => {
  const { children, tab, isSelected } = props;

  return (
    <div
      role="tabpanel"
      hidden={!isSelected}
      id={`simple-tabpanel-${tab.actualPath}`}
      aria-labelledby={`simple-tab-${tab.actualPath}`}
    >
      <Box p={3}>
        <Typography>{children}</Typography>
      </Box>
    </div>
  );
};

const TabLayout = (props: TabLayoutProps) => {
  const { classes } = props;
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(-1);
  const [tabRoutes, setTabRoutes] = useState<LayoutRoute[]>([]);
  const currentPath = history.location.pathname;

  const routeChanged = () => {
    const { staticPath, ids } = makePathStaticWithParams(currentPath);
    let tabIndex = tabRoutes.findIndex((t) => t.actualPath === currentPath);
    if (tabIndex === -1) {
      tabIndex = tabRoutes.length;
      const layoutRoute = getLayoutRoute(AppRoutesStatic, staticPath, ids);

      if (!layoutRoute) {
        console.log(`ERROR: ${currentPath} not found`);
        return;
      }

      layoutRoute.actualPath = currentPath;
      setTabRoutes((layoutRoutes) => [...layoutRoutes, layoutRoute]);
    }
    setSelectedTabIndex(tabIndex);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => routeChanged(), [currentPath, tabRoutes]);

  const handleChange = (event: React.ChangeEvent<{}>, newIndex: number) => {
    event.preventDefault();
    const tabPath = tabRoutes[newIndex].actualPath;
    if (tabPath && tabPath !== currentPath) {
      history.push(tabPath);
    } else {
      console.log(`ERROR: ${tabPath} not found opened tabs`);
    }
  };

  const deleteTab = (
    e: any,
    tabRoutes: LayoutRoute[],
    tabRoute: LayoutRoute,
    idx: number,
    isSelected: boolean
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const filteredTabRoutes = tabRoutes.filter(
      ({ actualPath }) => actualPath !== tabRoute.actualPath
    );

    let i = 0;
    if (isSelected) {
      if (filteredTabRoutes.length) {
        if (idx) {
          if (selectedTabIndex + 1 <= filteredTabRoutes.length) {
            i = selectedTabIndex;
          } else {
            i = selectedTabIndex - 1;
          }
        }
      } else {
        history.push("/");
        i = 0;
      }
      history.push(filteredTabRoutes[i]?.actualPath as string);
    } else {
      routeChanged();
    }

    setTabRoutes(filteredTabRoutes);
  };

  useEffect(() => {
    console.log("currentPath>>> ", currentPath);
    console.log("Location----> ", window.location);
    console.log('====================================');
    console.log("History---> ", history);
    console.log('====================================');
  }, [currentPath]);

  return (
    <div className={classes.tabContainer}>
      <AppBar position="static" color="inherit">
        <TabHeaders
          handleChange={handleChange}
          selectedTabIndex={selectedTabIndex}
          tabRoutes={tabRoutes}
          deleteTab={deleteTab}
        />
      </AppBar>
      {tabRoutes.length ? (
        tabRoutes.map((tab, idx) => (
          <TabPanel key={idx} tab={tab} isSelected={selectedTabIndex === idx}>
            <tab.component
              match={{ params: tab.params }}
              location={history.location}
              history={history}
            />
          </TabPanel>
        ))
      ) : (
        <Typography variant="h5" component="h5">
          No Content to Display
        </Typography>
      )}
    </div>
  );
};

export default withStyles(styles)(TabLayout);
