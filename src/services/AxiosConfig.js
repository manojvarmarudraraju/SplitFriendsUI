import axios from 'axios';
export const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 4000,
//     headers: {'reqcomingfrom': 'web','lang':'en','accept':'json','apikey':'ABCD123'}
//   
}
);

export default function setAuthorizationToken(token){
    if(token){
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    }else{
        delete instance.defaults.headers.common['Authorization'];
    }
}