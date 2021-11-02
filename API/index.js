const sql = require('mssql');
const express = require('express');
var cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const dbConfig = {
  user: 'sa',
  password: 'antihack123',
  server: 'localhost',
  database: 'WideWorldImporters',
  port: 1433,
};
const conn = new sql.ConnectionPool(dbConfig);

app.get('/api/VerClientes', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('NombreCliente', sql.VarChar(255), '');
      request.input('categoria', sql.VarChar(255), '');
      request.input('DeliveryMethod', sql.VarChar(255), '');
      request
        .query(
          'select CustomerName,CustomerCategoryName,DeliveryMethod from VerClientesConFiltro(@NombreCliente,@categoria,@DeliveryMethod) order by CustomerName asc'
        )
        .then(function (datos) {
          res.json(datos.recordset);
        })
        .catch(function (err) {
          res.send('Error de query');
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});

app.post('/api/VerClientesConFiltro', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('NombreCliente', sql.VarChar(255), req.body.NombreCliente);
      request.input('categoria', sql.VarChar(255), req.body.categoria);
      request.input('DeliveryMethod', sql.VarChar(255), '');

      request
        .query(
          'select CustomerName,CustomerCategoryName,DeliveryMethod from VerClientesConFiltro(@NombreCliente,@categoria,@DeliveryMethod) order by CustomerName asc'
        )
        .then(function (datos) {
          res.json(datos);
        })
        .catch(function (err) {
          res.send('Error de query');
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});

app.post('/api/VerCliente', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('NombreCliente', sql.VarChar(255), req.body.NombreCliente);
      request.input('categoria', sql.VarChar(255), '');
      request.input('DeliveryMethod', sql.VarChar(255), '');
      request
        .query(
          'select * from VerClientesConFiltro(@NombreCliente,@categoria,@DeliveryMethod) order by CustomerName asc'
        )
        .then(function (datos) {
          res.json(datos);
        })
        .catch(function (err) {
          res.send('Error de query');
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});

app.post('/api/VerCoordenadasCliente', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('NombreCliente', sql.VarChar(255), req.body.NombreCliente);
      request
        .query('select * from VerCoordenadasCliente(@NombreCliente)')
        .then(function (datos) {
          res.json(datos);
        })
        .catch(function (err) {
          res.send('Error de query');
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});

app.get('/api/VistaMetodosEntregaCliente', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query('select * from VistaMetodosEntregaCliente')
        .then(function (datos) {
          res.json(datos);
        })
        .catch(function (err) {
          res.send('Error de query');
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});

app.get('/api/CategoriasClientes', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query('select * from CategoriasClientes')
        .then(function (datos) {
          res.json(datos.recordset);
        })
        .catch(function (err) {
          res.send('Error de query');
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});
//--------------------------------------------FIN MODULO CLIENTES------------------------------------------------------------------------------------------
app.get('/api/VerProveedores', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('Nombre', sql.VarChar(255), '');
      request.input('categoria', sql.VarChar(255), '');
      request.input('DeliveryMethod', sql.VarChar(255), '');
      request
        .query(
          'select SupplierName,SupplierCategoryName,DeliveryMethod from VerProveedoresConFiltro(@Nombre,@categoria,@DeliveryMethod) order by SupplierName asc'
        )
        .then(function (datos) {
          res.json(datos.recordset);
        })
        .catch(function (err) {
          res.send('Error de query');
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});

app.post('/api/VerProveedoresFiltro', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('Nombre', sql.VarChar(255), req.body.Nombre);
      request.input('categoria', sql.VarChar(255), req.body.categoria);
      request.input(
        'DeliveryMethod',
        sql.VarChar(255),
        req.body.DeliveryMethod
      );
      request
        .query(
          'select SupplierName,SupplierCategoryName,DeliveryMethod from VerProveedoresConFiltro(@Nombre,@categoria,@DeliveryMethod) order by SupplierName asc'
        )
        .then(function (datos) {
          res.json(datos);
        })
        .catch(function (err) {
          res.send('Error de query');
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});

app.post('/api/VerProveedor', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('Nombre', sql.VarChar(255), req.body.Nombre);
      request.input('categoria', sql.VarChar(255), '');
      request.input('DeliveryMethod', sql.VarChar(255), '');
      request
        .query(
          'select * from VerProveedoresConFiltro(@Nombre,@categoria,@DeliveryMethod) order by SupplierName asc'
        )
        .then(function (datos) {
          res.json(datos);
        })
        .catch(function (err) {
          res.send('Error de query');
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});

app.post('/api/VerCoordenadasProveedor', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('Nombre', sql.VarChar(255), req.body.Nombre);

      request
        .query('select * from VerCoordenadasProveedor(@Nombre) ')
        .then(function (datos) {
          res.json(datos);
        })
        .catch(function (err) {
          res.send('Error de query');
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});

app.get('/api/CategoriasProveedores', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query('select * from CategoriasProveedores')
        .then(function (datos) {
          res.json(datos.recordset);
        })
        .catch(function (err) {
          res.send('Error de query');
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});

app.get('/api/VistaMetodosEntregaProveedor', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query('select * from VistaMetodosEntregaProveedor')
        .then(function (datos) {
          res.json(datos.recordset);
        })
        .catch(function (err) {
          res.send('Error de query');
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});

//--------------------------------------------FIN MODULO PROVEEDORES------------------------------------------------------------------------------------------
//min 3 max 1034169
app.get('/api/VerProductos', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('StockItemName', sql.VarChar(255), '');
      request.input('StockGroupName', sql.VarChar(255), '');
      request.input('QuantityOnHandMax', sql.Int, 1034169);

      request
        .query(
          'select StockItemName,StockGroupName,QuantityOnHand  from VerProductosConFiltro(@StockItemName,@StockGroupName,@QuantityOnHandMax) order by StockItemName asc'
        )
        .then(function (datos) {
          res.json(datos.recordset);
        })
        .catch(function (err) {
          res.send(err);
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});

app.post('/api/VerProductosFiltro', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('StockItemName', sql.VarChar(255), req.body.StockItemName);
      request.input(
        'StockGroupName',
        sql.VarChar(255),
        req.body.StockGroupName
      );
      request.input('QuantityOnHandMax', sql.Int, req.body.QuantityOnHandMax);
      request
        .query(
          'select StockItemName,StockGroupName,QuantityOnHand  from VerProductosConFiltro(@StockItemName,@StockGroupName,@QuantityOnHandMax) order by StockItemName asc'
        )
        .then(function (datos) {
          res.json(datos);
        })
        .catch(function (err) {
          res.send(err);
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});

app.post('/api/VerProducto', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('StockItemName', sql.VarChar(255), req.body.StockItemName);
      request.input('StockGroupName', sql.VarChar(255), '');
      request.input('QuantityOnHandMax', sql.Int, 1034169);
      request
        .query(
          'select * from VerProductosConFiltro(@StockItemName,@StockGroupName,@QuantityOnHandMax) order by StockItemName asc'
        )
        .then(function (datos) {
          res.json(datos);
        })
        .catch(function (err) {
          res.send(err);
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});

app.get('/api/VerStockGroups', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query(' select *  from VerStockGroups')
        .then(function (datos) {
          res.json(datos.recordset);
        })
        .catch(function (err) {
          res.send(err);
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});
//--------------------------------------------FIN MODULO PRODUCTOS------------------------------------------------------------------------------------------
app.get('/api/VerFacturas', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('Cliente', sql.VarChar(255), '');
      request.input('FechaMin', sql.Date, '2013-01-01');
      request.input('FechaMax', sql.Date, '2016-05-31');
      request.input('Monto', sql.Float,36829.90);
      request
        .query(
          'select  top(100) InvoiceID,CustomerName,DeliveryMethod,TransactionAmount,InvoiceDate from VerFacturasConFiltro(@Cliente,@FechaMin,@FechaMax,@Monto ) order by CustomerName asc'
        )
        .then(function (datos) {
          datos.recordset.map((key,i)=>(
            key.InvoiceDate=new Date(key.InvoiceDate).toISOString().split('T')[0]
          ));
          res.json(datos.recordset);
        })
        .catch(function (err) {
          res.send(err);
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});
app.post('/api/VerFactura', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('invoiceID', sql.Int, req.body.InvoiceID);
      request
        .query('select * from VerFactura(@invoiceID)')
        .then(function (datos) {
          res.json(datos);
        })
        .catch(function (err) {
          res.send(err);
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});
app.post('/api/VerLineasFactura', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('invoiceID', sql.Int, req.body.InvoiceID);
      request
        .query('select * from VerLineasFactura(@invoiceID)')
        .then(function (datos) {
          res.json(datos);
        })
        .catch(function (err) {
          res.send(err);
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});
app.get('/api/FechaMinFactura', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query(' select *  from FechaMinFactura')
        .then(function (datos) {
          datos.recordset.map((key,i)=>(
            key.FechaMin=new Date(key.FechaMin).toISOString().split('T')[0]
          ));
          res.json(datos);
        })
        .catch(function (err) {
          res.send(err);
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});

app.get('/api/FechaMaxFactura', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request
        .query(' select *  from FechaMaxFactura')
        .then(function (datos) {
          datos.recordset.map((key,i)=>(
            key.FechaMax=new Date(key.FechaMax).toISOString().split('T')[0]
          ));
          res.json(datos);
        })
        .catch(function (err) {
          res.send(err);
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});

app.post('/api/VerFacturaFiltro', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('Cliente', sql.VarChar(255), req.body.Cliente);
      request.input('FechaMin', sql.Date, req.body.FechaMin);
      request.input('FechaMax', sql.Date, req.body.FechaMax);
      request.input('Monto', sql.Float,req.body.Monto);

      request
        .query(
          'select  top(1000) InvoiceID,CustomerName,DeliveryMethod,TransactionAmount,InvoiceDate from VerFacturasConFiltro(@Cliente,@FechaMin,@FechaMax,@Monto ) order by CustomerName asc'
        )
        .then(function (datos) {
          datos.recordset.map((key,i)=>(
            key.InvoiceDate=new Date(key.InvoiceDate).toISOString().split('T')[0]
          ));
          res.json(datos);
        })
        .catch(function (err) {
          res.send(err);
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});
//----------------------FIN MODULO VENTAS / INICIO MODULO ESTADISTICAS
app.get('/api/VentasProveedor', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('Proveedor', sql.VarChar(255), '');
      request
        .query('select * from VentasProveedor(@Proveedor)')
        .then(function (datos) {
          res.json(datos.recordset);
        })
        .catch(function (err) {
          res.send(err);
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});

app.post('/api/VentasProveedorFiltro', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('Proveedor', sql.VarChar(255), req.body.Proveedor);
      request
        .query('select * from VentasProveedor(@Proveedor)')
        .then(function (datos) {
          res.json(datos);
        })
        .catch(function (err) {
          res.send(err);
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});
//-----------
app.get('/api/VentasCliente', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('Cliente', sql.VarChar(255), '');
      request
        .query('select * from VentasCliente(@Cliente)')
        .then(function (datos) {
          res.json(datos);
        })
        .catch(function (err) {
          res.send(err);
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});

app.post('/api/VentasClienteFiltro', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('Cliente', sql.VarChar(255), req.body.Cliente);
      request
        .query('select * from VentasCliente(@Cliente)')
        .then(function (datos) {
          res.json(datos);
        })
        .catch(function (err) {
          res.send(err);
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});
//----------------------------------
app.post('/api/top10productosFiltro', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('fechamin', sql.VarChar(255), req.body.fechamin);
      request.input('fechamax', sql.VarChar(255), req.body.fechamax);

      request
        .query(
          'select * from top10productos(@fechamin,@fechamax) order by ganancia desc'
        )
        .then(function (datos) {
          res.json(datos);
        })
        .catch(function (err) {
          res.send(err);
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});
//----

app.post('/api/top10clientesFiltro', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('fechamin', sql.VarChar(255), req.body.fechamin);
      request.input('fechamax', sql.VarChar(255), req.body.fechamax);
      request
        .query(
          'select * from top10clientes(@fechamin,@fechamax) order by cantidadFacturas desc'
        )
        .then(function (datos) {
          res.json(datos);
        })
        .catch(function (err) {
          res.send(err);
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});

app.post('/api/top10proveedoresFiltro', (req, res) => {
  conn
    .connect()
    .then(function () {
      var request = new sql.Request(conn);
      request.input('fechamin', sql.VarChar(255), req.body.fechamin);
      request.input('fechamax', sql.VarChar(255), req.body.fechamax);

      request
        .query(
          'select * from top10proveedores(@fechamin,@fechamax) order by cantidad desc'
        )
        .then(function (datos) {
          res.json(datos);
        })
        .catch(function (err) {
          res.send(err);
        });
    })
    .catch(function (err) {
      res.send('No hay resultados');
    });
});
//---------------------------------------------------------------------------------------------------------------------------------------

app.listen(5000, () => console.log('Server on'));
