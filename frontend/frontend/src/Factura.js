import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import M from 'materialize-css/dist/js/materialize.min.js'; 
class Factura extends Component {
    constructor(props) {
        super(props);
        this.state = {
          InfoFactura: [],
          LineasFactura: [],

          loading: true,
        };
      }
      componentDidMount() {
        M.AutoInit();
        var ID = '';
        if (this.props.location.data === undefined) {
          ID = localStorage.getItem('ID');
          console.log(ID);
        } else {
          localStorage.setItem('ID', this.props.location.data);
          ID = this.props.location.data;
         
        }
        axios.post('/VerFactura', {
            InvoiceID: ID,
          })
          .then((result) => {
            this.setState({ InfoFactura: result.data.recordsets[0][0] });
            console.log(result.data.recordsets[0][0] );
          });
          axios.post('/VerLineasFactura', {
            InvoiceID: ID,
          })
          .then((result) => {
            this.setState({ LineasFactura: result.data.recordsets[0] });
            console.log(result.data.recordsets[0] );
          });
      }
    render() {
        if (this.state.loading) {
            if (this.state.LineasFactura !== 'undefined') {
              if (Object.keys(this.state.InfoFactura).length > 0) {
                this.setState({ loading: false });
              }
            }
            return (
              <div>
                <h5>Cargando</h5>
              </div>
            );
          }
        return (
            <Fragment>
               <div  className='card z-depth-4'style={{ height: '700px', width: '1500px',marginTop: '50px', marginBottom: '50px', }}>
               <div className='row '>
            <ul
              className='collection with-header col m5 '
              style={{
                marginLeft: '100px',
                marginTop: '30px',
              }}
            >
              <li className='collection-item '>
                <h5>Número de Factura:</h5>
                <p> {this.state.InfoFactura.invoiceID}</p>
              </li>
              <li className='collection-item '>
                <h5>Nombre del cliente:</h5>
                <p> {this.state.InfoFactura.CustomerName}</p>
              </li>
              <li className='collection-item '>
                <h5>Número de orden:</h5>
                <p> {this.state.InfoFactura.CustomerPurchaseOrderNumber}</p>
              </li>
              <li className='collection-item '>
                <h5>Persona de contacto:</h5>
                <p>{this.state.InfoFactura["Persona de contacto"]}</p>
              </li>
              <li className='collection-item'>
                <h5>Página web del cliente:</h5>
                <a href= {this.state.InfoFactura.websiteURL}> {this.state.InfoFactura.websiteURL}</a>
              </li>
            </ul>
            <ul
              className='collection with-header col m5 '
              style={{
                marginTop: '30px',
                marginRight: '20px',
              }}
            >
              <li className='collection-item '>
                <h5>Vendedor:</h5>
                <p> {this.state.InfoFactura.vendedor}</p>
              </li>
              <li className='collection-item '>
                <h5>Método de entrega:</h5>
                <p> {this.state.InfoFactura.DeliveryMethod}</p>
              </li>
              <li className='collection-item '>
                <h5>Instrucciones de entrega:</h5>
                <p> {this.state.InfoFactura.DeliveryInstructions}</p>
              </li>
              <li className='collection-item '>
                <h5>Fecha de facturación:</h5>
                <p>{new Date(this.state.InfoFactura.InvoiceDate).toISOString().split('T')[0]}</p>
              </li>
              <li className='collection-item'>
                <h5>Monto facturado:</h5>
                <p> {this.state.InfoFactura.TransactionAmount}</p>
              </li>
            </ul>
          </div>
           </div>
           <div className="row">
            <div className="col s2 push-s1"><h5>Productos:</h5></div>
          </div>
          {this.state.LineasFactura.map((key, i) => (
                  <div  className='card z-depth-5'style={{ height: '450px', width: '1500px',marginTop: '50px', marginBottom: '50px', }}>
                  <div className='row '>
               <ul
                 className='collection with-header col m5 '
                 style={{
                   marginLeft: '100px',
                   marginTop: '30px',
                 }}
               >
                 <li className='collection-item '>
                   <h5>Nombre del producto:</h5>
                   <p> {key.StockItemName}</p>
                 </li>
                 <li className='collection-item '>
                   <h5>Cantidad:</h5>
                   <p> {key.Quantity}</p>
                 </li>
                 <li className='collection-item '>
                   <h5>Precio unitario:</h5>
                   <p> {key.UnitPrice}</p>
                 </li>
            
               </ul>
               <ul
                 className='collection with-header col m5 '
                 style={{
                   marginTop: '30px',
                   marginRight: '20px',
                 }}
               >
                 <li className='collection-item '>
                   <h5>Porcentaje de impuestos:</h5>
                   <p> {key["Porcentaje de impuesto"]}</p>
                 </li>
                 <li className='collection-item '>
                   <h5>Monto de impuestos:</h5>
                   <p> {key.TaxAmount}</p>
                 </li>
                 <li className='collection-item '>
                   <h5>Precio total:</h5>
                   <p> {key.ExtendedPrice}</p>
                 </li>
               
               </ul>
             </div>
              </div>
                  ))}

            </Fragment>
        )
    }
}
export default withRouter(Factura);
