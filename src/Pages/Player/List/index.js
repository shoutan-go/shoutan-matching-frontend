import React from 'react';
import {Link} from 'react-router-dom';
import { Row, Col, Card, Table, Pagination, Button } from 'react-bootstrap';
import download from 'downloadjs';
import Aux from "../../../hoc/_Aux";

class BootstrapTable extends React.Component {

  constructor(props) {
    super(props);
    this.columns = ['排名', 'PIN', '姓名', '段级位', '等级分', '俱乐部/学校', '比赛次数', '上次参加比赛']
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

  handleDownloadExcel(event) {
    event.preventDefault();
    if (event.target.className.indexOf('disabled') < 0) {
      let csv = ''
      csv += this.columns.join(',')
      csv += '\n'
      this.state.players.forEach((item, index) => {
        csv += index + 1
        csv += ','
        csv += item['pin']
        csv += ','
        csv += item['name']
        csv += ','
        csv += item['rank']
        csv += ','
        csv += item['rating']
        csv += ','
        csv += item['club']
        csv += ','
        csv += item['times']
        csv += ','
        csv += item['lastMatch']
        csv += '\n'
      })
      download(csv, 'allplayers.csv', 'text/csv')
    }
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
                      <th>段级位</th>
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
                        <td>{item.rank}</td>
                        <td>{item.rating}</td>
                        <td>{item.club}</td>
                        <td>{item.times}</td>
                        <td>{item.lastMatch}</td>
                        <td><Link to={"/player/" +item.id + "/edit"} className="label text-info f-14">修改信息</Link></td>
                      </tr>)
                    })}
                  </tbody>
                </Table>
                <Button variant="primary" onClick={this.handleDownloadExcel.bind(this)} className={this.state.players.length > 0 ? "" : "disabled"}>
                  下载该表格
                                    </Button>
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