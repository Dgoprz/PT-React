import React from 'react';
import './AdvertDetail.css';

  const AdvertDetail = ({name, sale, price, tags, photo }) => {
    
    const path=`http://localhost:3001${photo}` 
    return (
      <article className="adv">
        {photo? 
        <div>
        <img
          src={path}
          alt="Imagen"
          className='fotoDetail'
        />
        </div>:<input id="placeh" placeholder="Imagen no disponible" disabled/>
         }   
        <div className="center">
          <div className="adv">
            <span className="adv-name">{name} </span>
            <p>
            <span className="adv-price">{price}€ </span>
            <span className="adv-venta">{(sale? 'Venta':'Compra')}</span>
            </p>
                      
          </div>
          
        </div>
      </article>
    );
};

export const advertType = {
  //user: T.shape({ name: T.string.isRequired, username: T.string.isRequired })
   // .isRequired,
  //updatedAt: T.string.isRequired,
  //content: T.string,
  //likes: T.array.isRequired,
};

AdvertDetail.propTypes = advertType;

AdvertDetail.defaultProps = {
  content: 'Sin anuncios!',
};

export default AdvertDetail;
