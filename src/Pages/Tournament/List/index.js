import React from 'react';
import {Row, Col, Card, Table, Pagination} from 'react-bootstrap';

import Aux from "../../../hoc/_Aux";

class BootstrapTable extends React.Component {
    render() {
        let items = [];
        for (let number = 1; number <= 5; number++) {
            items.push(
                <Pagination.Item key={number}>
                    {number}
                </Pagination.Item>
            );
        }
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">所有选手</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Table responsive hover>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>PIN</th>
                                        <th>姓名</th>
                                        <th>等级分</th>
                                        <th>俱乐部/学校</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                        <td><a href="about:blank" className="label text-info f-14">修改信息</a></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                        <td><a href="about:blank" className="label text-info f-14">修改信息</a></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                        <td><a href="about:blank" className="label text-info f-14">修改信息</a></td>
                                    </tr>
                                    </tbody>
                                </Table>
                                <Pagination>
                                    <Pagination.First />
                                    <Pagination.Prev />
                                    {items}
                                    <Pagination.Next />
                                    <Pagination.Last />
                                </Pagination>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default BootstrapTable;