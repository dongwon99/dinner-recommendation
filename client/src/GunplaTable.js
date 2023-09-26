import { useState, useEffect } from "react";
import axios from 'axios';


const express_url = 'http://127.0.0.1:3010';

const GunplaTable = () => {
    const [gunpla, setGunpla] = useState([]);
    useEffect(() => {
        getGunpla();
    }, [])


    const getGunpla = async() => {
        try{
            const res = await axios.get(express_url);
            setGunpla(res.data);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <table>
            <thead>
                <tr><th>name</th><th>model</th><th>grade</th><th>title</th><th>boxart</th></tr>
            </thead>
            <tbody>
                {gunpla.map((g,i) => <tr key = {i}>
                                         <td>{g.name}</td>
                                         <td>{g.model}</td>
                                         <td>{g.grade}</td>
                                         <td>{g.title}</td>
                                         <td><img src={`https://picsum.photos/70?random=${i}`} alt='gunpla' />{g.boxart}</td></tr>)}
            </tbody>
        </table>
    )
}

export default GunplaTable;
