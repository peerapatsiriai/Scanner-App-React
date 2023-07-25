// ** React Imports
import { useState } from 'react';
import { Link } from 'react-router-dom';

// ** MUI Imports
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Grid } from '@mui/material';

const MemuSelect = () => {
  // ** State
  const [value, setValue] = useState('1');

  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
    >
      <Grid
        item
        xs={12}
        sx={{ mt: '15vh', mb: '25px', display: 'flex', justifyContent: 'center' }}
      >
        <Typography variant='h5'>เลือกเมนู</Typography>
      </Grid>
      {/* การ์ด 1 */}
      <Grid
        item
        xs={12}
        md={6}
      >
        <Card sx={{ width: 'auto' }}>
          <TabContext value={value}>
            <TabList
              centered
              onChange={handleChange1}
              aria-label='Scaner Test'
            >
              <Tab
                value='1'
                label='Scaner Page'
              />
              <Tab
                value='2'
                label='Table'
              />
            </TabList>
            <CardContent sx={{ textAlign: 'center' }}>
              <TabPanel
                value='1'
                sx={{ p: 0 }}
              >
                <Typography
                  variant='h6'
                  sx={{ marginBottom: 2 }}
                >
                  Scaner
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ marginBottom: 4, display: 'flex', justifyContent: 'center' }}
                >
                  <CardMedia
                    component='img'
                    sx={{ height: '10rem', width: '10rem' }}
                    image='https://static.vecteezy.com/system/resources/previews/005/893/053/original/barcode-search-icon-barcode-scanner-symbol-isolated-on-a-white-background-free-vector.jpg'
                    alt='glass-house'
                  />
                </Typography>
                <Link
                  to='/BarcodeScanner'
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    variant='contained'
                    color='primary'
                  >
                    เลือก
                  </Button>
                </Link>
              </TabPanel>
              <TabPanel
                value='2'
                sx={{ p: 0 }}
              >
                <Typography
                  variant='h6'
                  sx={{ marginBottom: 2 }}
                >
                  Item List
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ marginBottom: 4, display: 'flex', justifyContent: 'center' }}
                >
                  <CardMedia
                    component='img'
                    sx={{ height: '10rem', width: '10rem' }}
                    image='https://cdn-icons-png.flaticon.com/512/7604/7604036.png'
                    alt='glass-house'
                  />
                </Typography>
                <Link
                  to='/list'
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    variant='contained'
                    color='primary'
                  >
                    เลือก
                  </Button>
                </Link>
              </TabPanel>
            </CardContent>
          </TabContext>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MemuSelect;
