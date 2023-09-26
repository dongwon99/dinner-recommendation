import {useState } from 'react';
import { Typography, Box, Button, createTheme, Checkbox, FormGroup,FormControlLabel,FormControl,FormLabel } from '@mui/material';
import { ThemeProvider } from "@emotion/react";
import './Main.css';
import axios from 'axios';


const express_url = 'http://127.0.0.1:3010/';
const public_url = 'C:/zzal/db_final';
const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    black: {
      main: '#000000'
    }
  },
});

//const full_taste

const Main = () => {
  const [menu, setMenu] = useState([]);
  const getMenu = async() =>{
    try{
      var query_url = express_url+"dish?"
      var kind_url = '';
      var flavor_url = '';
      var way_url = '';

      taste.map(t => {if(t.substring(t.length-1, t.length) == '식'){kind_url = kind_url + "'" + t + "'," }})
      taste.map(t => {if(t.substring(t.length-1, t.length) == '맛'){flavor_url = flavor_url + "'" + t + "'," }})
      taste.map(t => {if(t.substring(t.length-1, t.length) == '기'){way_url = way_url + "'" + t + "'," }})

      kind_url = kind_url.substring(0, kind_url.length-1);
      flavor_url = flavor_url.substring(0, flavor_url.length-1);
      //way_url = way_url.substring(0, way_url.length-1);

      if(kind_url.length == 0){kind_url="'한식','중식','일식','양식','분식'"}
      if(flavor_url.length == 0){flavor_url="'단맛','짠맛','고소한맛','매운맛','느끼한맛'"}
      if(way_url.length == 0){way_url="'굽기','삶기','찌기','볶기','튀기기' "}

      query_url = query_url+"kind="+kind_url+"&flavor="+flavor_url+"&way="+way_url;
      query_url = query_url.substring(0, query_url.length-1);

      console.log(query_url);
      console.log(public_url+`\%{m.img}`);

      const res = await axios.get(query_url);
      setMenu(res.data);
    }
    catch(err){
      console.log(err);
    }
  }

  const [taste, setTaste] = useState([]);
  function changeTaste(checked, id) {
    if (checked) {
      setTaste([...taste, id]);
    }
    else {
      setTaste(taste.filter((el) => el !== id));
    }
  }
  return (
    <>
      <Box sx={{ width: '100%'}}>
        <Typography variant="h1" component ="div" gutterBottom align="center" sx={{mt:3}}> 저.메.추</Typography>
      </Box>
      
      <Box 
        component="div"
        sx={{position: 'absolute', top:180,left:1000, p:25,
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
          color: (theme) => theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          overflow: 'auto',
          width:600, height:455,
          px : 3, py : 3
        }}
      >
        <Typography variant="h5" component ="div" gutterBottom align="left" sx={{mt:3}}> 결과</Typography>
        <table>
            <thead>
                <tr><th>음식</th><th>종류</th><th>가격대</th><th>사진</th></tr>
            </thead>
            <tbody>
                {menu.map((m,i) => <tr key = {i}>
                                         <td>{m.name}</td>
                                         <td>{m.kind}</td>
                                         <td>{m.price}</td>
                                         <td><img src={`img/%{m.img}`} alt={m.img}/></td>
                                         </tr>)
                }
            </tbody>
        </table>
      </Box>

      <Box
        component="div"
        sx={{position: 'absolute', top:180, left:300,p:25,
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
          color: (theme) => theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          overflow: 'auto',
          px: 10, py:19
        }}
      >
        <FormControl > 
          <FormLabel sx={{fontWeight: '700'}}>음식 종류</FormLabel> 
          <FormGroup aria-label="position" row>
            <FormControlLabel control={<Checkbox name="kind" value="한식" onChange={(e)=>{ changeTaste(e.currentTarget.checked, '한식')}}/>} label="한식" labelPlacement="start"/>
            <FormControlLabel control={<Checkbox name="kind" value="일식" onChange={(e)=>{ changeTaste(e.currentTarget.checked, '일식')}}/>} label="일식" labelPlacement="start"/>
            <FormControlLabel control={<Checkbox name="kind" value="중식" onChange={(e)=>{ changeTaste(e.currentTarget.checked, '중식')}}/>} label="중식" labelPlacement="start"/>
            <FormControlLabel control={<Checkbox name="kind" value="양식" onChange={(e)=>{ changeTaste(e.currentTarget.checked, '양식')}}/>} label="양식" labelPlacement="start"/>
            <FormControlLabel control={<Checkbox name="kind" value="분식" onChange={(e)=>{ changeTaste(e.currentTarget.checked, '분식')}}/>} label="분식" labelPlacement="start"/> 
          </FormGroup> 

          <FormLabel sx={{fontWeight: '700'}}>음식 맛</FormLabel> 
          <FormGroup aria-label="position" row>
            <FormControlLabel control={<Checkbox name="flavor" value="단맛" onChange={e => {changeTaste(e,'단맛')}}/>} label="단맛" labelPlacement="start" />
            <FormControlLabel control={<Checkbox name="flavor" value="짠맛" onChange={(e)=>{ changeTaste(e.currentTarget.checked, '짠맛')}}/>} label="짠맛" labelPlacement="start"/>
            <FormControlLabel control={<Checkbox name="flavor" value="매운맛" onChange={(e)=>{ changeTaste(e.currentTarget.checked, '매운맛')}}/>} label="매운맛" labelPlacement="start" /> 
            <FormControlLabel control={<Checkbox name="flavor" value="느끼한맛" onChange={(e)=>{ changeTaste(e.currentTarget.checked, '느끼한맛')}}/>} label="느끼한맛" labelPlacement="start"/>
            <FormControlLabel control={<Checkbox name="flavor" value="고소한맛" onChange={(e)=>{ changeTaste(e.currentTarget.checked, '고소한맛')}}/>} label="고소한맛" labelPlacement="start"/> 
          </FormGroup> 

          <FormLabel sx={{fontWeight: '700'}}>조리 방식</FormLabel> 
          <FormGroup aria-label="position" row>
            <FormControlLabel control={<Checkbox name="way" value="삶기" onChange={(e)=>{ changeTaste(e.currentTarget.checked, '삶기')}}/>} label="삶기" labelPlacement="start"/> 
            <FormControlLabel control={<Checkbox name="way" value="굽기" onChange={(e)=>{ changeTaste(e.currentTarget.checked, '굽기')}}/>} label="굽기" labelPlacement="start"/> 
            <FormControlLabel control={<Checkbox name="way" value="찌기" onChange={(e)=>{ changeTaste(e.currentTarget.checked, '찌기')}}/>} label="찌기" labelPlacement="start"/> 
            <FormControlLabel control={<Checkbox name="way" value="볶기" onChange={(e)=>{ changeTaste(e.currentTarget.checked, '볶기')}}/>} label="볶기" labelPlacement="start"/> 
            <FormControlLabel control={<Checkbox name="way"value="튀기기"onChange={(e)=>{ changeTaste(e.currentTarget.checked, '튀기기')}}/>} label="튀기기" labelPlacement="start"/> 
          </FormGroup> 
        </FormControl>
      </Box>


      <Box>
        <ThemeProvider theme={theme}>
          <Button variant="outlined" color ="black" size="large" onClick={getMenu}
            sx ={{width:200, height:100, fontSize:50, backgroundColor:'white', mt:70}}>
          뽑기</Button>
        </ThemeProvider>
      </Box>
    </>
  );
};

export default Main;

