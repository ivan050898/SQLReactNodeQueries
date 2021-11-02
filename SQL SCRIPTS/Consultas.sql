use WideWorldImporters
go

----------------------------------------------------------------------------------------------------------------------------------------- ver los clientes

IF OBJECT_ID('dbo.VerClientes') IS NOT NULL
  DROP FUNCTION VerClientes
GO
create function VerClientes()
returns table
as return
select wc.CustomerName,CustomerCategoryName, case when BuyingGroupName is null then 'No tiene' else BuyingGroupName end as BuyingGroupName,
PrimaryContact, case when AlternateContact is null then 'No tiene' else AlternateContact end as AlternateContact,
DeliveryMethod ,CityName,DeliveryPostalCode,wc.PhoneNumber,wc.FaxNumber,
PaymentDays,wc.WebsiteURL, CONCAT(DeliveryAddressLine1,', ',DeliveryAddressLine2) as Direccion
from  Website.Customers wc
inner join Sales.Customers sc on sc.CustomerID=wc.CustomerID 
go

----------------------------------------------------------------------------------------------------------------------------------------- ver las categorias de los clientes
go 
DROP VIEW if exists CategoriasClientes
go
create view CategoriasClientes
as 
select distinct(CustomerCategoryName) from VerClientes() 
go
----------------------------------------------------------------------------------------------------------------------------------------- ver los metodos de entrega de los clientes
go 
DROP VIEW if exists VistaMetodosEntregaCliente
go
create view VistaMetodosEntregaCliente
as 
select distinct(DeliveryMethod) from VerClientes()
go
-----------------------------------------------------------------------------------------------------------------------------------------clientes con filtro
go
IF OBJECT_ID('dbo.VerClientesConFiltro') IS NOT NULL
  DROP FUNCTION VerClientesConFiltro
GO
create function VerClientesConFiltro(@NombreCliente varchar(255),@categoria varchar(255),@DeliveryMethod varchar(255))
returns table 
as return 
select  *  from VerClientes() where  (@categoria='' or @categoria=CustomerCategoryName)
and (@NombreCliente='' or CustomerName like '%'+@NombreCliente+'%')
and (@DeliveryMethod='' or DeliveryMethod=@DeliveryMethod)

go
-----------------------------------------------------------------------------------------------------------------------------------------coordenadas mapa cliente

go
IF OBJECT_ID('dbo.VerCoordenadasCliente') IS NOT NULL
  DROP FUNCTION VerCoordenadasCliente
GO
create function VerCoordenadasCliente(@NombreCliente varchar(255))
returns table 
as return 
select replace(DeliveryLocation.Lat, ',' , '.' )   as latitud, replace(DeliveryLocation.Long, ',' , '.') as longitud from Website.Customers where Website.Customers.CustomerName=@NombreCliente 
go

-----------------------------------------------------------------------------------------------------------------------------------------VER LOS CLIENTES EN LA PANTALLA DE FILTRO
go 
DROP VIEW if exists VerClientesCorto
go
create view VerClientesCorto
as 
select CustomerName,CustomerCategoryName,DeliveryMethod from VerClientes()
go
-----------------------------------------------------------------------------------------------------------------------------------------
--Fin modulo clientes 

---Inicio modulo proveedores--
go 
IF OBJECT_ID('dbo.VerProveedores') IS NOT NULL
  DROP FUNCTION VerProveedores
GO
create function VerProveedores()
returns table 
as return 
select s.SupplierReference,s.SupplierName,SupplierCategoryName,PrimaryContact,AlternateContact, case when DeliveryMethod  is null then 'No tiene' else DeliveryMethod end as DeliveryMethod,
c.CityName as 'Ciudad de entrega',DeliveryPostalCode,s.PhoneNumber,s.FaxNumber,s.WebsiteURL,
case when DeliveryAddressLine1 = '' then DeliveryAddressLine2 else  CONCAT(DeliveryAddressLine1,', ',DeliveryAddressLine2)  end as Direccion,PaymentDays  from Website.Suppliers w
inner join Purchasing.Suppliers s on w.SupplierID=s.SupplierID
inner Join Application.Cities c on c.CityID=s.DeliveryCityID
go

--select *  from Purchasing.Suppliers w
-----------------------------------------------------------------------------------------------------------------------------------------coordenadas mapa proveedor

go
IF OBJECT_ID('dbo.VerCoordenadasProveedor') IS NOT NULL
  DROP FUNCTION VerCoordenadasProveedor
GO
create function VerCoordenadasProveedor(@Nombre varchar(255))
returns table 
as return 
select replace(DeliveryLocation.Lat, ',' , '.' )   as latitud, replace(DeliveryLocation.Long, ',' , '.') as longitud from  Website.Suppliers where @Nombre=SupplierName 
go


