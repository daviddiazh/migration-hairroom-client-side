import React from "react";
import { Link as LinkRRD } from 'react-router-dom'
import { Box, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GetOut = () => {
  return (
    <Box style={{ margin: "20px 50px" }}>
      <LinkRRD to="/" className="withoutUnderline">
        <Link display="flex" alignItems="center" style={{ cursor: "pointer" }}>
          <ArrowBackIcon />
          <Typography variant="h6">Volver</Typography>
        </Link>
      </LinkRRD>
    </Box>
  );
};

export default GetOut;
