import React, { Component, Fragment } from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import DataTable from 'react-data-table-component';

const columnas = [
  {
    name: 'Número de factura',
    selector: 'InvoiceID',
    sortable: false,
  },
  {
    name: 'Cliente',
    selector: 'CustomerName',
    sortable: false,
  },
  {
    name: 'Método de entrega',
    selector: 'DeliveryMethod',
    sortable: false,
  },
  {
    name: 'Monto',
    selector: 'TransactionAmount',
    sortable: false,
  },
  {
    name: 'Fecha',
    selector: 'InvoiceDate',
    sortable: false,
  },
];

const paginacion = {
  rowsPerPageText: 'Filas Por Pagina',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};
var CantidadSlider = 5.52;


class VentasPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Grupos: [],
      Facturas: [],
      CantidadMax: 0,
      minDate:0,
      maxDate:0
    };
    this.SubmitHandler = this.SubmitHandler.bind(this);
    this.SelectedRow = this.SelectedRow.bind(this);
    this.ResetFiltros = this.ResetFiltros.bind(this);
    this.ChangeSlider = this.ChangeSlider.bind(this);

  }

  SelectedRow(e) {
    this.props.history.push({
      pathname: '/Factura',
      data: e.InvoiceID, // your data array of objects
    });
  }
  ChangeSlider(e) {
    CantidadSlider = e.target.value;
    var output = document.getElementById('CantidadLabel'); //h:inputText
    output.value = CantidadSlider;
  }

  SubmitHandler(e) {
    e.preventDefault();
    let Cliente=  e.target.Cliente.value
    let FechaMax= (e.target.FechaMax.value===''? "2016-05-31":e.target.FechaMax.value) 
    let FechaMin= e.target.FechaMin.value===''? "2013-01-01":e.target.FechaMin.value
    let Monto= CantidadSlider
    if (FechaMax>FechaMin){
        M.toast({html: 'Por favor espere mientras tramitamos su solicitud',displayLength:20000,classes:"teal lighten-2"})
        axios
        .post('/VerFacturaFiltro', {
            Cliente: Cliente,
            FechaMin: FechaMin,
            FechaMax: FechaMax,
            Monto: Monto
        })
        .then((result) => {
          this.setState({ Facturas: result.data.recordset });
          M.Toast.dismissAll();
    
        })
        .catch(function (err) {
          console.log(err);
        });
    }
    else{
        M.toast({html: 'Error: ¡Las fechas seleccionadas son incorrectas!',displayLength:3000,classes:"red"})
    }

  


  }
  ResetFiltros(e) {
    e.preventDefault();
    axios.get('/VerFacturas').then((result) => {
      this.setState({ Facturas: result.data });
    });
  }
  componentDidMount() {

    axios.get('/VerFacturas').then((result) => {
      this.setState({ Facturas: result.data });
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
                    id='inputCliente'
                    type='text'
                    className='validate'
                    name='Cliente'
                  />
                  <label htmlFor='inputCliente'>Nombre del cliente</label>
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
              <input type="Date" className="col s6" id='fechaMinima' min={"2013-01-01"} max={"2016-05-31"} placeholder="yyyy-mm-dd" name="FechaMin"/>
              <label htmlFor='fechaMinima'>Fecha mínima</label>
            </div>
              </div>
              <div className='row'>
              <div className='input-field col s6'>
              <input type="Date" className="col s6" id='fechaMaxima' min={"2013-01-01"} max={"2016-05-31"} placeholder="yyyy-mm-dd"  name="FechaMax"/>
              <label htmlFor='fechaMaxima'>Fecha máxima</label>
            </div>
              </div>
              <div className='row'>
                <label>Monto (máximo)</label>
                <p className='range-field'>
                  <input
                    type='range'
                    id='test'
                    name='Monto'
                    min={5.52}
                    max={36829.90}
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
            data={this.state.Facturas}
            title='Seleccione una Factura haciendo doble click en una fila'
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
export default VentasPage;