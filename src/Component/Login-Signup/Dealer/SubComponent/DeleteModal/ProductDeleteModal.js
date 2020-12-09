import axios from "axios";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function DeleteModal(props) {
  console.log(props);
  const {
    setShowDeleteModal,
    showDeleteModal,
    productId,
    productList,
    setProductList,
  } = props;

  const handleClose = () => {
    setShowDeleteModal(false);
  };

  const confirmDelete = () => {
    axios
      .delete("http://3.137.34.100:3001/dealer/dashboard/product-list", {
        params: { id: productId },
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === 200) {
          // localStorage.removeItem("token");
          // setDealerDatas(response.data.data);
          let newData = productList.filter((data) => data._id != productId);
          // console.log(newData);
          setProductList(newData);
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
        <Modal.Body>Are you want to delete the product</Modal.Body>
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
