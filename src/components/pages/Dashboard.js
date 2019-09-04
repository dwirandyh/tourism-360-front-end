import React, { Component } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  Collapse,
  Fade
} from "reactstrap";
import { AppSwitch } from "@coreui/react";

const Dashboard = ({}) => {
  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12" md="12">
          <Card>
            <CardHeader>Dashboard</CardHeader>
            <CardBody>
              Selamat Datang di Halaman Administrator Sistem Informasi
              Pariwisata Bandar Lampung
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
