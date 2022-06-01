import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';


 function InfoModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 const handleConfirm =()=>{
    setShow(false);
    props.arg.handleOk();    
}


   return (
    <>
      <Button className="nextButton" onClick={handleShow}>
        {props.arg.etiqueta}
      </Button>

      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>¿Esta Seguro?</Modal.Title>
        </Modal.Header>
         <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default InfoModal;