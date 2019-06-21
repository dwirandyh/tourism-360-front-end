import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const CategorySearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    query: ""
  });

  const { query } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    onSearch({ name: query });
  };

  return (
    <Row>
      <Col sm="4" style={{ marginBottom: "20px" }}>
        <Form onSubmit={e => onSubmit(e)} inline method="GET">
          <FormGroup className="pr-1">
            <Label htmlFor="exampleInputName2" className="pr-1">
              Pencarian Data &nbsp;
            </Label>
            <Input
              type="text"
              id="exampleInputName2"
              placeholder="Cari data"
              name="query"
              value={query}
              onChange={e => onChange(e)}
            />
            &nbsp;
            <Button color="primary" type="submit">
              Cari
            </Button>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
};

CategorySearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default CategorySearchForm;
