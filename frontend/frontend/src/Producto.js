import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import M from 'materialize-css/dist/js/materialize.min.js';
class Producto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Info: [],
      loading: true,
    };
  }
  componentDidMount() {
    M.AutoInit();
    var item = '';
    if (this.props.location.data === undefined) {
      item = localStorage.getItem('item');
    } else {
      localStorage.setItem('item', this.props.location.data);
      item = this.props.location.data;
    }
    axios
      .post('/VerProducto', {
        StockItemName: item,
      })
      .then((result) => {
        this.setState({ Info: result.data.recordsets[0][0] });
      });
  }
  render() {
    if (this.state.loading) {
      if (this.state.Info !== 'undefined') {
        if (Object.keys(this.state.Info).length > 0) {
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
        <div
          className='card z-depth-5'
          style={{
            height: '1100px',
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
                <h5>Información del producto</h5>
              </li>
              <li className='collection-item '>
                <h5>Nombre del producto:</h5>
                <p> {this.state.Info.StockItemName}</p>
              </li>
              <li className='collection-item '>
                <h5>Categoría:</h5>
                <p> {this.state.Info.StockGroupName}</p>
              </li>
              <li className='collection-item '>
                <h5>Tamaño/Talla:</h5>
                <p> {this.state.Info.Size}</p>
              </li>
              <li className='collection-item'>
                <h5>Marca:</h5>
                <p> {this.state.Info.Brand}</p>
              </li>
              <li className='collection-item '>
                <h5>Proveedor:</h5>
                <p> {this.state.Info.SupplierName}</p>
              </li>
              <li className='collection-item '>
                <h5>Página web del proveedor:</h5>
                <a href={this.state.Info.WebsiteURL}>
                  {this.state.Info.WebsiteURL}
                </a>
              </li>
              <li className='collection-item '>
                <h5>Detalles de búsqueda:</h5>
                <p> {this.state.Info.SearchDetails}</p>
              </li>
              <li className='collection-item '>
                <h5>Ubicación:</h5>
                <p> {this.state.Info.BinLocation}</p>
              </li>
            </ul>
            <ul
              className='collection  col m5 '
              style={{
                marginLeft: '30px',
                marginTop: '30px',
                marginRight: '20px',
              }}
            >
              <li className='collection-item '>
                <h5>Unidad de empaquetamiento:</h5>
                <p> {this.state.Info.UnitPackage}</p>
              </li>
              <li className='collection-item '>
                <h5>Empaquetamiento:</h5>
                <p> {this.state.Info.OuterPackage}</p>
              </li>
              <li className='collection-item '>
                <h5>Cantidad de empaquetamiento:</h5>
                <p> {this.state.Info.QuantityPerOuter}</p>
              </li>
              <li className='collection-item'>
                <h5>Porcentaje de impuesto:</h5>
                <p> {this.state.Info['Porcentaje de impuesto']}</p>
              </li>
              <li className='collection-item '>
                <h5>Precio de venta:</h5>
                <p> {this.state.Info.RecommendedRetailPrice}</p>
              </li>
              <li className='collection-item '>
                <h5>Peso:</h5>
                <p>{this.state.Info.TypicalWeightPerUnit}</p>
              </li>
              <li className='collection-item '>
                <h5>Cantidad en stock:</h5>
                <p> {this.state.Info.QuantityOnHand}</p>
              </li>
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default withRouter(Producto);
