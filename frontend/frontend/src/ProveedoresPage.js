import React, { Component } from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import DataTable from 'react-data-table-component';

const columnas = [
  {
    name: 'Nombre',
    selector: 'SupplierName',
    sortable: false,
  },
  {
    name: 'Categoría',
    selector: 'SupplierCategoryName',
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

class ProveedoresPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Categorias: [],
      Proveedores: [],
      metodos: [],
    };
    this.SubmitHandler = this.SubmitHandler.bind(this);
    this.SelectedRow = this.SelectedRow.bind(this);
    this.ResetFiltros = this.ResetFiltros.bind(this);
  }
  SelectedRow(e) {
    this.props.history.push({
      pathname: '/Proveedor',
      data: e.SupplierName, // your data array of objects
    });
  }
  SubmitHandler(e) {
    e.preventDefault();
    axios
      .post('/VerProveedoresFiltro', {
        Nombre: e.target.Nombre.value,
        categoria: e.target.categoria.value,
        DeliveryMethod: e.target.DeliveryMethod.value,
      })
      .then((result) => {
        this.setState({ Proveedores: result.data.recordset });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  ResetFiltros(e) {
    e.preventDefault();
    axios.get('/VerProveedores').then((result) => {
      this.setState({ Proveedores: result.data });
    });
  }

  componentDidMount() {
    axios.get('/CategoriasProveedores').then((result) => {
      this.setState({ Categorias: result.data });
      M.AutoInit();
    });
    axios.get('/VerProveedores').then((result) => {
      this.setState({ Proveedores: result.data });
      M.AutoInit();
    });
    axios.get('/VistaMetodosEntregaProveedor').then((result) => {
      this.setState({ metodos: result.data });
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
                  name='Nombre'
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
            <div className='row'>
              <div className='input-field col s6'>
                <select name='categoria'>
                  <option key={'-1'} value={''}>
                    Cualquiera
                  </option>
                  {this.state.Categorias.map((option, i) => (
                    <option key={i} value={option.SupplierCategoryName}>
                      {option.SupplierCategoryName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s6'>
                <select name='DeliveryMethod'>
                  <option key={'-1'} value={''}>
                    Cualquiera
                  </option>
                  {this.state.metodos.map((option, i) => (
                    <option key={i} value={option.DeliveryMethod}>
                      {option.DeliveryMethod}
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
              data={this.state.Proveedores}
              title='Seleccione un Proveedor haciendo doble click en una fila'
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
export default ProveedoresPage;
