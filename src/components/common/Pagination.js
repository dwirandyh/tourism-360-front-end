import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import queryString from "query-string";

const PREV_PAGE = "PREV_PAGE_ENABLED";
const PREV_PAGE_DISABLED = "PREV_PAGE_DISABLED";
const NEXT_PAGE = "NEXT_PAGE";
const NEXT_PAGE_DISABLED = "NEXT_PAGE_DISABLED";

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

class Pagination extends Component {
  constructor(props) {
    super(props);
    const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;

    this.pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
    this.totalRecords = typeof totalRecords === "number" ? totalRecords : 0;

    // pageNeighbours can be: 0, 1 or 2
    this.pageNeighbours =
      typeof pageNeighbours === "number" ? pageNeighbours : 0;

    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

    this.state = { currentPage: 1 };
  }

  componentDidMount() {
    const { page } = queryString.parse(this.props.location.search);
    if (isNaN(page)) {
      this.gotoPage(1);
    } else {
      this.gotoPage(page);
    }
  }

  gotoPage = page => {
    const { onPageChanged = f => f } = this.props;

    let currentPage = Math.max(0, Math.min(page, this.totalPages));
    if (currentPage <= 0) {
      currentPage = 1;
    }
    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = page => evt => {
    evt.preventDefault();
    //this.props.history.push("/category?page=" + page);
    this.gotoPage(page);
  };

  handleMoveLeft = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage - 1);
  };

  handleMoveRight = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage + 1);
  };

  /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */
  fetchPageNumbers = () => {
    let totalPages = this.totalPages;
    let currentPage = this.state.currentPage;
    let pageNeighbours = this.pageNeighbours;

    let startNumber = 1;
    if (currentPage > pageNeighbours) {
      startNumber = currentPage - pageNeighbours;
    }

    let endNumber = totalPages;
    if (currentPage < totalPages - pageNeighbours) {
      endNumber = currentPage + pageNeighbours;
    }

    let pages = range(startNumber, endNumber);
    if (currentPage === 1) {
      pages = [PREV_PAGE_DISABLED, ...pages];
    } else if (currentPage > 1) {
      pages = [PREV_PAGE, ...pages];
    }

    if (currentPage < totalPages) {
      pages = [...pages, NEXT_PAGE];
    } else if (currentPage === totalPages) {
      pages = [...pages, NEXT_PAGE_DISABLED];
    }

    return pages;
  };

  render() {
    if (!this.totalRecords || this.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <Fragment>
        <nav aria-label="Countries Pagination">
          <ul className="pagination">
            {pages.map((page, index) => {
              if (page === PREV_PAGE_DISABLED) {
                return (
                  <li key={index} className="page-item disabled">
                    <a className="page-link" href="#!" aria-label="Previous">
                      <span aria-hidden="true">«</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                );
              } else if (page === PREV_PAGE) {
                return (
                  <li className="page-item" key={index}>
                    <button
                      className="page-link"
                      aria-label="Previous"
                      onClick={this.handleClick(this.state.currentPage - 1)}
                    >
                      <span aria-hidden="true">«</span>
                      <span className="sr-only">Previous</span>
                    </button>
                  </li>
                );
              } else if (page === NEXT_PAGE_DISABLED) {
                return (
                  <li key={index} className="page-item disabled">
                    <a className="page-link" aria-label="Previous" href="#!">
                      <span aria-hidden="true">»</span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                );
              } else if (page === NEXT_PAGE) {
                return (
                  <li className="page-item" key={index}>
                    <button
                      className="page-link"
                      aria-label="Previous"
                      onClick={this.handleClick(this.state.currentPage + 1)}
                    >
                      <span aria-hidden="true">»</span>
                      <span className="sr-only">Next</span>
                    </button>
                  </li>
                );
              } else {
                return (
                  <li
                    key={index}
                    className={`page-item${
                      currentPage === page ? " active" : ""
                    }`}
                  >
                    <a
                      className="page-link"
                      href="#!"
                      onClick={this.handleClick(page)}
                    >
                      {page}
                    </a>
                  </li>
                );
              }
            })}
          </ul>
        </nav>
      </Fragment>
    );
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func
};

export default withRouter(Pagination);
