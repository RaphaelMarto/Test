import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {Col, Form, Modal} from 'react-bootstrap';
import './NavBar.css';
import { useState } from 'react';

function NavBar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    function handleSubmit(){

    }
    
    return (
      <Navbar className='degrade'>
        <Container fluid>
            <Navbar.Brand>Gestion des plats</Navbar.Brand>
            <Button variant="outline-success" onClick={() =>{setShow(true)}}>Ajouter</Button>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Ajout d'un plat
            </Modal.Title>
            </Modal.Header>
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
                                            <option value='1'>z</option>
                                            <option value='2'>e</option>
                                            <option value='3'>r</option>
                            </Form.Select>
                        </Col>
                        <Col sm="12">
                            <Form.Label>Fournisseur:</Form.Label>
                            <Form.Select name={"Fournisseur"} required>
                                            <option>Veuillez sélectionner un fournisseur</option>
                                            <option value='1'>z</option>
                                            <option value='2'>e</option>
                                            <option value='3'>r</option>
                            </Form.Select>
                        </Col>
                        <Col sm="4" className='center'>
                            <Form.Label>Prix:</Form.Label>
                            <Form.Control type={'number'} step="0.01" name={"Prix"} placeholder={'0'} required/>
                        </Col>
                        <Col sm="4" className='right'>
                            <Button type="submit" className='buttons'>Envoyer</Button>
                            <Button onClick={handleClose} className='buttons'>Annuler</Button>
                        </Col>
                </Form>
            </Modal.Body>
            </Modal>
        </Container>
      </Navbar>
    );
  }

export default NavBar;