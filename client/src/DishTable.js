import { useState, useEffect } from "react";
import axios from 'axios';


const express_url = 'http://127.0.0.1:3010';

const DishTable = () => {
    const [dish, setDish] = useState([]);
    useEffect(() => {
        getDish();
    }, [])


    const getDish = async() => {
        try{
            const res = await axios.get(express_url);
            setDish(res.data);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <table>
            <thead>
                <tr><th>name</th><th>kind</th><th>price</th></tr>
            </thead>
            <tbody>
                {dish.map((d,i) => <tr key = {i}>
                                         <td>{d.name}</td>
                                         <td>{d.kind}</td>
                                         <td>{d.price}</td></tr>)
                }
            </tbody>
        </table>
    )
}

export default DishTable;
