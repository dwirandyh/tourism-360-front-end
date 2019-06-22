import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { API_URL } from "../../../config";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  addAttraction,
  getAttraction,
  updateAttraction,
  cleanAttractionState
} from "../../../actions/attraction";
import { getAllCategories } from "../../../actions/category";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Form
} from "reactstrap";
import TextHtml from "../../common/TextHtml";

const AttractionForm = ({
  match,
  addAttraction,
  getAttraction,
  updateAttraction,
  getAllCategories,
  allCategories,
  cleanAttractionState,
  attraction: { attraction, loading },
  history
}) => {
  const id = match.params.id;
  const formTitle = id != null ? "Edit Tempat Wisata" : "Tambah Tempat Wisata";

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    shortDescription: "",
    latitude: "",
    longitude: "",
    thumbnail: {}
  });

  useEffect(() => {
    getAllCategories();

    if (id != null) {
      getAttraction(id);
    } else {
      cleanAttractionState();
    }
  }, []);

  useEffect(() => {
    if (id != null) {
      setFormData({
        name: loading || !attraction.name ? "" : attraction.name,
        address: loading || !attraction.address ? "" : attraction.address,
        shortDescription:
          loading || !attraction.shortDescription
            ? ""
            : attraction.shortDescription,
        description:
          loading || !attraction.description ? "" : attraction.description,
        latitude: loading || !attraction.latitude ? "" : attraction.latitude,
        longitude: loading || !attraction.longitude ? "" : attraction.longitude,
        thumbnail: loading || !attraction.thumbnail ? {} : attraction.thumbnail
      });
    }
  }, [attraction]);

  const {
    name,
    address,
    description,
    shortDescription,
    latitude,
    longitude
  } = formData;

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

  const descriptionChange = value => {
    if (id != null) {
      if (formData.name != "" && !formData) {
        setFormData({
          ...formData,
          description: value
        });
      }
    } else {
      setFormData({
        ...formData,
        description: value
      });
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (id != null) {
      updateAttraction(id, formData, history);
    } else {
      addAttraction(formData, history);
    }
  };

  const thumbnailPreview = !loading && attraction !== null && (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <img
        alt="thumbnail preview"
        src={`${API_URL}/uploads/${attraction.thumbnail}`}
        style={{ maxHeight: "100px" }}
      />
    </div>
  );

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <strong>{formTitle}</strong>
            </CardHeader>
            <Form onSubmit={e => onSubmit(e)}>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        type="text"
                        required
                        name="name"
                        value={name}
                        onChange={e => onChange(e)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccmonth">Kategori Wisata</Label>
                      <Input type="select" name="">
                        {allCategories.map(category => {
                          return (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name">Thumbnail</Label>
                      {attraction.thumbnail !== "" && thumbnailPreview}
                      <Input
                        type="file"
                        required
                        name="thumbnail"
                        onChange={e => onChange(e)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Alamat</Label>
                      <Input
                        type="textarea"
                        required
                        name="address"
                        value={address}
                        onChange={e => onChange(e)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Deskripsi Singkat</Label>
                      <Input
                        type="textarea"
                        required
                        name="shortDescription"
                        value={shortDescription}
                        onChange={e => onChange(e)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label>Deskripsi</Label>
                      <TextHtml
                        value={description}
                        onTextChange={(event, editor) => {
                          const data = editor.getData();
                          descriptionChange(data);
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="name">Latitude</Label>
                      <Input
                        type="text"
                        required
                        name="latitude"
                        value={latitude}
                        onChange={e => onChange(e)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="name">Longitude</Label>
                      <Input
                        type="text"
                        required
                        name="longitude"
                        value={longitude}
                        onChange={e => onChange(e)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary">
                  <i className="fa fa-dot-circle-o" /> Submit
                </Button>
                &nbsp;
                <Button type="reset" size="sm" color="danger">
                  <i className="fa fa-ban" /> Reset
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

AttractionForm.propTypes = {
  getAttraction: PropTypes.func.isRequired,
  addAttraction: PropTypes.func.isRequired,
  updateAttraction: PropTypes.func.isRequired,
  getAllCategories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  attraction: state.attraction,
  allCategories: state.category.allCategories
});

export default connect(
  mapStateToProps,
  {
    addAttraction,
    getAttraction,
    updateAttraction,
    getAllCategories,
    cleanAttractionState
  }
)(withRouter(AttractionForm));
