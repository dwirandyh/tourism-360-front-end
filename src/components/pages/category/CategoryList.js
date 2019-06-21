import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CategorySearchForm from "../../common/SearchForm";
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
  getCategories,
  deleteCategory,
  searchCategories
} from "../../../actions/category";

const CategoryList = ({
  getCategories,
  deleteCategory,
  searchCategories,
  category: {
    categories: { page, data },
    loading
  }
}) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const search = query => {
    searchCategories(query);
  };

  const onPageChanged = page => {
    getCategories(page.currentPage);
  };

  const tableRow = loading ? (
    <tr>
      <td />
    </tr>
  ) : (
    data.map(category => {
      return (
        <tr key={category.id}>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td>{category.description}</td>
          <td>
            <Link to={`/category/edit/${category.id}`}>
              <Button color="success" size="sm">
                <i className="fa fa-edit" />
                &nbsp;Edit
              </Button>
            </Link>
            &nbsp;
            <Button
              color="danger"
              size="sm"
              onClick={e => deleteCategory(category.id)}
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
              <i className="fa fa-align-justify" /> Data Kategori{" "}
              <Link to="/category/add">
                <Button color="primary" size="sm">
                  <i className="fa fa-plus" />
                  &nbsp;Tambah Data
                </Button>
              </Link>
            </CardHeader>
            <CardBody>
              <CategorySearchForm onSearch={search} />
              <Row>
                <Col lg="12" />
              </Row>
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Kategori</th>
                    <th>Deskripsi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>{tableRow}</tbody>
              </Table>
              {!loading && (
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

CategoryList.propTypes = {
  getCategories: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(
  mapStateToProps,
  { getCategories, deleteCategory, searchCategories }
)(CategoryList);
