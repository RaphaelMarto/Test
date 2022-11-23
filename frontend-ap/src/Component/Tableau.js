import { useEffect, useState } from 'react';
import {Button, Form, Table} from 'react-bootstrap';
import './Tableau.css';

function Tableau(){
    const [dataTab,setdataTab] = useState([{'idPlat': 0, 'Libelle': 'Ex', 'Prix': '0.00', 'idCat': 0, 'idFour': 0,}]);

    function getElemTab(){
        fetch('http://localhost:3001/plat',{
            method: 'GET',
            headers: {'Content-type': 'application/json'},
        })
        .then(val => val.json())
        .then(response => setdataTab(response.data))
    }

    useEffect(() => {
        getElemTab();
          // eslint-disable-next-line
    },[])
    
    return (
        <Table hover className='tab'>
            <thead>
                <tr>
                    <th></th>
                    <th>Nom</th>
                    <th>Fournisseurs</th>
                    <th>Catégorie</th>
                    <th>Prix</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    dataTab.map((data,index) => {
                        return(
                            <tr key={index}>
                                <td><Form.Check type={'checkbox'} id={data.idPlat} /></td>
                                <td>{data.Libelle}</td>
                                <td>{data.Nom}</td>
                                <td>{data.FourName}</td>
                                <td>{data.Prix}</td>
                                <td><Button className='round'>/</Button></td>
                            </tr>)
                    })
                }
            </tbody>
        </Table>
    )
}

export default Tableau;