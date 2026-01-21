import { Row } from "react-bootstrap";
import Posts from "./RightSectors/Posts";

export default function RightSector() {
  return (
    <>
      <h1 className="mb-3">Best Hotels on your wish</h1>
      <Posts 
        img='https://cf.bstatic.com/xdata/images/hotel/max1024x768/608301327.jpg?k=9025063c45b43804840037bfea5034f5c981110ee0748075f650421425066aa0&o=' 
        name='Hotel Indigo Kuala Lumpur on the Park by IHG' 
        location='Downtown Kuala Lumpur, Kuala Lumpur' 
        star={5} 
        price='549' 
      /> 
      <Posts 
        img='https://cf.bstatic.com/xdata/images/hotel/max1024x768/774549883.jpg?k=4e014ccfa9e038ac697ea720ce61a17a1103cf697a703fa30aa37d1ea2b2429c&o=' 
        name='The RuMa Hotel and Residences' 
        location='Downtown Kuala Lumpur, Kuala Lumpur' 
        star={5} 
        price='789' 
      />
      <Posts 
        img='https://cf.bstatic.com/xdata/images/hotel/max300/801970709.jpg?k=9820dd863afcd4a5f1f93adc6aad7725637415441b1ba72b1f5c6ac8d5f6a78c&o=' 
        name='Star Executive View KLCC' 
        location='Downtown Kuala Lumpur, Kuala Lumpur' 
        star={5} 
        price='458' 
      />
      <Posts 
        img='https://cf.bstatic.com/xdata/images/hotel/max1024x768/573412516.jpg?k=859cceaf97638ee14ce9f4c3bf99dca99923f0d37c000e715d69b0ed4ac207c4&o=' 
        name='The Majestic Hotel Kuala Lumpur' 
        location='Downtown Kuala Lumpur, Kuala Lumpur' 
        star={5} 
        price='458' 
      />   
      <Posts 
        img='https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20065178-735784f7610627c7c6d5983d58311ea6.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640' 
        name='Sleeping Lion Suites' 
        location='Bukit Bintang, Kuala Lumpur' 
        star={5} 
        price='458' 
      />   
    </>
  );
}