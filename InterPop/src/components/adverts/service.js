import client from '../../api/client';

const baseUrl = '/api/v1/adverts';

export const getLatestAdverts = () => {
  //const url = `${baseUrl}/v1/adverts?_expand=user&_embed=likes&_sort=updatedAt&_order=desc`;
  const url = baseUrl;
  return client.get(url);
};

export const createAdvert = advert => {
  const url = baseUrl;
  return client.post(url, advert);
};

export const getAdvert = advertId => {
  const url = `${baseUrl}/${advertId}`;
  return client.get(url);
};

export const deleteAdvert = advertId =>{
  const url = `${baseUrl}/${advertId}`;
  return client.delete(url);
}

export const getAdvertsTags= ()=>{
  const url = `${baseUrl}/tags`;
  return client.get(url);
}

export const getAdvertsFilter= (params)=>{
  const url = `${baseUrl}${params}`;
  return client.get(url);
}

