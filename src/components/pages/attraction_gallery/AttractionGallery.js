import React, { Fragment, useState } from "react";
import GalleryList from "./GalleryList";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";

import { addGallery } from "../../../actions/attractionGallery";

import { connect } from "react-redux";

const AttractionGallery = ({ match, addGallery }) => {
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: {}
  });

  const id = match.params.id;

  const { title } = FormData;

  const onChange = e => {
    if (e.target.name === "thumbnail") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    addGallery(formData, id);
  };

  return (
    <Fragment>
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <Form method="post" onSubmit={e => onSubmit(e)}>
              <Card>
                <CardHeader>Upload foto pariwisata</CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">Judul Foto</Label>
                    </Col>
                    <Col md="6">
                      <Input
                        type="text"
                        name="title"
                        onChange={e => onChange(e)}
                        value={title}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">
                        Pilih file foto pariwisata 360
                      </Label>
                    </Col>
                    <Col md="3">
                      <Input
                        type="file"
                        id="file-input"
                        name="thumbnail"
                        onChange={e => onChange(e)}
                      />
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="primary">
                    <i className="fa fa-dot-circle-o" /> Submit
                  </Button>
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Row>
      </div>

      <GalleryList id={id} />
    </Fragment>
  );
};

export default connect(
  null,
  { addGallery }
)(AttractionGallery);
