'use client';

import React, { useEffect } from 'react';
import { Row, Col, Card, Dropdown } from 'react-bootstrap';
import Chart from 'chart.js/auto';

export default function Charts() {
  useEffect(() => {
    // Area Chart
    const areaCtx = document.getElementById('myAreaChart') as HTMLCanvasElement;
    if (areaCtx) {
      new Chart(areaCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Earnings',
            data: [0, 1000, 5000, 3000, 7000, 4000],
            backgroundColor: 'rgba(78, 115, 223, 0.05)',
            borderColor: 'rgba(78, 115, 223, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          maintainAspectRatio: false,
        }
      });
    }

    // Pie Chart
    const pieCtx = document.getElementById('myPieChart') as HTMLCanvasElement;
    if (pieCtx) {
      new Chart(pieCtx, {
        type: 'doughnut',
        data: {
          labels: ['Direct', 'Social', 'Referral'],
          datasets: [{
            data: [55, 30, 15],
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
            hoverBorderColor: 'rgba(234, 236, 244, 1)',
          }]
        },
        options: {
          cutout: '70%',
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }

  }, []);

  return (
    <Row>
      {/* Area Chart */}
      <Col xl={8} lg={7}>
        <Card className="shadow mb-4">
          <Card.Header className="d-flex flex-row align-items-center justify-content-between py-3">
            <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" bsPrefix="p-0 text-gray-400">
                <i className="fas fa-ellipsis-v fa-sm fa-fw"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Header>Dropdown Header:</Dropdown.Header>
                <Dropdown.Item href="#">Action</Dropdown.Item>
                <Dropdown.Item href="#">Another action</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#">Something else here</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Header>
          <Card.Body>
            <div className="chart-area">
              <canvas id="myAreaChart"></canvas>
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Pie Chart */}
      <Col xl={4} lg={5}>
        <Card className="shadow mb-4">
          <Card.Header className="d-flex flex-row align-items-center justify-content-between py-3">
            <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" bsPrefix="p-0 text-gray-400">
                <i className="fas fa-ellipsis-v fa-sm fa-fw"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Header>Dropdown Header:</Dropdown.Header>
                <Dropdown.Item href="#">Action</Dropdown.Item>
                <Dropdown.Item href="#">Another action</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#">Something else here</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Header>
          <Card.Body>
            <div className="chart-pie pt-4 pb-2">
              <canvas id="myPieChart"></canvas>
            </div>
            <div className="mt-4 text-center small">
              <span className="me-2">
                <i className="fas fa-circle text-primary"></i> Direct
              </span>
              <span className="me-2">
                <i className="fas fa-circle text-success"></i> Social
              </span>
              <span className="me-2">
                <i className="fas fa-circle text-info"></i> Referral
              </span>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
