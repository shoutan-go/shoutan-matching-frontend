import React from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import download from 'downloadjs';
import Aux from "../../../hoc/_Aux";

class FormsElements extends React.Component {

  constructor(props) {
    super(props)
    this.macmahon = React.createRef();
    this.columns = ['排名', 'PID', '姓名', '等级分', '等级分变化']
    this.tournamentName = 'TDEMOA';
    this.state = {
      rank: []
    }
  }

  handleDownloadExcel(event) {
    event.preventDefault();
    if (event.target.className.indexOf('disabled') < 0) {
      let csv = ''
      csv += this.columns.join(',')
      csv += '\n'
      this.state.rank.forEach(item => {
        csv += item.join(',')
        csv += '\n'
      })
      download(csv, this.tournamentName + '.csv', 'text/csv')
    }
  }

  handleUpload(event) {
    event.preventDefault()
    if (event.target.className.indexOf('disabled') < 0) {
      const reader = new FileReader()
      reader.onloadend = function () {
        const content = reader.result;
        fetch('/api/ratings', {
          method: 'PUT',
          headers: { 'Content-Type': 'text/xml' },
          body: content
        })
          .then(res => {
            if (res.status === 200) {
              res.json()
                .then(res => {
                  if (res.code === 'ok') {
                    alert('更新成功')
                  } else {
                    alert(res.msg)
                  }
                })
            } else {
              alert('请呼叫敬思, code:' + res.status)
            }
          })

      }
      reader.readAsText(this.macmahon.current.files[0])
    }
  }

  handleCalculate(event) {
    event.preventDefault();
    var that = this;
    if (this.macmahon.current.files.length > 0) {
      const reader = new FileReader()
      reader.onloadend = function () {
        const content = reader.result;
        fetch('/api/ratings', {
          method: 'POST',
          headers: { 'Content-Type': 'text/xml' },
          body: content
        })
          .then(res => {
            if (res.status === 200) {
              res.json()
                .then(res => {
                  if (res.code === 'ok') {
                    that.tournamentName = res.resp.tournamentName || '未找到比赛名'
                    that.setState({
                      rank: res.resp.rank
                    })
                  } else {
                    alert(res.msg)
                  }
                })
            } else {
              alert('请呼叫敬思, code:' + res.status)
            }
          })

      }
      reader.readAsText(this.macmahon.current.files[0])
    } else {
      alert('请先选择XML文件')
    }
  }

  render() {
    return (
      <Aux>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">比赛信息</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>MacMahon XML文件</Form.Label>
                      <Form.Control type="file" ref={this.macmahon} />
                    </Form.Group>
                    <Button variant="primary" onClick={this.handleCalculate.bind(this)}>
                      计算等级分变化
                                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">等级分变化情况</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      {this.columns.map((item, index) => (
                        <th key={index}>{item}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.rank.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{item[0]}</th>
                        <td>{item[1]}</td>
                        <td>{item[2]}</td>
                        <td>{item[3]}</td>
                        <td>{item[4]}</td>
                        <td>{item[5]}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button variant="primary" onClick={this.handleDownloadExcel.bind(this)} className={this.state.rank.length > 0 ? "" : "disabled"}>
                  下载该表格(不更新服务)
                                    </Button>
                <Button variant="primary" onClick={this.handleUpload.bind(this)} className={this.state.rank.length > 0 ? "" : "disabled"}>
                  确认并更新到服务器
                                    </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default FormsElements;
