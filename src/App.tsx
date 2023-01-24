import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'

interface State {
  tarhely: Tarhely[];
  Regexnev: string;
  Regexmeret: number;
  Regexar: number;
}
interface Tarhely {
  id: number;
  nev: string;
}
interface TarhelyListResponse {
  tarhely: Tarhely[];
}
class App extends Component <{}, State>{
  constructor(props: {}) {
    super(props)
    this.state = {
      Regexnev: '',
      Regexmeret: 0,
      Regexar: 0,
      tarhely: [],
    }
  }
  async loadtarhely() {
    let response = await fetch('http://localhost:3000/api/tarhely');
    let data = await response.json() as TarhelyListResponse;
    this.setState({
      tarhely: data.tarhely,
    })}

  componentDidMount() {
    this.loadtarhely();}

  handler = async () => {
    const { Regexnev, Regexmeret, Regexar } = this.state;
    if (Regexnev.trim() == '' || Regexmeret < 0 || Regexar < 0) {
      return;}

    const adat = {
      nev: Regexnev,
      meret: Regexmeret,
      ar: Regexar,
    };

    let response = await fetch('http://localhost:3000/api/tarhely', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify(adat),});
    this.setState({
      Regexnev: '',
      Regexmeret: 0,
      Regexar: 0,
    })
    await this.loadtarhely();
  }
  render() {
    const { Regexnev, Regexmeret, Regexar } = this.state;
    return <Container>
      <Row>
      <Col md><h2>Új tárhely</h2></Col>
      </Row>
      <Row id='form'>
      <Col md>név : <input type='text' value={Regexnev} onChange={e => this.setState({ Regexnev: e.currentTarget.value })} /><br /></Col>

      <Col md>méret : <input type='number' value={Regexmeret} onChange={e => this.setState({ Regexmeret: parseInt(e.currentTarget.value) })} /><br /></Col>

      <Col md>ár : <input type='number' value={Regexar} onChange={e => this.setState({ Regexar: parseInt(e.currentTarget.value) })} /><br /></Col>
      </Row>
      <br />
      <Row id='gomb'>
      <Col md><b><button onClick={this.handler}>Felvétel</button></b></Col>
      </Row>
      <Row>
        
      <Col md><h2>Tárhelyek listája : </h2></Col>
      </Row>
      <Row id='lista'>
      <Col md><ul>
        {
          this.state.tarhely.map(tarhely => <li>{tarhely.nev}</li>)
        }
      </ul></Col>
      </Row>
    </Container>
  }
}
export default App;
