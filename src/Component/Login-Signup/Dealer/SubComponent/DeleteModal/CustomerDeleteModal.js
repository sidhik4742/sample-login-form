import axios from "axios";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function DeleteModal(props) {
  console.log(props);
  const {
    setShowDeleteModal,
    showDeleteModal,
    dealerId,
    dealerData,
    setDealerData,
    dealerDatas,
    setDealerDatas,
  } = props;

  const handleClose = () => {
    setShowDeleteModal(false);
  };

  const confirmDelete = () => {
    axios
      .delete("http://3.137.34.100:3001/admin/dashboard", {
        params: { id: dealerId },
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === 200) {
          // localStorage.removeItem("token");
          // setDealerDatas(response.data.data);
          console.log(typeof dealerData);
          let newData = dealerDatas.filter((data) => data._id != dealerId);
          console.log(newData);
          setDealerDatas(newData);
          setDealerData(newData);
        } else {
          /**
           * TODO: Show the message in the login page
           */
        }
      });
    setShowDeleteModal(false);
  };

  return (
    <div>
      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Are you want to delete the dealer</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteModal;
