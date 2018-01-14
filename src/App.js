import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    invoices: [
      {
        id:1,
        title: "invoice for php",
        bill_for: "jeem",
        products:[
          {id:1,name:"php",hourly_rate:10,hours:10},
          {id:2,name:"java",hourly_rate:12,hours:8}
        ]
      },{
        id:2,
        title: "invoice for android",
        bill_for: "jeem",
        products:[
          {id:3,name:"ui",hourly_rate:11,hours:10},
          {id:2,name:"java",hourly_rate:12,hours:8}
        ]
      }
    ]
  };


  addInvoice = () => {
    let tmp = this.state.invoices
    this.setState({invoices: [
      ...tmp,
      {
              id:Date.now(), //fetch from DB
              title: "",
              bill_for: "",
              products:[]
      }
    ]})
  }

  deleteInvoice = in_id => {
    var tmp = this.state.invoices.filter(invoice => invoice.id !== in_id);
    this.setState({invoices:tmp});
    console.log(in_id);
  }

  addProduct = i =>{
    this.state.invoices[i].products.push({id:Date.now(),name:"",hourly_rate:0,hours:0});
    this.setState(this.state); 
  }

  deleteProduct = (i_in,i_pr) =>{
    delete this.state.invoices[i_in].products[i_pr];
    this.setState(this.state);
  }

  updateTitle = (e,i_in) =>{
    this.state.invoices[i_in].title = e.target.value;
    this.setState(this.state);
  }

  updateBillFor = (e,i_in) =>{
    this.state.invoices[i_in].bill_for = e.target.value;
    this.setState(this.state);
  }
  updatePrName = (e,i_in,i_pr) =>{
    this.state.invoices[i_in].products[i_pr].name = e.target.value;
    this.setState(this.state);
    console.log(this.state)
  }
  updatePrHourlyRate = (e,i_in,i_pr) =>{
    this.state.invoices[i_in].products[i_pr].hourly_rate = e.target.value;
    this.setState(this.state);
    //console.log(this.state)
  }
  updatePrHours = (e,i_in,i_pr) =>{
    this.state.invoices[i_in].products[i_pr].hours = e.target.value;
    this.setState(this.state);
    //console.log(this.state)
  }
  render() {
    return (
      <div className="App">
        <div className="container">
            {
              this.state.invoices.map((invoice,i_in) =>
              <div className="row" key={i_in}>
                <div className="panel panel-default"> 
                  <div className="form-group">
                   Title: <input type="text" className="form-control" defaultValue={invoice.title} onChange={(e) => this.updateTitle(e,i_in)} />
                   Bill for: <input type="text" className="form-control" defaultValue={invoice.bill_for} onChange={(e) => this.updateBillFor(e,i_in)} />   
                  </div>
                  <div>
                    <button className="btn btn-warning btn-sm" onClick={() => this.addProduct(i_in)}>Add Product</button>
                    <button className="btn btn-danger btn-sm" onClick={() => this.deleteInvoice(invoice.id)}>Delete Invoice</button>
                  </div> 
                  <div>
                    {
                      invoice.products.map((product,i_pr) =>
                        <form className="form-inline" key={i_pr}>
                          <div className="form-group">
                            Name: <input type="text" className="form-control" defaultValue={product.name} onChange={(e) => this.updatePrName(e,i_in,i_pr)} />
                            Hourly Rate: <input type="text" className="form-control" defaultValue={product.hourly_rate} onChange={(e) => this.updatePrHourlyRate(e,i_in,i_pr)}  />
                            Hours: <input type="text" className="form-control" defaultValue={product.hours} onChange={(e) => this.updatePrHours(e,i_in,i_pr)} />
                            cost: <b>{parseFloat(product.hourly_rate) * parseFloat(product.hours)} </b>
                            <button className="btn btn-sm" onClick={() => this.deleteProduct(i_in,i_pr)}> X </button>
                          </div>
                        </form>
                      )
                    }
                  </div>
                </div>
              </div>
              )
            }
          <div>
            <button className="btn btn-success pull-left" onClick={this.addInvoice} >Add Invoice </button>
          </div> 
        </div>
      </div>
    );
  }
}

export default App;
