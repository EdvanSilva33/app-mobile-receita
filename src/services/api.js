import axios from "axios";

/*
Para roda escolha o IPV4: json-server --watch -d 180 --host 192.168.1.4 db.json
coloca tudo no cmd
*/

const api = axios.create({
    baseURL:"http://192.168.1.4:3000"
})

export default api;