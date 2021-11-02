import React, { Component } from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import DataTable from 'react-data-table-component';

const columnas = [
    {
      name: 'Categoria',
      selector: 'SupplierCategoryName',
      sortable: false,
    },
    {
      name: 'Nombre del proveedor',
      selector: 'SupplierName',
      sortable: false,
    },
    {
      name: 'Mímino',
      selector: 'Minimo',
      sortable: false,
    },
    {
        name: 'Máximo',
        selector: 'Maximo',
        sortable: false,
      },
      {
        name: 'Promedio',
        selector: 'Promedio',
        sortable: false,
      },
  ];
  

export default class VentasProveedor extends Component {
    constructor(props) {
        super(props);
        this.state = {
          Categorias: [],
          Proveedores: [],
        };
        this.SubmitHandler = this.SubmitHandler.bind(this);
        this.SelectedRow = this.SelectedRow.bind(this);
        this.ResetFiltros = this.ResetFiltros.bind(this);
      }
      SelectedRow(e) {
        this.props.history.push({
          pathname: '/Cliente',
          data: e.CustomerName, // your data array of objects
        });
      }
      SubmitHandler(e) {
        e.preventDefault();
        axios
          .post('/VentasProveedorFiltro', {
            Proveedor: e.target.Proveedor.value,
          })
          .then((result) => {
            this.setState({ Proveedores: result.data.recordset });
            console.log(result)
          })
          .catch(function (err) {
            console.log(err);
          });
      }
      ResetFiltros(e) {
        e.preventDefault();
        axios.get('/VentasProveedor').then((result) => {
          this.setState({ Proveedores: result.data });
        });
      }
      componentDidMount() {
        axios.get('/VentasProveedor').then((result) => {
          this.setState({ Proveedores: result.data });
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
                  name='Proveedor'
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
              data={this.state.Proveedores}
              title='Seleccione un Proveedor haciendo doble click en una fila'
              fixedHeader
              fixedHeaderScrollHeight='600px'
              className='highlight'
              highlightOnHover
              onRowDoubleClicked={this.SelectedRow}

            ></DataTable>
        </div>
      </div>
        )
    }
}
