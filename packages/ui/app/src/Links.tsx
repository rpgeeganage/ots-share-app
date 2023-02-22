import { useState, useEffect, type SyntheticEvent } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import AppBar from '@mui/material/AppBar';

import CreateRecord from './CreateRecord';
import CreateFile from './CreateFile';
import Reveal from './Reveal';

const routeMap = new Map<number, string>();
routeMap.set(0, '/text');
routeMap.set(1, '/file');
routeMap.set(2, '/r');

const reverseRouteMap = new Map<string, number>();

routeMap.forEach((v, k) => {
  reverseRouteMap.set(v, k);
});

export function TabMenu() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const [, currentPath] = window.location.pathname.split('/', 2);
    setValue(reverseRouteMap.get(`/${currentPath}`) ?? 0);
  }, []);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(routeMap.get(newValue) ?? '/');
  };

  return (
    <AppBar position="static" color="default">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab value={0} label="Text" id={`tab-${0}`} aria-controls={`tabpanel-${0}`} />
          <Tab value={1} label="File" id={`tab-${1}`} aria-controls={`tabpanel-${1}`} />
          <Tab value={2} label="View" id={`tab-${2}`} aria-controls={`tabpanel-${2}`} />
        </Tabs>
      </Box>
    </AppBar>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<CreateRecord />} />
        <Route path="/r/*" element={<Reveal />} />
        <Route path="/text" element={<CreateRecord />} />
        <Route path="/file" element={<CreateFile />} />
        <Route path="*" element={<CreateRecord />} />
      </Route>
    </Routes>
  );
}
