import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";
import React, { useEffect, useState } from "react";

const StatBox = ({ title, subtitle, icon, progress, increase, count }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = count;
    const duration = 2000; // 2 seconds
    const increment = Math.ceil(end / (duration / 100));

    const timer = setInterval(() => {
      if (start < end) {
        start += increment;
        setDisplayCount(start);
      } else {
        setDisplayCount(end);
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [count]);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {displayCount}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
