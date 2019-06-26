import Axios from "axios";


var axios = Axios.create({});

axios.interceptors.response.use((response) => {
  return Promise.resolve(response.data);
}, error => {
  return Promise.reject(error);
})

export const Api = {
    // setTableData: (payload) => {
    //     return Axios.post('/table-data-save',payload)
        
    // },
    // setSliderData: (payload) => {
    //     return Axios.post('/save-slider',payload)
        
    // },
    setOtherData: (payload) => {
        return axios.post('/save-other-data',payload)
        
    },
    getData: () => {
        return axios.get('/get-data')
        
    },
    openClickedState: (id) => {
        console.log(">>>>>?????",id)
        return axios.get('/open-clicked-state',{params:{id:id}})
        
    }
}