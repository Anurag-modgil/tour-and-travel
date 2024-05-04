import React, { useEffect, useState } from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import client from '../api/client';
import { useCurrency } from '../context/currency';
const styles = {
    container: {
      position: 'fixed',
      maxHeight: 'calc(100vh - 100px)', 
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'white',
      padding: '20px',
      zIndex: '60',
    },
  };
function CurrencySelector({symbol}) {
  const [dropdown, setDropdown] = useState(false)
  const [rates, setRates] = useState([])
  const { setSelectedCurrency } = useCurrency();
  const handleChangeCurrency = (currency) => {
    setSelectedCurrency(currency);
  };
  useEffect(() => {
    client.get('/convert').then((r)=>{
        const array = Object.entries(r.data).map(([currency, rate]) => ({
            currency, rate
        }))
        
        setRates(array)
    })
 
  },[])
  return (
    <Box  sx={{cursor:"pointer"}}>
  {!dropdown &&  <IconButton onClick={()=>setDropdown(true)} sx={{ fontSize: 14, letterSpacing:1 }}>{symbol}</IconButton>}
    {dropdown &&  <Box borderRadius={5} sx={{overflowY:"scroll"}} width="80%" style={styles.container}>
          <Grid display="flex" justifyContent="space-between" marginBottom={2}>
          <Typography variant="h6" fontWeight="bold" color="black">Choose currency</Typography>
          <IconButton  sx={{color:"gray"}}><Close  onClick={()=>setDropdown(false)}/></IconButton>
          </Grid>
         <Grid maxWidth borderRadius={5} container>
          {(rates && rates.length > 0) ? rates.map((rate)=>{
            return <Typography component={Grid} item xs={12} md={3} marginBottom={4} color="black" onClick={()=>handleChangeCurrency(rate.currency)}>{rate.currency}</Typography>
          }) : <Typography color="black">Fetching currencies....</Typography>}
      </Grid>
    </Box>}
    </Box>
  );
}

export default CurrencySelector;
