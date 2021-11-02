import React, { Component } from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import DataTable from 'react-data-table-component';

const columnas = [
    {
      name: 'Categoria',
      selector: 'CustomerCategoryName',
      sortable: false,
    },
    {
      name: 'Nombre del proveedor',
      selector: 'CustomerName',
      sortable: false,
    },
    {
      name: 'Mímino',
      selector: 'minimo',
      sortable: false,
    },
    {
        name: 'Máximo',
        selector: 'maximo',
        sortable: false,
      },
      {
        name: 'Promedio',
        selector: 'promedio',
        sortable: false,
      },
  ];
  

export default class VentasProveedor extends Component {
    constructor(props) {
        super(props);
        this.state = {
          Clientes: [],
        };
        this.SubmitHandler = this.SubmitHandler.bind(this);
        this.ResetFiltros = this.ResetFiltros.bind(this);
      }
    
      SubmitHandler(e) {
        e.preventDefault();
        axios
          .post('/VentasClienteFiltro', {
            Cliente: e.target.Cliente.value,
          })
          .then((result) => {
            this.setState({ Clientes: result.data.recordset });
          })
          .catch(function (err) {
            console.log(err);
          });
      }
      ResetFiltros(e) {
        e.preventDefault();
        axios.get('/VentasCliente').then((result) => {
          this.setState({Clientes: result.data.recordset });
        });
      }
      componentDidMount() {
        axios.get('/VentasCliente').then((result) => {
          this.setState({ Clientes: result.data.recordset });
          M.AutoInit();
        });
      }
    render() {
        return (
        <div className='container' style={{ marginTop: '50px' }}>
        <div className='row'>
          <form className='col s12' onSubmit={this.SubmitHandler}>
            <div className='row'>
              <div className='input-field col s6'>
                <input
                  placeholder='Nombre'
                  id='InputProveedor'
                  type='text'
                  className='validate'
                  name='Cliente'
                />
                <label htmlFor='InputProveedor'>Nombre del Proveedor</label>
              </div>
              <div className='col s2'>
                <input
                  id='submitBtn'
                  type='submit'
                  className='btn'
                  value='Filtrar'
                />
              </div>
              <div className='col s3'>
                <button className='btn' onClick={this.ResetFiltros}>
                  Restaurar Filtros
                </button>
              </div>
            </div>
            
          </form>
        </div>
          <div className='card-panel z-depth-3' style={{ width: '1100px' }}>
            <DataTable
              columns={columnas}
              data={this.state.Clientes}
              fixedHeader
              fixedHeaderScrollHeight='600px'
              className='highlight'
              highlightOnHover

            ></DataTable>
        </div>
      </div>
        )
    }
}