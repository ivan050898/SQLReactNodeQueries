import React, { Component } from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import DataTable from 'react-data-table-component';

const columnas = [
  {
    name: 'Nombre',
    selector: 'CustomerName',
    sortable: false,
  },
  {
    name: 'Categoría',
    selector: 'CustomerCategoryName',
    sortable: false,
  },
  {
    name: 'Método de entrega',
    selector: 'DeliveryMethod',
    sortable: false,
  },
];

const paginacion = {
  rowsPerPageText: 'Filas Por Pagina',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

class ClientesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Categorias: [],
      Clientes: [],
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
      .post('/VerClientesConFiltro', {
        NombreCliente: e.target.NombreCliente.value,
        categoria: e.target.categoria.value,
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
    axios.get('/VerClientes').then((result) => {
      this.setState({ Clientes: result.data });
    });
  }
  componentDidMount() {
    axios.get('/CategoriasClientes').then((result) => {
      this.setState({ Categorias: result.data });
      M.AutoInit();
    });
    axios.get('/VerClientes').then((result) => {
      this.setState({ Clientes: result.data });
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
                  id='InputCliente'
                  type='text'
                  className='validate'
                  name='NombreCliente'
                />
                <label htmlFor='InputCliente'>Nombre del cliente</label>
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
            <div className='row'>
              <div className='input-field col s6'>
                <select name='categoria'>
                  <option key={'-1'} value={''}>
                    Cualquiera
                  </option>
                  {this.state.Categorias.map((option, i) => (
                    <option key={i} value={option.CustomerCategoryName}>
                      {option.CustomerCategoryName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className='row'>
          <div className='card-panel z-depth-3'>
            <DataTable
              columns={columnas}
              data={this.state.Clientes}
              title='Seleccione un Cliente haciendo doble click en una fila'
              pagination
              paginationComponentOptions={paginacion}
              fixedHeader
              fixedHeaderScrollHeight='600px'
              className='highlight'
              highlightOnHover
              onRowDoubleClicked={this.SelectedRow}
            ></DataTable>
          </div>
        </div>
      </div>
    );
  }
}
export default ClientesPage;
