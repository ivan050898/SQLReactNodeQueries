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
      name: 'Cantidad de facturas',
      selector: 'cantidadFacturas',
      sortable: false,
    },{
        name: 'Monto total facturado',
        selector: 'sumatotal',
        sortable: false,
    },
    
  ];
  

export default class TopClientes extends Component {
    constructor(props) {
        super(props);
        this.state = {
          Productos: [],
          loading:true,
          error:false
        };
        this.SubmitHandler = this.SubmitHandler.bind(this);
        this.ResetFiltros = this.ResetFiltros.bind(this);
      }
    
      SubmitHandler(e) {
        e.preventDefault();
        this.setState({ loading:true });
        let fechamin=e.target.fechamin.value
        let fechamax=e.target.fechamax.value
        if(fechamax>fechamin){
            axios.post('/top10clientesFiltro',{
                fechamin:fechamin,
                fechamax:fechamax
            }).then((result) => {
              this.setState({ Productos: result.data.recordset });
    
            });
        }else{
            this.setState({ error:true });
            M.toast({html: 'Error: ¡Fechas incorrectas!',displayLength:4000,classes:"red"})
        }
        
       
      }
      ResetFiltros(e) {
        e.preventDefault();
        this.setState({ loading:true });
        axios.post('/top10clientesFiltro',{
            fechamin:'2013-01-01',
            fechamax:'2016-05-31'
        }).then((result) => {
          this.setState({ Productos: result.data.recordset });

        });

      }
      componentDidMount() {
        this.setState({ error:false });
        M.toast({html: 'Por favor espere mientras tramitamos su solicitud',displayLength:20000,classes:"teal lighten-2"})
        axios.post('/top10clientesFiltro',{
            fechamin:'2013-01-01',
            fechamax:'2016-05-31'
        }).then((result) => {
          this.setState({ Productos: result.data.recordset });
          M.AutoInit();
        });

      }
    render() {
        if (this.state.loading) {
            if (this.state.Productos !== 'undefined') {
              if (this.state.Productos.length > 0 ) {
                this.setState({ loading: false });
                if (this.state.error===false){
                    M.Toast.dismissAll();
                }
              }
            }
            return (
              <div>
                <h5>Cargando</h5>
              </div>
            );
          }
        return (
        <div className='container' style={{ marginTop: '50px' }}>
        <div className='row'>
          <form className='col s12' onSubmit={this.SubmitHandler}>
            <div className='row'>
            <div className='row'>
              <div className='input-field col s6'>
              <input type="Date" className="col s6" id='fechaMinima' min={"2013-01-01"} max={"2016-05-31"} placeholder="yyyy-mm-dd" name="fechamin"/>
              <label htmlFor='fechaMinima'>Fecha mínima</label>
            </div>
              </div>
              <div className='row'>
              <div className='input-field col s6'>
              <input type="Date" className="col s6" id='fechaMaxima' min={"2013-01-01"} max={"2016-05-31"} placeholder="yyyy-mm-dd"  name="fechamax"/>
              <label htmlFor='fechaMaxima'>Fecha máxima</label>
            </div>
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
              data={this.state.Productos}
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