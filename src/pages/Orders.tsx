import React, { useEffect, useReducer, useContext } from 'react';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Order } from "../interfaces/Order";
import { Box, Button, Typography } from "@mui/material";
import { AuthContext } from '../context/auth/AuthContext';
import { Footer } from "../components/ui/Footer";
import ordersApi from "../api/ordersApi";
import { orderReducer, ORDERS_INITIAL_STATE } from "../context/orders";
import GetOut from "../components/ui/GetOut";
import * as XLSX from "xlsx";
import DownloadIcon from '@mui/icons-material/Download';
import { columns } from '../utils/columns';
import { Data } from '../interfaces/Data';
import { Datos } from '../interfaces/Datos';


function createData(
  createdAt: string,
  name: string,
  lastName: string,
  typeIdentification: string,
  numberIdentification: string,
  phone: number,
  email: string,
  service: string,
  product: string,
  price: number,
  paymentMethod: string
): Data {
  return {
    createdAt,
    name,
    lastName,
    typeIdentification,
    numberIdentification,
    phone,
    email,
    service,
    product,
    price,
    paymentMethod,
  };
}

function createRow(
  Fecha: string,
  Nombre: string,
  Apellido: string,
  Tipo_Identificación: string,
  Número_Identificación: string,
  Celular: number,
  Correo: string,
  Servicio: string,
  Producto: string,
  Precio: number,
  Método_Pago: string
): Datos {
  return {
    Fecha,
    Nombre,
    Apellido,
    Tipo_Identificación,
    Número_Identificación,
    Celular,
    Correo,
    Servicio,
    Producto,
    Precio,
    Método_Pago,
  };
}


const Orders = () => {

  const [ orders, setOrders ] = React.useState<Order[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { user } = useContext( AuthContext );
  const [ state, dispatch ] = useReducer(orderReducer, ORDERS_INITIAL_STATE);
  const { isLoggedIn } = useContext(AuthContext);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = orders.map((order) => {
    return createData(
      new Date(order.createdAt!).toLocaleDateString() +
        " - " +
        new Date(order.createdAt!).toLocaleTimeString(),
      order.name,
      order.lastName,
      order.typeIdentification,
      order.numberIdentification,
      order.phone,
      order.email,
      order.service,
      order.product,
      order.price,
      order.paymentMethod
    );
  });

  // This is the export data
  const filas = orders.map((order) => {
    return createRow(
      new Date(order.createdAt!).toLocaleDateString() +
        " - " +
        new Date(order.createdAt!).toLocaleTimeString(),
      order.name,
      order.lastName,
      order.typeIdentification,
      order.numberIdentification,
      order.phone,
      order.email,
      order.service,
      order.product,
      order.price,
      order.paymentMethod
    );
  });

  const refreshOrders = async () => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('TOKEN-USER')}`,
            'x-token': `${localStorage.getItem('TOKEN-USER')}`,
        }
    }

    if( user?.role === 'admin' || localStorage.getItem('TOKEN-USER') ){
        const { data } = await ordersApi.get<Order[]>('/getOrders', config);
        dispatch({ type: 'Orders - RefreshData', payload: data });
        setOrders(data);
    }

  }

  useEffect(() => {
    refreshOrders();
  }, [])

  const onDownloadXlsx = (e) => {
    e.preventDefault()
    let workBook = XLSX.utils.book_new()
    let workSheet = XLSX.utils.json_to_sheet(filas)

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Órdenes')
    XLSX.writeFile(workBook, `Órdenes_${new Date().toLocaleDateString()}.xlsx`)
  }

  return (
    <>
      <GetOut />
      {
        isLoggedIn && user?.role === 'admin' ? (
          <>
            <Box display='flex' justifyContent='space-between' margin='17px 2.5em'>
              <Box></Box>

              <Button color='success' onClick={onDownloadXlsx} sx={{padding: '5px 30px', color: '#fff', fontSize: '16px', '&:hover': {backgroundColor: '#56b05a',},}}>Exportar {<DownloadIcon />}</Button>
            </Box>

            <Paper sx={{ width: '97%', margin: '0 auto', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: '75%' }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth, fontWeight: 700, fontSize: 16, background: '#54acde', color: '#fff' }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.createdAt}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage='Órdenes por página'
              />
            </Paper>
          </>
        ) : (
          <Box>
            <Typography variant="h4" fontWeight={600} textAlign='center' marginTop={8}>No tienes permisos para ver las ordenes!</Typography>
            <Typography variant='body1' textAlign='center'>Comunicate con un Administrador...</Typography>
          </Box>
        )
      }
      <br />
      <br />
      <Footer />
    </>
  );

};


export default Orders;
