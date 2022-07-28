import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Tab,
  Tabs,
  Typography,
  withStyles,
  createStyles,
  WithStyles,
  Tooltip,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

import { AppRoutesStatic } from "../AppRouter";
import { LayoutRoute } from "../../redux/types";
import {
  makePathStaticWithParams,
  getLayoutRoute,
  validateApiUsage,
} from "../../helpers/routesHelper";
import { decomposeUrlHash } from "../../helpers/globalHelper";
import { selectTab } from "../../redux/reducers/tabRouter/actions";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { getAllowedPaths } from "../../services/api-declaration";

const styles = (theme: any) =>
  createStyles({
    tabContainer: {
      width: "100%",
      marginBottom: "48px",
      display: "flex",
      flexDirection: "column",
    },
    tabsRoot: {
      display: "flex",
      height: theme.spacing(4.5),
      minHeight: theme.spacing(4.5),
    },
    flexContainerTab: {
      height: "100%",
      alignItems: "center",
    },
    tabContent: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    tabLabel: {
      flex: 1,
      fontSize: "10px",
      fontWeight: "bold",
    },
    tabRoot: {
      padding: "0",
      width: "138px",
      minWidth: "138px",
    },
    ellipsisText: {
      fontWeight: "bold",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    titledTabStyle: {
      top: "24px",
      color: "#686868",
      position: "absolute",
      left: theme.spacing(1),
      fontSize: theme.spacing(1),
    },
    untitledTabStyle: {
      top: "-6px",
      flex: "auto 0",
      position: "relative",
      left: theme.spacing(0.5),
    },
    boxRoot: { padding: `${theme.spacing(1.5)}px 0` },
    titleSpacing: { marginBottom: theme.spacing(0.5) },
    tooltipContainer: { padding: `${theme.spacing(0.5)}px 0` },
  });

interface TabRouterProps extends WithStyles<typeof styles> {
  instanceTitle: string;
}

interface TabHeaderProps extends WithStyles<typeof styles> {
  handleChange: (event: React.ChangeEvent<{}>, newIndex: number) => void;
  handleReload: (tabRoute: LayoutRoute) => void;
  selectedTabIndex: number;
  tabRoutes: LayoutRoute[];
  deleteTab: (
    e: any,
    tabRoutes: LayoutRoute[],
    tabRoute: LayoutRoute,
    idx: number,
    selectedTabIndex: number
  ) => void;
}

interface TabPanelProps extends WithStyles<typeof styles> {
  children?: React.ReactNode;
  key: number;
  tab: LayoutRoute;
  isSelected: boolean;
}

const TabHeaders = (props: TabHeaderProps) => {
  const {
    classes,
    handleChange,
    handleReload,
    selectedTabIndex,
    tabRoutes,
    deleteTab,
  } = props;
  const [ripple, setRipple] = useState(false);
  const tooltipContent = (_tabRoute: LayoutRoute) => {
    return (
      <div className={classes.tooltipContainer}>
        <div>
          <span>{_tabRoute.label}</span>
        </div>
        <div className={classes.titleSpacing}>
          <span>{_tabRoute.instanceTitle}</span>
        </div>
      </div>
    );
  };

  return (
    <Tabs
      value={
        selectedTabIndex < tabRoutes.length
          ? selectedTabIndex
          : selectedTabIndex - 1
      }
      onChange={handleChange}
      indicatorColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      className={classes.tabsRoot}
      classes={{ flexContainer: classes.flexContainerTab }}
    >
      {tabRoutes.map((tabRoute, idx, allRoutes) => (
        <Tooltip
          key={idx}
          title={tooltipContent(tabRoute)}
          placement="bottom"
          arrow
        >
          <Tab
            key={`Tab-${idx}`}
            classes={{ root: classes.tabRoot }}
            onDoubleClick={() => handleReload(tabRoute)}
            label={
              <div className={classes.tabContent}>
                <span
                  className={
                    tabRoute.instanceTitle
                      ? clsx(
                          classes.tabLabel,
                          classes.ellipsisText,
                          classes.untitledTabStyle
                        )
                      : classes.tabLabel
                  }
                >
                  {tabRoute.label}
                </span>
                {tabRoute.instanceTitle && (
                  <span
                    className={clsx(
                      classes.tabLabel,
                      classes.ellipsisText,
                      classes.titledTabStyle
                    )}
                  >
                    {tabRoute.instanceTitle}
                  </span>
                )}
                {allRoutes.length !== 1 || tabRoute.path !== "/" ? (
                  <IconButton
                    size="small"
                    onMouseOver={() => setRipple(true)}
                    onMouseLeave={() => setRipple(false)}
                    onClick={(e: any) =>
                      deleteTab(e, tabRoutes, tabRoute, idx, selectedTabIndex)
                    }
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                ) : null}
              </div>
            }
            id={`simple-tab-${tabRoute.actualPath}`}
            aria-controls={`simple-tabpanel-${tabRoute.actualPath}`}
            disableRipple={ripple}
          />
        </Tooltip>
      ))}
    </Tabs>
  );
};

const TabPanel = (props: TabPanelProps) => {
  const { classes, children, tab, isSelected } = props;

  return (
    <div
      role="tabpanel"
      hidden={!isSelected}
      id={`simple-tabpanel-${tab.actualPath}`}
      aria-labelledby={`simple-tab-${tab.actualPath}`}
    >
      <Box p={3} className={classes.boxRoot}>
        <Typography>{children}</Typography>
      </Box>
    </div>
  );
};

const TabRouter = (props: TabRouterProps) => {
  const { classes, instanceTitle } = props;
  const location = useLocation();
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(-1);
  const [tabRoutes, setTabRoutes] = useState<LayoutRoute[]>([]);
  const allowedPathsRef = useRef<string[]>([]);
  const instanceTitleRef = useRef(new Map<string, string>());
  const currentPath = location.pathname;

  const routeChanged = () => {
    const urlMatch = decomposeUrlHash();
    if (urlMatch) {
      const { hashPath, urlSearchParams } = urlMatch;
      const isSameTabFlag = urlSearchParams.get("same_tab");
      const { staticPath, ids } = makePathStaticWithParams(hashPath);
      let tabRoutesClone = tabRoutes;
      let oldTabIndex = -1;

      if (isSameTabFlag) {
        urlSearchParams.delete("same_tab");
       
        tabRoutesClone = tabRoutesClone.filter((_, index) => {
          if (selectedTabIndex !== index) {
            return true;
          }
          oldTabIndex = index;
          return false;
        });
      }
      let tabIndex = tabRoutesClone.findIndex((t) => t.actualPath === hashPath);
      if (tabIndex === -1) {
        tabIndex = tabRoutesClone.length;
        const layoutRoute = getLayoutRoute(AppRoutesStatic, staticPath, ids);
        if (
          !layoutRoute ||
          (allowedPathsRef.current.length &&
            !validateApiUsage(
              allowedPathsRef.current,
              layoutRoute.apiUsage as string[]
            ))
        ) {
          console.log(`ERROR: ${hashPath} not found or unauthorized`);
          return;
        }

        layoutRoute.actualPath = hashPath;
        if (oldTabIndex !== -1) {
          tabIndex = oldTabIndex;
        }
        tabRoutesClone.splice(tabIndex, 0, layoutRoute);
      } else if (isSameTabFlag) {
        tabRoutesClone[tabIndex] = {
          ...tabRoutesClone[tabIndex],
          reload: true,
        };
      }
      if (tabRoutesClone !== tabRoutes) {
        setTabRoutes(tabRoutesClone);
        if (isSameTabFlag) {
          setTimeout(() =>
            setTabRoutes((tabRoutes) =>
              tabRoutes.map((tabRoute) => ({
                ...tabRoute,
                reload: false,
              }))
            )
          );
        }
      }
      setSelectedTabIndex(tabIndex);
    }
  };

  const handleChange = (event: React.ChangeEvent<{}>, newIndex: number) => {
    event.preventDefault();
    const tabPath = tabRoutes[newIndex].actualPath;
    if (tabPath && tabPath !== currentPath) {

    }
  };
  const handleReload = ({ actualPath }: LayoutRoute) => {
    console.log("double clicked", actualPath);
    setTabRoutes((tabRoutes) =>
      tabRoutes.map((tabRoute) => ({
        ...tabRoute,
        reload: tabRoute.actualPath === actualPath,
      }))
    );
    setTimeout(() =>
      setTabRoutes((tabRoutes) =>
        tabRoutes.map((tabRoute) => ({
          ...tabRoute,
          reload: false,
        }))
      )
    );
  };

  const deleteTab = (
    e: any,
    tabRoutes: LayoutRoute[],
    tabRoute: LayoutRoute,
    tabIndex: number,
    selectedTabIndex: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const filteredTabRoutes = tabRoutes.filter(
      ({ actualPath }) => actualPath !== tabRoute.actualPath
    );

    if (filteredTabRoutes.length === 0) {
 
    } else if (tabIndex === selectedTabIndex) {
      const newTabIndex =
        selectedTabIndex < filteredTabRoutes.length
          ? selectedTabIndex
          : selectedTabIndex - 1;
    
    } else {
      routeChanged();
    }

    setTabRoutes(filteredTabRoutes);
  };
  const updateInstanceTitle = () => {
    const existingTitle = instanceTitleRef.current.get(
      tabRoutes[selectedTabIndex].actualPath as string
    );
    if (instanceTitle && existingTitle !== instanceTitle) {
      setTabRoutes((tabRoutes) =>
        tabRoutes.map((tabRoute, index) => {
          if (selectedTabIndex === index) {
            instanceTitleRef.current.set(
              tabRoute.actualPath as string,
              instanceTitle
            );

            return {
              ...tabRoute,
              instanceTitle,
            };
          }
          return tabRoute;
        })
      );
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => routeChanged(), [currentPath, tabRoutes]);
  useEffect(() => {
    var newMap = new Map<string, string>();
    tabRoutes.forEach(({ actualPath }) => {
      const title = instanceTitleRef.current.get(actualPath as string);
      title && newMap.set(actualPath as string, title);
    });
  }, [tabRoutes]);
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updateInstanceTitle(), [instanceTitle, selectedTabIndex]);
  useEffect(() => {
    getAllowedPaths().then((resp) => (allowedPathsRef.current = resp));
  }, []);

  return (
    <div className={classes.tabContainer}>
      <AppBar position="static" color="inherit">
        <TabHeaders
          handleChange={handleChange}
          handleReload={handleReload}
          selectedTabIndex={selectedTabIndex}
          tabRoutes={tabRoutes}
          deleteTab={deleteTab}
          classes={classes}
        />
      </AppBar>
      {tabRoutes.length ? (
        tabRoutes.map((tab, idx) => (
          <TabPanel
            key={idx}
            tab={tab}
            isSelected={selectedTabIndex === idx}
            classes={classes}
          >
            {!tab.reload ? (
              <tab.component
                match={{ params: tab.params }}
     
                subTabIndex={tab.subTabIndex}
              />
            ) : null}
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

export default withStyles(styles)(TabRouter);
