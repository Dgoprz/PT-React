import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { Button} from '../../common';
import Layout from '../../layout';
import { createAdvert, getAdvertsTags } from '../service';
import { FormField } from '../../common';
import CheckBox from './CheckBox'
import './NewAdvertPage.css';


function NewAdvertPage({ history }) {
 
  const [value, setValue] = useState({ name: '', sale:false, price:0, tags:[], photo:null });
  const [createdAdvertId, setCreatedAdvertId] = useState('');
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tgs, setTgs] = useState([]);
 
   

  useEffect(() => {
    getAdvertsTags().then(tgs => setTgs(tgs));
  }, []);
  

  const handleCheckTag = event=>{
    if (!value.tags.includes(event.target.name) && event.target.checked){
      value.tags.push(event.target.name);
      console.log(value.tags)
    }
    if (value.tags.includes(event.target.name) && !event.target.checked){
        value.tags.splice(value.tags.indexOf(event.target.name),1);
        console.log(value.tags)
    }
  }


 const handleChange = event => {
    setValue(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    //console.log('value handle',value);
  }; 

 const handleChangeSale = event =>{
   
   setValue(prevState => ({
   ...prevState,
    [event.target.name]: event.target.checked,
  }));
 
 };

 const handleChangeImg = event =>{
  setSelectedFile(event.target.files[0]);
  }


  const handleSubmit = async event => {
    event.preventDefault();
    try {
      
        const data = new FormData();
        data.append("name",value.name);
        data.append("sale",value.sale);
        data.append("price",value.price);
        data.append("tags",value.tags);
        if(selectedFile){
           data.append("photo",selectedFile);
        }
                     
      const createdAdvert = await createAdvert(data);
      setCreatedAdvertId(createdAdvert.id);
    } catch (error) {
      
      if (error.status === 401) {
        return history.push('/login');
      }
      setError(error);
    }
  };

  if (createdAdvertId) {
    return <Redirect to={`/adverts/${createdAdvertId}`} />;
  }

  return (
    <Layout title="Nuevo anuncio">
      <div className="newAdvertPage bordered">
        <div className="right">
          <form className="form-filter" onSubmit={handleSubmit}>
           <FormField
              type="text"
              name="name"
              label="Nombre"
              className="input-filter"
              value={value.name}
              onChange={handleChange}
              autofocus
              required
            />
              <FormField
              type="text"
              name="price"
              label="Precio"
              className="input-filter"
              value={value.price}
              onChange={handleChange}
              required
              />
              <br/>
               <label>
                    Imagen:
                   <input 
                   name="photo"
                   type="file" 
                   onChange={handleChangeImg}
                   />
               </label>
              <div>
              <br/>
                <label>
                <input
                  name="sale"
                  type="checkbox"
                  variant="primary"
                  onChange={handleChangeSale}
                  checked={value.sale}
                  /> 
                  Seleccione si es una venta
                  </label>
              </div>
              <br/>
              
              <CheckBox  arg={{handleCheckTag, tgs}}/>

            <br/>
            <div className="newAdvertPage-footer">
              <span className="newAdvertPage-characters"></span>
              <Button
                type="submit"
                className="newAdvertPage-submit"
                variant="primary"
                >
                Crear Anuncio
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default NewAdvertPage;
