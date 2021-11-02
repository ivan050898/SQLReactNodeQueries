import React, { Component, Fragment } from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import DataTable from 'react-data-table-component';

const columnas = [
  {
    name: 'Nombre',
    selector: 'StockItemName',
    sortable: false,
  },
  {
    name: 'Grupo de stock',
    selector: 'StockGroupName',
    sortable: false,
  },
  {
    name: 'Cantidad a mano',
    selector: 'QuantityOnHand',
    sortable: false,
  },
];

const paginacion = {
  rowsPerPageText: 'Filas Por Pagina',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};
var CantidadSlider = 3;
class InventarioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Grupos: [],
      Productos: [],
      CantidadMax: 0,
    };
    this.SubmitHandler = this.SubmitHandler.bind(this);
    this.SelectedRow = this.SelectedRow.bind(this);
    this.ResetFiltros = this.ResetFiltros.bind(this);
    this.ChangeSlider = this.ChangeSlider.bind(this);
  }
  SelectedRow(e) {
    this.props.history.push({
      pathname: '/Producto',
      data: e.StockItemName, // your data array of objects
    });
  }
  ChangeSlider(e) {
    CantidadSlider = e.target.value;
    var output = document.getElementById('CantidadLabel'); //h:inputText
    output.value = CantidadSlider;
  }

  SubmitHandler(e) {
    e.preventDefault();
    axios
      .post('/VerProductosFiltro', {
        StockItemName: e.target.StockItemName.value,
        StockGroupName: e.target.Grupo.value,
        QuantityOnHandMax: e.target.QuantityOnHandMax.value,
      })
      .then((result) => {
        this.setState({ Productos: result.data.recordset });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  ResetFiltros(e) {
    e.preventDefault();
    axios.get('/VerProductos').then((result) => {
      this.setState({ Productos: result.data });
    });
  }
  componentDidMount() {
    axios.get('/VerStockGroups').then((result) => {
      this.setState({ Grupos: result.data });
      M.AutoInit();
    });
    axios.get('/VerProductos').then((result) => {
      this.setState({ Productos: result.data });
      M.AutoInit();
    });
    var array_of_dom_elements = document.querySelectorAll('input[type=range]');
    M.Range.init(array_of_dom_elements);
  }
  render() {
    return (
      <Fragment>
        <div className='container' style={{ marginTop: '50px' }}>
          <div className='row'>
            <form className='col s12' onSubmit={this.SubmitHandler}>
              <div className='row'>
                <div className='input-field col s6'>
                  <input
                    placeholder='Nombre'
                    id='inputProducto'
                    type='text'
                    className='validate'
                    name='StockItemName'
                  />
                  <label htmlFor='inputProducto'>Nombre del producto</label>
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
                  <select name='Grupo'>
                    <option key={'-1'} value={''}>
                      Cualquiera
                    </option>
                    {this.state.Grupos.map((option, i) => (
                      <option key={i} value={option.StockGroupName}>
                        {option.StockGroupName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='row'>
                <label>Cantidad a mano (máximo)</label>
                <p className='range-field'>
                  <input
                    type='range'
                    id='test'
                    name='QuantityOnHandMax'
                    min={3}
                    max={1034169}
                    onInput={this.ChangeSlider}
                  />
                  <output name='CantidadLabelName' id='CantidadLabel'>
                    {CantidadSlider}
                  </output>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className='card-panel z-depth-3'>
          <DataTable
            columns={columnas}
            data={this.state.Productos}
            title='Seleccione un Producto haciendo doble click en una fila'
            pagination
            paginationComponentOptions={paginacion}
            fixedHeader
            fixedHeaderScrollHeight='600px'
            className='highlight'
            highlightOnHover
            onRowDoubleClicked={this.SelectedRow}
          ></DataTable>
        </div>
      </Fragment>
    );
  }
}
export default InventarioPage;
