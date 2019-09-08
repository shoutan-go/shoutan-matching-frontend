import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

import Aux from "../../../hoc/_Aux";

class FormsElements extends React.Component {

  constructor(props){
    super(props)
    const { id } = this.props.match.params
    this.state = {
      id: id,
      pin: '',
      name: '',
      rating: '',
      club: '',
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    var that = this;
    fetch('/api/players/' + id)
      .then(res => res.json())
      .then(res => {
        if(res.code === 'ok'){
          console.log(res.resp)
          that.setState({
            pin: res.resp.pin,
            name: res.resp.name,
            rating: res.resp.rating,
            club: res.resp.club,
          })
        } else{
          alert('请呼叫敬思, code:'+res.msg)
        }
      })
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    let id = this.state.id;
    fetch('/api/players/' + id, {
      method: 'PUT',
      body: JSON.stringify({
        'pin': data.get('pin'),
        'name': data.get('name'),
        'club': data.get('club'),
        'rating': data.get('rating')
      }),
      headers: {'Content-Type':'application/json'}
    }).then(res => res.json())
      .then(res => {
        if(res.code === 'ok'){
          alert('修改成功')
        } else{
          alert('请呼叫敬思, code:'+res.msg)
        }
      });
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
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                      <Form.Group controlId="formPin">
                        <Form.Label>PIN*</Form.Label>
                        <Form.Control type="text" placeholder="身份证号或护照ID" name="pin" defaultValue={this.state.pin}/>
                      </Form.Group>
                      <Form.Group controlId="formName">
                        <Form.Label>姓名*</Form.Label>
                        <Form.Control type="text" placeholder="选手姓名" name="name" defaultValue={this.state.name}/>
                      </Form.Group>
                      <Form.Group controlId="formGor">
                        <Form.Label>等级分*</Form.Label>
                        <Form.Control type="number" name="rating" defaultValue={this.state.rating}/>
                      </Form.Group>
                      <Form.Group controlId="formClub">
                        <Form.Label>俱乐部/学校</Form.Label>
                        <Form.Control type="text" name="club" defaultValue={this.state.club}/>
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
