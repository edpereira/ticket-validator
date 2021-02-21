import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import { connectToDatabase } from '../util/mongodb'

const QrReader = dynamic(() => import('react-qr-reader'), {
    ssr: false
})

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

  export async function getServerSideProps(context) {
    const { client } = await connectToDatabase();
  
    const isConnected = await client.isConnected();

    const database = client.db(process.env.MONGODB_DB);
    const collection = database.collection("ingressos");

    try {
      const ingresso = {nome: "Eduardo Pereira", email: "eduardo.pereira2806@gmail.com"}
      await collection.insertOne(ingresso);
    } catch (err) {
      console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    }
  
    return {
      props: { isConnected },
    }
  }