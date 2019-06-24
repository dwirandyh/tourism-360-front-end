import React, { useEffect } from "react";
import { Button, Card, CardBody, CardHeader, Col, Form, Row } from "reactstrap";
import {
  getGalleries,
  deleteGallery
} from "../../../actions/attractionGallery";
import { connect } from "react-redux";

import { API_URL } from "../../../config";

const GalleryList = ({
  id,
  getGalleries,
  deleteGallery,
  galleries: { galleries }
}) => {
  useEffect(() => {
    getGalleries(id);
  }, []);

  const deleteItem = id => {
    deleteGallery(id);
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>Gallery Foto</CardHeader>
            <CardBody>
              <Row>
                {galleries.map(gallery => {
                  return (
                    <Col md="3" className="text-center">
                      <img
                        style={{ marginBottom: "8px", maxHeight: "200px" }}
                        className="img img-fluid"
                        src={`${API_URL}/uploads/${gallery.thumbnail}`}
                      />
                      <p>{gallery.title}</p>
                      <Button
                        color="danger"
                        onClick={e => deleteItem(gallery.id)}
                      >
                        <i className="fa fa-trash" /> Hapus
                      </Button>
                    </Col>
                  );
                })}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = state => ({
  galleries: state.galleries
});

export default connect(
  mapStateToProps,
  { getGalleries, deleteGallery }
)(GalleryList);
