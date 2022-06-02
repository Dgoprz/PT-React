import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './Advert.css';

  const Advert = ({createdAt, name, sale, price, tags }) => {
  const typeSale=sale?'venta':'compra';
  return (
    <article className="advert bordered">
     
      <div className="right">
        <div className="advert-header">
          <span className="advert-name">{name} </span>
          <p>
          <span className="advert-tg">{price}€ </span>
          <span className={'advert-tg '+typeSale}>{(sale? 'Venta':'Compra')}</span>
          <br/>
          <time dateTime={createdAt}>
            {formatDistanceToNow(new Date(createdAt))}
          </time>
          </p>
          {tags.map(tag=><span key={tag}>{tag} </span>)} 
         
        </div>
        
      </div>
    </article>
  );
};



export default Advert;
