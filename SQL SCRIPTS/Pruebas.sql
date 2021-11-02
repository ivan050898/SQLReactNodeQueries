select * from VerClientesConFiltro('','','')
select * from CategoriasClientes
select * from VistaMetodosEntregaCliente
select * from  VerProveedoresConFiltro('','','')
select * from VerStockGroupItem
select * from VerProductosConFiltro('','',20000)
select * from VerStockGroups
select * from  VerQuantityOnHandMin
select * from  VerQuantityOnHandMax
select * from FechaMinFactura
select * from FechaMaxFactura
select * from MaxMonto
select * from MinMonto
select * from VerFacturasConFiltro('','2013-01-01','2016-05-31',500000)
select * from VentasProveedor('fab')
select * from VentasCliente('')
select * from top10productos('2013-01-01','2016-05-31') order by ganancia desc
select * from top10clientes('2016-04-01','2016-05-31') order by cantidadFacturas desc
select * from top10proveedores('2013-01-01','2016-01-01') order by cantidad desc