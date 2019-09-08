import React from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import download from 'downloadjs';
import Aux from "../../../hoc/_Aux";

class FormsElements extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      search: [],
      participants: []
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.date || !this.date.value) {
      alert("还未选择比赛日期")
      return
    }
    if (this.state.participants.length === 0) {
      alert("还未添加比赛选手")
      return
    }

    fetch('/api/tournament', {
      method: 'POST',
      body: JSON.stringify({
        date: this.date.value,
        level: this.level.value,
        ids: this.state.participants.map((participant) => participant.id)
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (res.ok && res.status === 200) {
          var disposition = res.headers.get('content-disposition');
          var mediaType = res.headers.get('content-type').split(';')[0]
          var match = disposition.match(/attachment; filename=(.*\.xml)/)
          if (match) {
            var filename = match[1]
            res.blob().then(blob => {
              download(blob, filename, mediaType)
            })
          } else {
            alert('出错了，请呼叫敬思，code:1')
          }
        } else {
          alert('出错了，请呼叫敬思, code:2')
        }
      })
  }

  removeParticipantHandler(id) {
    var that = this;
    return function (event) {
      event.preventDefault();
      let participants = that.state.participants
      that.setState({
        participants: participants.filter((item) => item.id !== id)
      })
    }
  }

  handleAddParticipant(event) {
    if (this.participantSelected && parseInt(this.participantSelected.value) !== 0) {
      let participantSelected = JSON.parse(this.participantSelected.value)
      if (this.state.participants.find((item) => item.id === participantSelected.id)) {
        alert('该选手已经在列表里')
      } else {
        var participants = this.state.participants;
        participants.push(participantSelected)
        this.setState({
          participants,
        })
      }
    } else {
      alert('未选择选手')
    }

  }

  handleSearch(event) {
    var that = this;
    if (this.searchTerm && this.searchTerm.value) {
      fetch('/api/player/search', {
        method: 'POST',
        body: JSON.stringify({
          'query': that.searchTerm.value,
        }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(res => {
          if (res.code === 'ok') {
            that.setState({
              search: res.resp
            })

          } else {
            alert('请呼叫敬思， code:' + res.msg)
          }
        })
    }
  }

  render() {
    return (
      <Aux>
        <Row>
          <Col>
            <Card>
              <Form>
                <Card.Header>
                  <Card.Title as="h5">基本信息</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={2}>
                      <Form.Group controlId="formDate">
                        <Form.Label>比赛日期*</Form.Label>
                        <Form.Control type="date" name="date" ref={(input) => this.date = input} />
                      </Form.Group>
                      <Form.Group controlId="formLevel">
                        <Form.Label>赛事级别*</Form.Label>
                        <Form.Control as="select" name="level" ref={(input) => this.level = input}>
                          <option value='A'>A</option>
                          <option value='B'>B</option>
                          <option value='C'>C</option>
                          <option value='D'>D</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>

                <Card.Header>
                  <Card.Title as="h5">参赛选手</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={4}>
                      <Form.Group controlId="formDate">
                        <Form.Label>搜索选手</Form.Label>
                        <Form.Control type="text" name="term" ref={(input) => this.searchTerm = input} placeholder="按PIN或姓名查找，可以部分匹配比如'陈'可以匹配'陈雷'" />
                      </Form.Group>
                      <Form.Group>
                        <Button className="mb-0" onClick={this.handleSearch.bind(this)}>查找</Button>
                      </Form.Group>
                      <Form.Group>
                        <Form.Text className="text-muted">
                          搜索结果最多展示20条，如果没有找到想要的结果请输入更精确的搜索词
                        </Form.Text>
                        <Form.Control as="select" className="mb-3" ref={(input) => this.participantSelected = input}>
                          {this.state.search.length > 0 ? (
                            this.state.search.map((player, index) => {
                              return <option key={index} value={JSON.stringify({ id: player.id, name: player.name, pin: player.pin })}>姓名:{player.name} PIN:{player.pin}</option>
                            })
                          ) : (<option value={0}>无匹配选手</option>)}
                        </Form.Control>
                        <Button className="mb-0" onClick={this.handleAddParticipant.bind(this)}>添加到参赛选手列表</Button>
                      </Form.Group>
                    </Col>
                  </Row>
                  <h3 className="mt-5">参赛选手列表</h3>
                  <Row>
                    {[0, 1, 2].map((col, index) => (
                      <Col md={4} key={index}>
                        <Table responsive hover>
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>PIN</th>
                              <th>姓名</th>
                              <th>操作</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.participants.filter((e, i) => i % 3 === col).map((item, index) => (
                              <tr key={index}>
                                <th scope="row">{item.id}</th>
                                <td>{item.pin}</td>
                                <td>{item.name}</td>
                                <td><a href="about:blank" className="label text-info f-14" onClick={this.removeParticipantHandler(item.id).bind(this)}>X</a></td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Col>
                    ))}
                  </Row>
                  <Button variant="primary" onClick={this.handleSubmit.bind(this)}>
                    生成 MacMahon XML文件
                  </Button>
                </Card.Body>
              </Form>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default FormsElements;
