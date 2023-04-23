import axios from 'axios';

export type DBData = any[];
export type DBid = string;

export const url = "http://localhost:8080";

export const getDatabase = async () => {
    return await axios.get(url);
}

export const getAllData = async (id: DBid, body: any) => {
    console.log(body);
    return await axios.get(`${url}/${id}`, {params: {
        sorted: body.sorted,
        filterByProperty: !body.filterByProperty || body.filterByProperty==="" ? "id" : body.filterByProperty
    }});
}

export const addRow = async (id: DBid, data: DBData) => {
    return await axios.post(`${url}/addrow/${id}`,data);
}
export const addTable = async (name: string) => {
    return await axios.post(`${url}/addtable/${name}`)
}
export const editRow = async (name: string, id: string, data: DBData) => {
    return await axios.put(`${url}/${name}/${id}`,data);
}
export const deleteRow = async (name: string, id: string) => {
    return await axios.delete(`${url}/${name}/${id}`);
}
export const deleteTable = async (name: string) => {
    return await axios.delete(`${url}/${name}`);
}