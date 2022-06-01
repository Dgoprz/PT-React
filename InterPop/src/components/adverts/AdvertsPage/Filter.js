import CheckBox from "../NewAdvertsPage/CheckBox";
import { useEffect, useState } from 'react';
import { Button } from '../../common';
import { getAdvertsTags,getAdvertsFilter } from '../service';


function Filter(props){
  const [value,setValue]=useState({name:'',price:'',price2:''});
  //const [price,setPrice]=useState();
  const [sale,setSale]=useState('');
  const [error, setError] = useState(null);
  const [tgs,setTgs]=useState([]);
  let params="";
  let tags=[];
 
  useEffect(() => {
    getAdvertsTags().then(tgs => setTgs(tgs));
    
  }, []);

   

  const handleCheckTag = event=>{
    if (!tags.includes(event.target.name) && event.target.checked){
      tags.push(event.target.name);
    }
    if (tags.includes(event.target.name) && !event.target.checked){
        tags.splice(tags.indexOf(event.target.name),1);
       
    }
  }

  const handleChange = event => {
    setValue(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    
  };

  const handleSale = event =>{
         setSale(event.target.value);
         
  }



    const handleSubmit = async event => {
        event.preventDefault();

        try {
             params='?';
             
            if(value.name){
                params=`${params}name=${value.name}`;
            }
            if(sale==="true"  || sale==="false"){
                
                if(params.length>1){
                    params=`${params}&sale=${sale}`;
                }else{
                    params=`${params}sale=${sale}`;
                }
            }
            if(value.price){
                if(params.length>1){
                    params=`${params}&price=${value.price}`;
                }else{
                    params=`${params}price=${value.price}`;
                }
            }
            if(value.price2){
                if(params.length>1){
                    params=`${params}&price=${value.price2}`;
                }else{
                    params=`${params}price=${value.price2}`;
                }
            }
            if(tags.length>0){
                if(params.length>1){
                    let tg="";
                    tags.forEach(tag => {
                        tg+=`&tags=${tag}`;
                    });
                    params=`${params}${tg}`;
                }else{
                    let tg="";
                    let sep="";
                    let i=0;
                    tags.forEach(tag => {
                        if(i>0){
                            sep="&"
                        }
                        tg+=`${sep}tags=${tag}`;
                        i++;
                    });
                    params=`${params}${tg}`;
                }
            }
            
        

         if((params.length===1)&&(sale==="todos")){
            params='';
         }

          const adverts = await getAdvertsFilter(params);
          props.arg.setAdverts(adverts);
          if(adverts.length>0){
            props.arg.setResult('true');
          }else{
            props.arg.setResult('false');
          }            

        } catch (error) {
            setError(error);
        }
      };

    return(
        <form className="form-filter" onSubmit={handleSubmit}>
           <input
                type="text"
                name="name"
                value={value.name}
                onChange={handleChange}
                placeholder="Nombre"
                className="input-filter"
                >
            </input>    
            <input
                type="text"
                name="price"
                value={value.price}
                onChange={handleChange}
                placeholder="Precio"
                className="input-filter"
            >
            </input> 
            <input
                type="text"
                name="price2"
                value={value.price2}
                onChange={handleChange}
                placeholder="Precio en rango"
                className="input-filter"
            >
            </input> 

           <br/>
           <div>
           <br/>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="false"
              checked={sale==="false"}
              onChange={handleSale}
            />
            Compra
          </label>
          <label>
            <input
              type="radio"
              value="true"
              checked={sale === "true"}
              onChange={handleSale}
            />
            Venta
          </label>
          <label>
            <input
              type="radio"
              value="todos"
              checked={sale === "todos"}
              onChange={handleSale}
            />
            Todos
          </label>
        </div>
           </div>
           <br/>
           <CheckBox  arg={{handleCheckTag,tgs }}/>
          
         <br/>
         <div className="newAdvertPage-footer">
           <span className="newAdvertPage-characters"></span>
           <Button
             type="submit"
             className="newAdvertPage-submit"
             variant="primary"
             >
             Buscar
           </Button>
         </div>
       </form>
    );
}

export default Filter;