import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import M from 'materialize-css/dist/js/materialize.min.js';
import Map from './Map';
class Proveedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Info: [],
      coordenadas: [],
      Proveedor: '',
      loading: true,
    };
  }
  componentDidMount() {
    M.AutoInit();
    var item = '';
    if (this.props.location.data === undefined) {
      console.log('gg');
      item = localStorage.getItem('item');
    } else {
      localStorage.setItem('item', this.props.location.data);
      item = this.props.location.data;
    }
    axios
      .post('/VerProveedor', {
        Nombre: item,
      })
      .then((result) => {
        this.setState({ Info: result.data.recordsets[0][0] });
      });
    axios
      .post('/VerCoordenadasProveedor', {
        Nombre: item,
      })
      .then((result) => {
        this.setState({ coordenadas: result.data.recordsets[0][0] });
        this.setState({ Proveedor: item });
      });
  }
  render() {
    if (this.state.loading) {
      if (
        this.state.coordenadas !== 'undefined' &&
        this.state.Info !== 'undefined'
      ) {
        if (Object.keys(this.state.coordenadas).length > 0) {
          this.setState({ loading: false });
        }
      }
      return (
        <div>
          <h4>Cargando</h4>
        </div>
      );
    }
    return (
      <Fragment>
        <div
          className='card z-depth-5'
          style={{
            height: '800px',
            width: '1500px',
            marginTop: '50px',
            marginBottom: '50px',
          }}
        >
          <div className='row '>
            <ul
              className='collection with-header col m5 '
              style={{
                marginLeft: '30px',
                marginTop: '30px',
                marginRight: '20px',
              }}
            >
              <li className='collection-item '>
                <h5>Información de contacto</h5>
              </li>
              <li className='collection-item avatar'>
                <i className='material-icons circle'>person</i>
                <span className='title'>Nombre:</span>
                <p>{this.state.Info.SupplierName}</p>
              </li>
              <li className='collection-item avatar'>
                <i className='material-icons circle'>contacts</i>
                <span className='title'>Contacto primario:</span>
                <p>{this.state.Info.PrimaryContact}</p>
              </li>
              <li className='collection-item avatar'>
                <i className='material-icons circle'>contacts</i>
                <span className='title'>Contacto secundario:</span>
                <p>{this.state.Info.AlternateContact}</p>
              </li>
              <li className='collection-item avatar'>
                <i className='material-icons circle'>call</i>
                <span className='title'>Número telefónico:</span>
                <p>{this.state.Info.PhoneNumber}</p>
              </li>
              <li className='collection-item avatar'>
                <i className='material-icons circle'>call</i>
                <span className='title'>Fax:</span>
                <p>{this.state.Info.FaxNumber}</p>
              </li>
              <li className='collection-item avatar'>
                <i className='material-icons circle'>location_city</i>
                <span className='title'>Ciudad de entrega:</span>
                <p>{this.state.Info['Ciudad de entrega']}</p>
              </li>
              <li className='collection-item avatar'>
                <i className='material-icons circle'>local_post_office</i>
                <span className='title'>Código postal:</span>
                <p>{this.state.Info.DeliveryPostalCode}</p>
              </li>
              <li className='collection-item avatar'>
                <i className='material-icons circle'>link</i>
                <span className='title'>Página web:</span>
                <p>
                  <a href={this.state.Info.WebsiteURL}>
                    {this.state.Info.WebsiteURL}
                  </a>
                </p>
              </li>
            </ul>
            <ul
              className='collection with-header col m5 '
              style={{
                marginLeft: '30px',
                marginTop: '30px',
                marginRight: '20px',
              }}
            >
              <li className='collection-item '>
                <h5>Información general</h5>
              </li>
              <li className='collection-item avatar'>
                <i className='material-icons circle'>group</i>
                <span className='title'>Codigo del proveedor:</span>
                <p>{this.state.Info.SupplierReference}</p>
              </li>
              <li className='collection-item avatar'>
                <i className='material-icons circle'>group</i>
                <span className='title'>Categoría de proveedor:</span>
                <p>{this.state.Info.SupplierCategoryName}</p>
              </li>
              <li className='collection-item avatar'>
                <i className='material-icons circle'>contacts</i>
                <span className='title'>Método de entrega:</span>
                <p>{this.state.Info.DeliveryMethod}</p>
              </li>
              <li className='collection-item avatar'>
                <i className='material-icons circle'>store</i>
                <span className='title'>Dirección:</span>
                <p>{this.state.Info.Direccion}</p>
              </li>
              <li className='collection-item avatar'>
                <i className='material-icons circle'>payments</i>
                <span className='title'>Días de gracia para pagar:</span>
                <p>{this.state.Info.PaymentDays}</p>
              </li>
            </ul>
          </div>
        </div>
        <Map coordenadas={this.state.coordenadas}></Map>
      </Fragment>
    );
  }
}

export default withRouter(Proveedor);
