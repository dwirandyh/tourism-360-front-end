import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AttractionSearchForm from "../../common/SearchForm";
import Pagination from "../../common/Pagination";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button
} from "reactstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getAttractions,
  deleteAttraction,
  searchAttractions
} from "../../../actions/attraction";

const AttractionList = ({
  getAttractions,
  deleteAttraction,
  searchAttractions,
  attraction: {
    attractions: { page, data },
    loading
  }
}) => {
  useEffect(() => {
    getAttractions();
  }, [getAttractions]);

  const search = query => {
    searchAttractions(query);
  };

  const onPageChanged = page => {
    getAttractions(page.currentPage);
  };

  const tableRow = loading ? (
    <tr>
      <td />
    </tr>
  ) : (
    data.map(attraction => {
      return (
        <tr key={attraction.id}>
          <td>{attraction.id}</td>
          <td>{attraction.name}</td>
          <td>{attraction.address}</td>
          <td>{attraction.shortDescription}</td>
          <td>
            <Link to={`/attraction/gallery/${attraction.id}`}>
              <Button color="primary" size="sm">
                <i className="fa fa-photo" />
                &nbsp;Galleri Foto
              </Button>
            </Link>
            &nbsp;
            <Link to={`/attraction/edit/${attraction.id}`}>
              <Button color="success" size="sm">
                <i className="fa fa-edit" />
                &nbsp;Edit
              </Button>
            </Link>
            &nbsp;
            <Button
              color="danger"
              size="sm"
              onClick={e => deleteAttraction(attraction.id)}
            >
              <i className="fa fa-trash-o" />
              &nbsp;Hapus
            </Button>
          </td>
        </tr>
      );
    })
  );

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" /> Data Tempat Wisata{" "}
              <Link to="/attraction/add">
                <Button color="primary" size="sm">
                  <i className="fa fa-plus" />
                  &nbsp;Tambah Data
                </Button>
              </Link>
            </CardHeader>
            <CardBody>
              <AttractionSearchForm onSearch={search} />
              <Row>
                <Col lg="12" />
              </Row>
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama Tempat</th>
                    <th>Alamat</th>
                    <th>Deskripsi Singkat</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>{tableRow}</tbody>
              </Table>
              {!loading && data && (
                <Pagination
                  totalRecords={page.total}
                  pageLimit={page.pageSize}
                  pageNeighbours={2}
                  onPageChanged={e => {
                    onPageChanged(e);
                  }}
                />
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

AttractionList.propTypes = {
  getAttractions: PropTypes.func.isRequired,
  deleteAttraction: PropTypes.func.isRequired,
  attraction: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  attraction: state.attraction
});

export default connect(
  mapStateToProps,
  { getAttractions, deleteAttraction, searchAttractions }
)(AttractionList);
