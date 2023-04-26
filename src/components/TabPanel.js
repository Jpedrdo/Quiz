import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box sx={{ p: 2 }}>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default TabPanel;

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
