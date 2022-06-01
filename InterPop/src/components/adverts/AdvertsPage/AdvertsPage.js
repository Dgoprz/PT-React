import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLatestAdverts} from '../service';
import Layout from '../../layout';
import styles from './AdvertsPage.module.css';
import { Button } from '../../common';
import Advert from './Advert';
import Filter from './Filter';

const EmptyList = () => (
  <div style={{ textAlign: 'center' }}>
    <p>Crea el primer anuncio!</p>
    <Button as={Link} to="/adverts/new" variant="primary">
      Crear Anuncio
    </Button>
  </div>
);

function AdvertsPage({ history, ...props }) {
  const [adverts, setAdverts] = useState([]);
  const [result,setResult] = useState('');
  
  
  useEffect(() => {
    getLatestAdverts().then(adverts => setAdverts(adverts));
    
  }, []);
 
 
  return (

    <Layout title="Anuncios" {...props}>
      <div className={styles.advertsPage}>
       
        {adverts.length ? (
          <div>
            <Filter arg={{setAdverts,setResult}} />
            
            <section className="advertsList">
              {adverts.map(({ id, ...advert }) => (
                <div className="articule" key={id}>
                  <Link to={`/adverts/${id}`}>
                    <Advert {...advert} />
                  </Link>
                </div>
              ))}
                        
            </section>
          </div>
        ) : (result===''?
           <div>
            { console.log("Result: ", result)} 
          <EmptyList />
          
          </div>:(
            <div>
              <Filter arg={{setAdverts,setResult}} />
              <br/>
              <h4>No hay resultados para su busqueda..</h4>
            </div>
          )
        )}
        
        
      </div>
    </Layout>
  );
 
}

export default AdvertsPage;