----------------------------------------------------------------------------------------------------------------------------------------- ver las categorias de los proveedores
go 
DROP VIEW if exists CategoriasProveedores
go
create view CategoriasProveedores
as 
select distinct(SupplierCategoryName) from VerProveedores() 
go
----------------------------------------------------------------------------------------------------------------------------------------- ver los metodos de entrega de los proveedores
go 
DROP VIEW if exists VistaMetodosEntregaProveedor
go
create view VistaMetodosEntregaProveedor 
as 
select distinct(DeliveryMethod) from VerProveedores()
go
----------------------------------------------------------------------------------------------------------------------------------------- ver los proveedore corto pantalla filtro
go 
DROP VIEW if exists VerProveedoresCorto
go
create view VerProveedoresCorto 
as 
select SupplierName,SupplierCategoryName,DeliveryMethod from VerProveedores()
go
-----------------------------------------------------------------------------------------------------------------------------------------proveedores con filtro
go
IF OBJECT_ID('dbo.VerProveedoresConFiltro') IS NOT NULL
  DROP FUNCTION VerProveedoresConFiltro
GO
create function VerProveedoresConFiltro(@Nombre varchar(255),@categoria varchar(255),@DeliveryMethod varchar(255))
returns table 
as return 
select  * from VerProveedores() where  (@categoria='' or @categoria=SupplierCategoryName)
and (@Nombre='' or SupplierName like '%'+@Nombre+'%')
and (@DeliveryMethod='' or DeliveryMethod=@DeliveryMethod)

go
-------------------------------------------------------------------------------------------------------------------------------------------------
--fin modulo proveedores

--Inicio Modulo Inventario
------------------------------------------------------------------------------------------------------------------------------------------------- Consigue a que stockgroup pertenece el articulo para los 227

go 
DROP VIEW if exists VerStockGroupItem
go
create view VerStockGroupItem
as
WITH stockitemgroups AS
(
   SELECT StockItemID,StockGroupID ,
         ROW_NUMBER() OVER (PARTITION BY StockItemId ORDER BY StockGroupID desc) AS rankeo
   FROM warehouse.stockitemstockgroups
)
SELECT StockItemID,StockGroupName
FROM stockitemgroups
inner join warehouse.stockgroups
on warehouse.stockgroups.StockGroupID=stockitemgroups.StockGroupID
WHERE rankeo = 1
go


-------------------------------------------------------------------------------------------------------------------------------------------------
go
IF OBJECT_ID('dbo.VerProductos') IS NOT NULL
  DROP FUNCTION VerProductos
GO
create function VerProductos()
returns table 
as return 
select si.StockItemName,StockGroupName , case when  ColorName is null then 'No tiene' else ColorName end as ColorName,pt1.PackageTypeName as UnitPackage,
pt2.PackageTypeName as OuterPackage,QuantityPerOuter,case when Brand is null then 'No tiene' else Brand end as Brand,
case when Size is null then 'No tiene' else Size end as Size ,ws.SupplierName,ws.WebsiteURL,cast(TaxRate as int) as 'Porcentaje de impuesto',RecommendedRetailPrice,
TypicalWeightPerUnit, SearchDetails,QuantityOnHand,BinLocation
from  warehouse.stockitems si 
inner join Website.Suppliers ws on ws.SupplierID=si.SupplierID
inner join VerStockGroupItem vsgi on vsgi.StockItemID=si.StockItemID
inner join warehouse.packagetypes pt1 on pt1.PackageTypeID=si.UnitPackageID
inner join warehouse.packagetypes pt2 on pt2.PackageTypeID=si.OuterPackageID
left join  warehouse.colors colors on (colors.ColorID=si.ColorID )
inner join warehouse.stockitemholdings h on h.StockItemID=si.StockItemID
go
-------------------------------------------------------------------------------------------------------------------------------------------------
go
IF OBJECT_ID('dbo.VerProductosCorto') IS NOT NULL
  DROP FUNCTION VerProductosCorto
GO
create function VerProductosCorto()
returns table 
as return 
select StockItemName,StockGroupName,QuantityOnHand from VerProductos() 
go
-------------------------------------------------------------------------------------------------------------------------------------------------
--select * from VerProductosConFiltro('','',1000)
go
IF OBJECT_ID('dbo.VerProductosConFiltro') IS NOT NULL
  DROP FUNCTION VerProductosConFiltro
GO
create function VerProductosConFiltro(@StockItemName varchar(255),@StockGroupName  varchar(255),@QuantityOnHandMax int)
returns table 
as return 
select   *  from VerProductos() where  (@StockGroupName='' or @StockGroupName=StockGroupName)
and (@StockItemName='' or StockItemName like '%'+@StockItemName+'%')
and (QuantityOnHand <= @QuantityOnHandMax)
go
-------------------------------------------------------------------------------------------------------------------------------------------------

