import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

import Aux from "../../../hoc/_Aux";

class FormsElements extends React.Component {

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('/api/player', {
      method: 'POST',
      body: JSON.stringify({
        'pin': data.get('pin'),
        'name': data.get('name'),
        'initialRating': data.get('initial_rating'),
        'club': data.get('club'),
        'rating': data.get('initial_rating')
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if(res.status === 200){
          res.json().then((res) => {
            if (res.code === 'ok') {
              alert('创建成功')
            } else {
              alert('出错了，请联系敬思. code:' + res.msg)
            }
          })
        }else{
          alert('出错了，请联系敬思. code:' + res.status)
        }
      })
  }

  render() {
    return (
      <Aux>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">基本信息</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group controlId="formPin">
                        <Form.Label>PIN*</Form.Label>
                        <Form.Control type="text" placeholder="身份证号或护照ID" name="pin" />
                      </Form.Group>

                      <Form.Group controlId="formName">
                        <Form.Label>姓名*</Form.Label>
                        <Form.Control type="text" placeholder="选手姓名" name="name" />
                      </Form.Group>
                      <Form.Group controlId="formGor">
                        <Form.Label>申报等级分*</Form.Label>
                        <Form.Control type="number" name="initial_rating" />
                      </Form.Group>
                      <Form.Group controlId="formClub">
                        <Form.Label>俱乐部/学校</Form.Label>
                        <Form.Control type="text" name="club" />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        提交
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default FormsElements;
