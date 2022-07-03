import { useEffect, useReducer } from 'react';
import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Order } from "../interfaces/Order";
import { Box, Button, Icon, Link, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from '../context/auth/AuthContext';
import { Footer } from "../components/ui/Footer";
import ordersApi from "../api/ordersApi";
import { orderReducer, ORDERS_INITIAL_STATE } from "../context/orders";
import GetOut from "../components/ui/GetOut";
import * as XLSX from "xlsx";
import DownloadIcon from '@mui/icons-material/Download';


interface Column {
  id:
    | "createdAt"
    | "name"
    | "lastName"
    | "typeIdentification"
    | "numberIdentification"
    | "phone"
    | "email"
    | "service"
    | "product"
    | "price"
    | "paymentMethod";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "createdAt", label: "Fecha del Pedido", minWidth: 20 },
  { id: "name", label: "Nombre", minWidth: 100 },
  { id: "lastName", label: "Apellido", minWidth: 100 },
  {
    id: "typeIdentification",
    label: "Tipo de Documento",
    minWidth: 50,
    align: "right",
  },
  {
    id: "numberIdentification",
    label: "Número de Documento",
    minWidth: 50,
    align: "right",
  },
  {
    id: "phone",
    label: "Celular",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(0),
  },
  {
    id: "email",
    label: "Correo Eléctronico",
    minWidth: 100,
    align: "right",
  },
  {
    id: "service",
    label: "Servicio",
    minWidth: 150,
    align: "right",
  },
  {
    id: "product",
    label: "Producto",
    minWidth: 150,
    align: "right",
  },
  {
    id: "price",
    label: "Precio",
    minWidth: 20,
    align: "right",
  },
  {
    id: "paymentMethod",
    label: "Método de Pago",
    minWidth: 50,
    align: "right",
  },
];

interface Data {
  createdAt: string;
  name: string;
  lastName: string;
  phone: number;
  email: string;
  numberIdentification: string;
  typeIdentification: string;
  service: string;
  product: string;
  price: number;
  paymentMethod: string;
}

interface Datos {
  Fecha: string;
  Nombre: string;
  Apellido: string;
  Celular: number;
  Correo: string;
  Número_Identificación: string;
  Tipo_Identificación: string;
  Servicio: string;
  Producto: string;
  Precio: number;
  Método_Pago: string;
}

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

function crearFila(
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

  // Esto es lo que se exporta
  const filas = orders.map((order) => {
    return crearFila(
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
                          style={{ minWidth: column.minWidth }}
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
