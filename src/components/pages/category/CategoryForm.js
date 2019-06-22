import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { API_URL } from "../../../config";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  addCategory,
  getCategory,
  updateCategory,
  cleanCategoryState
} from "../../../actions/category";
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

const CategoryForm = ({
  match,
  addCategory,
  getCategory,
  updateCategory,
  cleanCategoryState,
  category: { category, loading },
  history
}) => {
  const id = match.params.id;
  const formTitle = id != null ? "Edit Kategori" : "Tambah Kategori";

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    thumbnail: {}
  });

  useEffect(() => {
    if (id != null) {
      getCategory(id);
    } else {
      cleanCategoryState();
    }
  }, []);

  useEffect(() => {
    if (id != null) {
      setFormData({
        name: loading || !category.name ? "" : category.name,
        description:
          loading || !category.description ? "" : category.description
      });
    }
  }, [category]);

  const { name, description } = formData;

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

  const onSubmit = async e => {
    e.preventDefault();
    if (id != null) {
      updateCategory(id, formData, history);
    } else {
      addCategory(formData, history);
    }
  };

  const thumbnailPreview = !loading && category !== null && (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <img
        alt="thumbnail preview"
        src={`${API_URL}/uploads/${category.thumbnail}`}
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
                        placeholder="Name"
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
                      <Label htmlFor="name">Thumbnail</Label>
                      {category.thumbnail !== "" && thumbnailPreview}
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
                      <Label htmlFor="ccnumber">Deskripsi</Label>
                      <Input
                        type="textarea"
                        placeholder="Description"
                        required
                        rows="5"
                        name="description"
                        value={description}
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

CategoryForm.propTypes = {
  getCategory: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(
  mapStateToProps,
  {
    addCategory,
    getCategory,
    updateCategory,
    cleanCategoryState
  }
)(withRouter(CategoryForm));
