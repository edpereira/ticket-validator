import React, { Component } from 'react'
import dynamic from 'next/dynamic'

const QrReader = dynamic(() => import('react-qr-reader'), {
    ssr: false
})

console.log("aheoo "+process.env.mongo_user);

class Index extends Component {
    state = {
      result: "Aguardando QR Code",
    };
  
    handleScan = (data) => {
      if (data) {
        this.setState({
          result: data,
        });
      }
    };
    handleError = (err) => {
      console.error(err);
    };
    render() {
      return (
        <div>
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "100%" }}
          />
          <p>{this.state.result}</p>
        </div>
      );
    }
  }
  
  export default Index;