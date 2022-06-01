import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router';
import Layout from '../../layout';
import { getAdvert,deleteAdvert } from '../service';
import InfoModal from '../../InfoModal';
import AdvertDetail from './AdvertDetail';


const useAdvert = advertId => {
   const [advert, setAdvert] = React.useState(null);

   React.useEffect(() => {
     getAdvert(advertId).then(advert => setAdvert(advert));

    }, []);

   return advert;
 };

function AdvertPage({ match }) {
  const advert = useAdvert(match.params.advertId);
  const [advertDel, setAdvertDel] = useState(null);
  const etiqueta="Borrar";
 
/*const handleBtnDelete = event=>{
  console.log(event.target.id);
  deleteAdvert(event.target.id).then(()=>setAdvertDel(true));
  }*/

const handleOk = ()=>{
  deleteAdvert(match.params.advertId).then(()=>setAdvertDel(true));
}

  if(advertDel){
    return <Redirect to={`/adverts`} />;
  }

  return (
    <Layout title="Detalle del anuncio">
      <AdvertDetail {...advert}/>
      <InfoModal arg={{handleOk,etiqueta}}/>
              
    </Layout>
  );
}


export default AdvertPage;
