import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {Col, Form, Modal, Table} from 'react-bootstrap';
import './Gestion.css';
import { useEffect, useState } from 'react';


function Gestion() {
    /* declaration of variable for Hide and unhide */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [showInfo, setShowInfo] = useState(false);
    const handleCloseInfo = () => setShowInfo(false);
    const [Info, setInfo] = useState(0);

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);

    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);

    const [showDel, setShowDel] = useState(false);
    const handleCloseDel = () => setShowDel(false);

    const [showDelOk, setShowDelOk] = useState(false);
    const handleCloseDelOk = () => setShowDelOk(false);

    const [showErr, setShowErr] = useState(false);
    const handleCloseErr = () => setShowErr(false);

    /* Stockage Variable */
    const [dataCat,setdataCat] = useState([{'idCat': 0, 'Nom':'Empty'}]);
    const [dataFour,setdataFour] = useState([{'idFour': 0, 'Nom':'Empty'}]);

    const [dataTab,setdataTab] = useState([{'idPlat': 0, 'Libelle': 'Ex', 'Prix': '0.00', 'idCat': 0, 'idFour': 0,}]);
    const [selectData,setselectData] = useState([]);

    function getElemTab(){
        /* Gets all the dishes available */
        fetch('http://localhost:3001/plat',{
            method: 'GET',
            headers: {'Content-type': 'application/json'},
        })
        .then(val => val.json())
        .then(response => {if(response.data.length>0){setdataTab(response.data)}})
    }

    useEffect(() => {
        getElemTab();
          // eslint-disable-next-line
    },[])
    

    function unhiden(){
        document.getElementById("cacher").className = 'unhide red btn btn-fail'
    }

    function hiden(){
        document.getElementById("cacher").className = 'hide red btn btn-fail'
    }

    function affich(x) {
        /* When a dishes is selected show the delete button */
        if(0<selectData.length || x===1){
            unhiden();
        }
        else{
            hiden();
        }
    }

    function handleChange(selectValue){
        /* Handle wich dishes is selected */
        if(selectData.length>0){
            let temp = selectData;
            if((temp).includes(selectValue.target.id)){
                let emplacement = temp.indexOf(selectValue.target.id);
                temp.splice(emplacement,1);
                setselectData(temp);
                affich();
                return;
            }
            temp.push(selectValue.target.id);
            setselectData(temp);
            return;
        }
        setselectData([selectValue.target.id]);
        affich(1);
    }

    function handleUpdate(data){
        /* Handle update on already existing dishes */
        data.preventDefault();
        if(data.target[3].value !== '' && data.target[0].value !== '' && data.target[1].value !== '' && data.target[2].value !== '' ){
            fetch('http://localhost:3001/plat',{ 
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    Prix: data.target[3].value,
                    Libelle:data.target[0].value,
                    idCat: data.target[1].value,
                    idFour: data.target[2].value,
                    idPlat: dataTab[Info].idPlat
                })
            }).then(val => val.json())
            .then(res => {
                /* Refresh the display and hide unhide the appropriate modal */
                getElemTab();
                setShowInfo(false);
                setShowUpdate(true);
            })
            .catch(function (error) {
                console.log(error);
            })
            return;
        }
        else setShowErr(true);
    }

    function getCatego(){
        /* Gets all Catégories */
        fetch('http://localhost:3001/plat/Categorie',{
            method: 'GET',
            headers: {'Content-type': 'application/json'},
        })
        .then(val => val.json())
        .then(response => {if(response.data.length>0){setdataCat(response.data)}})
    }

    function getFourni(){
        /* Gets all fournisseur */
        fetch('http://localhost:3001/plat/Fournisseur',{
            method: 'GET',
            headers: {'Content-type': 'application/json'},
        })
        .then(val => val.json())
        .then(response => {if(response.data.length>0){setdataFour(response.data)}})
    }

    useEffect(() => {
        /* Onload */
        getCatego();
        getFourni();
          // eslint-disable-next-line
    },[])

    function handleSubmit(data){
        /* Handle new dish addition */
        data.preventDefault();
        if(data.target[3].value !== '' && data.target[0].value !== '' && data.target[1].value !== '' && data.target[2].value !== '' ){
            fetch('http://localhost:3001/plat',{ 
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    Prix: data.target[3].value,
                    Libelle:data.target[0].value,
                    idCat: data.target[1].value,
                    idFour: data.target[2].value
                })
            }).then(val => val.json())
            .then(res => {
                 /* Refresh the display and hide unhide the appropriate modal */
                setShow(false);
                setShowAdd(true);
                getElemTab();
            })
            .catch(function (error) {
                console.log(error);
            })
        }
        else setShowErr(true);
    }
    function delPlat(){
        /* Handle deletion of dish */
        fetch("http://localhost:3001/plat", {
            method: 'DELETE',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(selectData),
        })
        .then(res => res.json())
        .then(function(){
             /* Refresh the display and hide unhide the appropriate modal */
            setShowDelOk(false);
            setShowDel(true);
            getElemTab();
        })
    }
    return (
    <>
      <Navbar className='degrade'>
        <Container fluid>
            <Navbar.Brand className='B'>Gestion des plats</Navbar.Brand>
            <div className='d-flex navbar-nav'>
                <Button variant='fail' id='cacher' onClick={() => setShowDelOk(true)} className='red hide'>Supprimer</Button>
                <Button variant="success"  onClick={() =>{setShow(true)}}>Ajouter</Button>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <div id='vanish'>
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Ajout d'un plat
                </Modal.Title>
                </Modal.Header>
            </div>
            <div id='ChangeBody'>
                <Modal.Body>
                    <Form noValidate id="Ajout_Plat" onSubmit={handleSubmit}>
                            <Col sm="12">
                                <Form.Label>Libellé du plat:</Form.Label>
                                <Form.Control type={'text'} name={"Libellé"} required/>
                            </Col>
                            <Col sm="12">
                                <Form.Label>Famille du plat:</Form.Label>
                                <Form.Select name={"Famille"} required>
                                                <option>Veuillez sélectionner une famille de plat</option>
                                                {dataCat.map((Cat,index)=>{
                                                    return(
                                                        <option key={index} value={Cat.idCat}>{Cat.Nom}</option>
                                                    )
                                                })}
                                </Form.Select>
                            </Col>
                            <Col sm="12">
                                <Form.Label>Fournisseur:</Form.Label>
                                <Form.Select name={"Fournisseur"} required>
                                                <option>Veuillez sélectionner un fournisseur</option>
                                                {dataFour.map((Four,index)=>{
                                                    return(
                                                        <option key={index} value={Four.idFour}>{Four.Nom}</option>
                                                    )
                                                })}
                                </Form.Select>
                            </Col>
                            <Col sm="4">
                                <Form.Label>Prix:</Form.Label>
                                <Form.Control type={'number'} className='center' step="0.01" name={"Prix"} placeholder={'0'} required/>
                            </Col>
                            <Col sm="4" className='right'>
                                <Button type="submit" className='buttons'>Envoyer</Button>
                                <Button onClick={handleClose} variant='fail' className='buttons'>Annuler</Button>
                            </Col>
                    </Form>
                </Modal.Body>
            </div>
            </Modal>
            <Modal
                show={showInfo}
                onHide={handleCloseInfo}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Info plat
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form noValidate id="Modif_Plat" onSubmit={handleUpdate}>
                            <Col sm="12">
                                <Form.Label>Libellé du plat:</Form.Label>
                                <Form.Control type={'text'} name={"Libellé"} defaultValue={dataTab[Info].Libelle} required/>
                            </Col>
                            <Col sm="12">
                                <Form.Label>Famille du plat:</Form.Label>
                                <Form.Select name={"Famille"} required>
                                                <option value={dataTab[Info].idCat}>{dataTab[Info].Nom}</option>
                                                {dataCat.map((Cat,index)=>{
                                                    return(
                                                        <option key={index} value={Cat.idCat}>{Cat.Nom}</option>
                                                    )
                                                })}
                                </Form.Select>
                            </Col>
                            <Col sm="12">
                                <Form.Label>Fournisseur:</Form.Label>
                                <Form.Select name={"Fournisseur"} required>
                                                <option value={dataTab[Info].idFour}>{dataTab[Info].FourName}</option>
                                                {dataFour.map((Four,index)=>{
                                                    return(
                                                        <option key={index} value={Four.idFour}>{Four.Nom}</option>
                                                    )
                                                })}
                                </Form.Select>
                            </Col>
                            <Col sm="4">
                                <Form.Label>Prix:</Form.Label>
                                <Form.Control type={'number'} defaultValue={dataTab[Info].Prix} className='center' step="0.01" name={"Prix"} placeholder={'0'} required/>
                            </Col>
                            <Col sm="4" className='right'>
                                <Button type="submit" className='buttons'>Envoyer</Button>
                                <Button onClick={handleClose} variant='fail' className='buttons'>Annuler</Button>
                            </Col>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal
                show={showAdd}
                onHide={handleCloseAdd}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Ajout plat
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h4>Opération réussi !</h4>
                        <p>Le plat a bien été ajouter</p>
                        <Button className='centrePage' onClick={()=> {handleCloseAdd()}}>OK</Button></div>
                </Modal.Body>
            </Modal>
            <Modal
                show={showUpdate}
                onHide={handleCloseUpdate}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Mise a jour plat
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h4>Opération réussi !</h4>
                        <p>Le plat a bien été mise à jour</p>
                        <Button className='centrePage' onClick={() =>{handleCloseUpdate()}}>OK</Button></div>
                </Modal.Body>
            </Modal>
            <Modal
                show={showErr}
                onHide={handleCloseErr}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modification plat
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h4>Erreur !</h4>
                        <p>Il faut remplir tout les champs</p>
                        <Button className='centrePage' onClick={() =>{handleCloseErr()}}>OK</Button></div>
                </Modal.Body>
            </Modal>
            <Modal
                show={showDelOk}
                onHide={handleCloseDelOk}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Supression plat
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h4>Supression !</h4>
                        <p>Etes vous sûre de vouloir supprimer ?</p>
                        <Col sm="3" className='right'>
                            <Button variant='fail' onClick={() =>{handleCloseDelOk()}}>Annulez</Button>
                            <Button className='red' onClick={() => delPlat()}>Supprimer</Button>
                        </Col>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                show={showDel}
                onHide={handleCloseDel}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Supression plat
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h4>Opération réussi !</h4>
                        <p>Le plat a bien été Supprimer</p>
                        <Button className='centrePage' onClick={() =>{handleCloseDel()}}>OK</Button></div>
                </Modal.Body>
            </Modal>
        </Container>
      </Navbar>
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
                            <td><Form.Check type={'checkbox'} onChange={handleChange} id={data.idPlat} /></td>
                            <td>{data.Libelle}</td>
                            <td>{data.FourName}</td>
                            <td>{data.Nom}</td>
                            <td>{data.Prix}</td>
                            <td><Button className='round' onClick={()=>{setInfo(index);setShowInfo(true);}}>/</Button></td>
                        </tr>)
                })
            }
        </tbody>
        </Table>
    </>
    );
  }

export default Gestion;