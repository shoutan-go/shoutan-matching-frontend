import React from 'react';
import {Link} from 'react-router-dom';
import { Row, Col, Card, Table, Pagination } from 'react-bootstrap';
import Aux from "../../../hoc/_Aux";

class BootstrapTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      players: []
    }
  }

  componentDidMount() {
    var that = this;
    fetch('/api/players')
      .then(res => res.json())
      .then(res => {
        that.setState({
          players: res.resp
        })
      })
  }

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
                      <th>比赛次数</th>
                      <th>上次参加比赛</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.players.map(function (item, index) {
                      return (<tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.pin}</td>
                        <td>{item.name}</td>
                        <td>{item.rating}</td>
                        <td>{item.club}</td>
                        <td>{item.times}</td>
                        <td>{item.lastMatch}</td>
                        <td><Link to={"/player/" +item.id + "/edit"} className="label text-info f-14">修改信息</Link></td>
                      </tr>)
                    })}
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