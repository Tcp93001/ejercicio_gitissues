import React, { Component } from 'react';
import './App.css';
import ResultBox from './components/ResultBox'

class App extends Component {

  constructor() {
    super()
    this.state = {
      items: [],
      messages: [],
      foundElement: [],
      inputValue: ''
    }
  }

  componentDidMount() {
    this.getInfo()
  }

  getInfo = async () => {
    await fetch('https://api.github.com/repos/facebook/react/issues')
      .then(response => response.json())
      .then(data => this.setState({ items: data }))

    this.orderInfo()
  }

  orderInfo = () => {
    const refinedMessages = this.state.items.map(elem => {
      return {title: elem.title, url: elem.html_url}
    })
    console.log('items', this.state.items)
    this.setState({messages: refinedMessages})
  }

  handleChange(event) {
    const value = event.target.value
    const registroCoincidencias = this.state.messages.filter(elem => {
      return elem.title.match(value)
    })

    this.setState({
      inputValue: value,
      foundElement: value !== '' ? registroCoincidencias : []
    })
  }

  render () {
    return (
      <div className="App">
       <div className="container">
          <input className="input-style" placeholder="Inserte la información que busca" value={this.inputValue} onChange={(event) => this.handleChange(event)} />
          {this.state.foundElement.map((elem, index) =>
            <div className="result-box" key={`box-${index}`}>
              <ResultBox message={elem.title} url={elem.url} />
            </div>
          )}
       </div>
      </div>
    );
  }
}

export default App;
