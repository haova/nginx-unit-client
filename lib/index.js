const axios = require('axios');

module.exports = (config = {}) => {
  const http = axios.create({
    baseURL: 'http://localhost',
    socketPath: config.socketPath || '/var/run/control.unit.sock'
  })

  const handles = {
    async get(path){
      return (await http.get(path)).data;
    },
    
    async put(path, payload){
      return (await http.put(path, JSON.stringify(payload))).data;
    },

    async delete(path){
      return (await http.delete(path)).data;
    },
  }

  const handleWrappers = {};

  for (let name in handles){
    let handle = handles[name];

    handleWrappers[name] = async function(){
      try {
        return await handle.apply(handleWrappers, arguments);
      } catch(err){
        throw new Error(`${err.response.data.error} ${err.response.data.detail || ''}`);
      }
    }
  }

  return handleWrappers;
}