go 
DROP VIEW if exists VerStockGroups
go
create view VerStockGroups 
as 
select  distinct(StockGroupName) from VerProductosCorto()
go
-------------------------------------------------------------------------------------------------------------------------------------------------
go 
DROP VIEW if exists VerQuantityOnHandMin
go
create view VerQuantityOnHandMin 
as 
select  min(QuantityOnHand) as minimo from VerProductosCorto()
go
-------------------------------------------------------------------------------------------------------------------------------------------------
go 
DROP VIEW if exists VerQuantityOnHandMax
go
create view VerQuantityOnHandMax 
as 
select  max(QuantityOnHand)as maximo from VerProductosCorto()
go
-------------------------------------------------------------------------------------------------------------------------------------------------
--fin modulo Inventario

--Inicio Modulo ventas 
-------------------------------------------------------------------------------------------------------------------------------------------------
--select * from VerFacturas()
go
IF OBJECT_ID('dbo.VerFacturas') IS NOT NULL
  DROP FUNCTION VerFacturas
GO
create function VerFacturas()
returns table 
as return 
select  si.invoiceID,CustomerName,websiteURL,DeliveryMethod, ord.CustomerPurchaseOrderNumber,p1.fullname as 'Persona de contacto',p2.fullname as 'vendedor',
InvoiceDate,si.DeliveryInstructions,TransactionAmount from sales.invoices si 
inner join  Website.Customers wc on wc.CustomerID=si.CustomerID
inner join sales.orders ord on ord.OrderID=si.OrderId
inner join application.people p1 on p1.PersonId=si.ContactPersonID
inner join application.people p2 on p2.PersonId=si.SalespersonPersonID
inner join sales.CustomerTransactions sct on sct.InvoiceID=si.InvoiceID
go
-------------------------------------------------------------------------------------------------------------------------------------------------
go
IF OBJECT_ID('dbo.VerFacturasCorto') IS NOT NULL
  DROP FUNCTION VerFacturasCorto
GO
create function VerFacturasCorto()
returns table 
as return 
select InvoiceID,CustomerName,DeliveryMethod,TransactionAmount, InvoiceDate from VerFacturas()   
go
-------------------------------------------------------------------------------------------------------------------------------------------------
go 
DROP VIEW if exists FechaMinFactura
go
create view FechaMinFactura 
as 
select  min(InvoiceDate) as FechaMin from VerFacturasCorto()
go
-------------------------------------------------------------------------------------------------------------------------------------------------
go 
DROP VIEW if exists FechaMaxFactura
go
create view FechaMaxFactura 
as 
select  max(InvoiceDate) as FechaMax from VerFacturasCorto()
go
-------------------------------------------------------------------------------------------------------------------------------------------------
go 
DROP VIEW if exists MaxMonto
go
create view MaxMonto 
as 
select Max(TransactionAmount) as maximo from VerFacturasCorto()
go
-------------------------------------------------------------------------------------------------------------------------------------------------
go 
DROP VIEW if exists MinMonto
go
create view MinMonto 
as 
select Min(TransactionAmount) as maximo from VerFacturasCorto()
go
---------------------------------------------------------------------------------------------------------------------------------------------------
--select * from  FechaMinFactura
go
IF OBJECT_ID('dbo.VerFacturasConFiltro') IS NOT NULL
  DROP FUNCTION VerFacturasConFiltro
GO
create function VerFacturasConFiltro(@Cliente varchar(255),@FechaMin date,@FechaMax Date,@Monto float )
returns table 
as return 
select * from VerFacturas()   where (@Cliente='' or CustomerName like '%'+@Cliente+'%') and (InvoiceDate between @FechaMin and  @FechaMax)
and (TransactionAmount<=@Monto)
go
-------------------------------------------------------------------------------------------------------------------------------------------------
go
IF OBJECT_ID('dbo.VerFactura') IS NOT NULL
  DROP FUNCTION VerFactura
GO
create function VerFactura(@invoiceID int)
returns table 
as return 
select * from VerFacturas() where invoiceID=@invoiceID
go
-------------------------------------------------------------------------------------------------------------------------------------------------

go
IF OBJECT_ID('dbo.VerLineasFactura') IS NOT NULL
  DROP FUNCTION VerLineasFactura
GO
create function VerLineasFactura(@numero int)
returns table 
as return 
select ws.StockItemName,si.Quantity,si.UnitPrice,cast(si.TaxRate  as int) as 'Porcentaje de impuesto',si.TaxAmount,si.ExtendedPrice  from sales.invoiceLines si
inner join Warehouse.stockitems ws on si.StockItemID=ws.StockItemID 
where InvoiceID=@numero
go


