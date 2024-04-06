import Wrapper from "../../layouts/Wrapper"
import { useEffect, useState } from "react"
import client from '../../api/client'
import { Container, Box, Typography, Stack, Button } from "@mui/material"
import { Slider, Quality, Package } from "../../components"
import { content } from "../../utils/helpers"
import background from '../../assets/background.jpg'
import {CustomImageList, Filter} from "../../components"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import { Link,useNavigate } from "react-router-dom"
import Plane from '../../assets/plane.webp'
import Price from '../../assets/prices.png'
import Support from '../../assets/support.png'
import Calender from '../../assets/calender.webp'
import Train from '../../assets/train.jpg'
import America from '../../assets/america.webp'
import Bridge from '../../assets/bridge.jpg'
export default function LandingPage(){
  const navigate = useNavigate()
  const [data,setData] = useState([])
  const [referrals, setReferrals] = useState([])
  const combined = [...data, ...referrals]
  async function getPackages(){
      await client.get('/find').then((response)=>{
           setData(response.data)
      })
    }
  async function getReferrals(){
    await client.get('/find/referrals').then((response)=>{
      setReferrals(response.data)
    })
  }
  useEffect(()=>{
      getPackages()
      getReferrals()
  },[data,referrals])
    return (
        <Wrapper>
        <Slider images={content}/>
        <Box sx={{height:"40vh",backgroundColor:"#2196f3",display:"flex", flexDirection:{xs:"column",md:"row"},justifyContent:"space-around", alignItems:"center"}}>
          <Quality src={Plane} alt="destinations" title="500+ DESTINATIONS" caption="Morbi leo risus, porta ac"/>
          <Quality src={Price} alt="prices" title="BEST PRICE GUARANTEE" caption="Morbi leo risus, porta ac"/>
          <Quality src={Support} alt="support" title="GREAT CUSTOMER" caption="Morbi leo risus, porta ac"/>
          <Quality src={Calender} alt="bookings" title="SUPER FAST BOOKING" caption="Morbi leo risus, porta ac"/>
        </Box>

        
        <Box sx={{backgroundImage:`url(${background})`, backgroundPosition:"center", backgroundSize:"cover"}}>
          <Container maxWidth sx={{backgroundColor: 'rgba(0, 0, 0, 0.9)', paddingY:15, color:"whitesmoke",width:"100%"}}>
          <Filter/>
        </Container>
     
        <Container maxWidth sx={{backgroundColor: 'rgba(0, 0, 0, 0.7)',paddingY:"50px"}}>
            <Typography sx={{marginBottom:"40px"}} fontSize="large" fontWeight="bold" color="whitesmoke">Popular Tour Packages / <Link style={{color:"#2196f3", textDecoration:"none"}} to="/packages">View All Tours</Link></Typography>
           
            <Stack direction="row" spacing={2} sx={{display:"flex",flexDirection:{xs:"column",sm:"row"}, justifyContent:"start",alignItems:"center",cursor:"pointer"}}>
            {combined && combined.length > 3 && <KeyboardArrowLeft sx={{backgroundColor:"#2196f3", padding:2, color:"whitesmoke", display:{xs:"none",sm:"block"}}}/>}
            {combined && combined.length > 0 && combined.map((item)=>{
                    return <Package id={item._id} link={item.link} price={item.price} location={item.location} title={item.title} duration={item.duration} image={item.poster}/>
                })}
             {/* <Package image={Train}/>
             <Package image={America}/>
             <Package image={Bridge}/> */}
             {combined && combined.length > 3 && <KeyboardArrowRight sx={{backgroundColor:"#2196f3", padding:2, color:"whitesmoke", display:{xs:"none",sm:"block"}}}/>}
            </Stack>

        </Container>

        </Box>
     
        <Container maxWidth sx={{paddingY:"40px",backgroundColor:"white"}}>
            <Typography fontWeight="bold" variant="h6" lineHeight={2}>Popular Destinations / <Link style={{color:"#2196f3", textDecoration:"none"}} to="/packages">View All Destinations</Link></Typography>
            <Typography color="#8c8c8c" lineHeight={2}>Dive into a treasure trove of enchanting locales, each offering a unique tapestry of culture, adventure, and natural beauty. From iconic landmarks to hidden gems, embark on a virtual journey with us as we showcase the destinations that capture the hearts and imaginations of travelers worldwide. </Typography>
        </Container>
        <CustomImageList/>
        </Wrapper>
    )
}