------------------------------------------------------ESTADISTICAS-------------------------------------------------------------------------------------------
--1 select * from VentasProveedor('fab')
go
IF OBJECT_ID('dbo.VentasProveedor') IS NOT NULL
  DROP FUNCTION VentasProveedor
GO
create function VentasProveedor(@Proveedor varchar(255))
returns table 
as return 
select case when GROUPING(sc.SupplierCategoryName)=1 then 'Total entre categorias' else sc.SupplierCategoryName end as SupplierCategoryName ,
case  when (grouping(ps.SupplierName)=1 and  GROUPING( sc.SupplierCategoryName)=1 ) then ' ' when grouping(ps.SupplierName)=1 then 'Total de categoria' else  ps.SupplierName end as SupplierName,
min(pst.TransactionAmount) as Minimo,
max(pst.TransactionAmount) as Maximo,avg(pst.TransactionAmount) as Promedio
from purchasing.Suppliers ps inner join
purchasing.SupplierCategories sc on ps.SupplierCategoryID=sc.SupplierCategoryID inner join
purchasing.SupplierTransactions pst on pst.SupplierID=ps.SupplierID inner join
purchasing.PurchaseOrders po on po.PurchaseOrderID=pst.PurchaseOrderID
Where ps.SupplierName like '%'+@Proveedor+'%'
group by rollup(sc.SupplierCategoryName,ps.SupplierName)

go

--2 select * from VentasCliente('')
 
go
IF OBJECT_ID('dbo.VentasCliente') IS NOT NULL
  DROP FUNCTION VentasCliente
GO
create function VentasCliente(@Cliente varchar(255))
returns table 
as return 
select case when GROUPING(CustomerCategoryName)=1 then 'total entre categorias' else CustomerCategoryName end as CustomerCategoryName,
case when (GROUPING(CustomerName)=1 and GROUPING(CustomerCategoryName)=1 ) then ' ' when GROUPING(CustomerName)=1 then 'Total de categoria' else CustomerName end as CustomerName,
min(ct.TransactionAmount) as minimo, max(ct.TransactionAmount) as maximo,
avg(ct.TransactionAmount) as promedio  from    Website.Customers wc inner join sales.CustomerTransactions ct on ct.CustomerID=wc.CustomerID
inner join sales.Invoices si on ct.InvoiceID=si.InvoiceID
Where CustomerName like '%'+@Cliente+'%'
group by rollup(CustomerCategoryName,CustomerName)
go

--3 , select * from top10productos('2013-01-01','2016-05-31') order by ganancia desc select * from FechaMaxFactura
IF OBJECT_ID('dbo.top10productos') IS NOT NULL
  DROP FUNCTION top10productos
GO
create function top10productos(@fechamin date ,@fechamax date)
returns table 
as return 
select distinct top 10 StockItemName as producto,max(LineProfit) as ganancia from sales.InvoiceLines  si
inner join  Warehouse.StockItems ws on ws.StockItemID=si.StockItemID
inner join  sales.Invoices sai on sai.InvoiceID=si.InvoiceID
where   (sai.InvoiceDate between @fechamin and @fechamax)  and LineProfit>0
group by StockItemName	
go

--4 select * from top10clientes('2016-04-01','2016-05-31') order by cantidadFacturas desc
--select * from top10clientes('2014-04-01','2016-05-31') order by cantidadFacturas desc
go
IF OBJECT_ID('dbo.top10clientes') IS NOT NULL
  DROP FUNCTION top10clientes
GO
create function top10clientes(@fechamin date ,@fechamax date)
returns table 
as return 
select top 10 CustomerName, count(i.invoiceID) as cantidadFacturas,sum (TransactionAmount) as sumatotal from Website.Customers wc inner join  sales.Invoices i
on i.CustomerID=wc.CustomerID
inner join sales.CustomerTransactions ct on ct.InvoiceID=i.InvoiceID
where   (i.InvoiceDate between @fechamin and @fechamax)  
group by CustomerName
go
 
--5  select * from top10proveedores('2013-01-01','2016-01-01') order by cantidad desc

go
IF OBJECT_ID('dbo.top10proveedores') IS NOT NULL
  DROP FUNCTION top10proveedores
GO
create function top10proveedores(@fechamin date ,@fechamax date)
returns table 
as return 
select  SupplierName,sum(TransactionAmount) total, count(po.PurchaseOrderID) cantidad from Purchasing.Suppliers ps 
inner join  Purchasing.SupplierTransactions pst on pst.SupplierID=ps.SupplierID
inner join  Purchasing.PurchaseOrders po on  po.PurchaseOrderID=pst.PurchaseOrderID
where OrderDate between @fechamin and @fechamax
group by SupplierName
go


