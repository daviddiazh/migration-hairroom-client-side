// import React, { useContext } from "react";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import { OrderContext } from "../context/orders/OrderContext";
// import { Order } from "../interfaces/Order";
// import { Box, Button, Icon, Link, Typography } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { v4 as uuidv4 } from "uuid";
// import { AuthContext } from '../context/auth/AuthContext';
// import { useExcelDownloder } from 'react-xls';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import { Footer } from "../components/ui/Footer";
// import { useEffect, useReducer } from 'react';
// import ordersApi from "../api/ordersApi";
// import { orderReducer, ORDERS_INITIAL_STATE } from "../context/orders";
// import GetOut from "../components/ui/GetOut";


// interface Column {
//   id:
//     | "createdAt"
//     | "name"
//     | "lastName"
//     | "typeIdentification"
//     | "numberIdentification"
//     | "phone"
//     | "email"
//     | "service"
//     | "product"
//     | "price"
//     | "paymentMethod";
//   label: string;
//   minWidth?: number;
//   align?: "right";
//   format?: (value: number) => string;
// }

// const columns: readonly Column[] = [
//   { id: "createdAt", label: "Fecha del Pedido", minWidth: 20 },
//   { id: "name", label: "Nombre", minWidth: 100 },
//   { id: "lastName", label: "Apellido", minWidth: 100 },
//   {
//     id: "typeIdentification",
//     label: "Tipo de Documento",
//     minWidth: 50,
//     align: "right",
//   },
//   {
//     id: "numberIdentification",
//     label: "Número de Documento",
//     minWidth: 50,
//     align: "right",
//   },
//   {
//     id: "phone",
//     label: "Celular",
//     minWidth: 170,
//     align: "right",
//     format: (value: number) => value.toFixed(0),
//   },
//   {
//     id: "email",
//     label: "Correo Eléctronico",
//     minWidth: 100,
//     align: "right",
//   },
//   {
//     id: "service",
//     label: "Servicio",
//     minWidth: 150,
//     align: "right",
//   },
//   {
//     id: "product",
//     label: "Producto",
//     minWidth: 150,
//     align: "right",
//   },
//   {
//     id: "price",
//     label: "Precio",
//     minWidth: 20,
//     align: "right",
//     format: (value: number) => value.toFixed(2),
//   },
//   {
//     id: "paymentMethod",
//     label: "Método de Pago",
//     minWidth: 50,
//     align: "right",
//   },
// ];

// interface Data {
//   createdAt: string;
//   name: string;
//   lastName: string;
//   phone: number;
//   email: string;
//   numberIdentification: string;
//   typeIdentification: string;
//   service: string;
//   product: string;
//   price: number;
//   paymentMethod: string;
// }

// function createData(
//   createdAt: string,
//   name: string,
//   lastName: string,
//   typeIdentification: string,
//   numberIdentification: string,
//   phone: number,
//   email: string,
//   service: string,
//   product: string,
//   price: number,
//   paymentMethod: string
// ): Data {
//   return {
//     createdAt,
//     name,
//     lastName,
//     typeIdentification,
//     numberIdentification,
//     phone,
//     email,
//     service,
//     product,
//     price,
//     paymentMethod,
//   };
// }

// interface Props {
//   order: Order;
// }

// const Orders = () => {
//   const { orders } = useContext(OrderContext);

//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const rows = orders.map((order) => {
//     return createData(
//       new Date(order.createdAt!).toLocaleDateString() +
//         " - " +
//         new Date(order.createdAt!).toLocaleTimeString(),
//       order.name,
//       order.lastName,
//       order.typeIdentification,
//       order.numberIdentification,
//       order.phone,
//       order.email,
//       order.service,
//       order.product,
//       order.price,
//       order.paymentMethod
//     );
//   });

//   const uid = uuidv4;

//   const { user } = useContext( AuthContext );
//   const [ state, dispatch ] = useReducer(orderReducer, ORDERS_INITIAL_STATE);

//   const refreshClients = async () => {

//     if( true ){ //user?.role === 'admin'
//         const { data } = await ordersApi.get<Order[]>('/getOrders');
//         dispatch({ type: 'Orders - RefreshData', payload: data });
//     }

//   }

//   useEffect(() => {
//     refreshClients();
//   }, [])

//   const { ExcelDownloder, Type } = useExcelDownloder();

//   const data = {
//     Ordenes: orders.map((order) => {
//       return {
//         Fecha: new Date(order.createdAt!).toLocaleDateString() +
//           " - " +
//           new Date(order.createdAt!).toLocaleTimeString(),
//         Nombre: order.name,
//         Apellido: order.lastName,
//         Tipo_Identificacion: order.typeIdentification,
//         Cedula: order.numberIdentification,
//         Celular: order.phone,
//         Email: order.email,
//         Servicio: order.service,
//         Producto: order.product,
//         Precio: order.price,
//         Metodo_Pago: order.paymentMethod
//       };
//     })
//   };

//   return (
//     <>
//       <GetOut />
//       {
//         true  //user?.role === 'admin'
//         ? (
//           <>
//             <Box display='flex'>
//               <Box></Box>

//               <Box flex={1} />

//               <ExcelDownloder
//                 data={data}
//                 filename={`Ordenes_${new Date().toLocaleDateString()}`}
//                 type={Type.Button} 
//                 style={{ width: '13rem', height: '2.5rem', backgroundColor: '#4caf50', color: '#fff', borderRadius: '5px', border: '0px', cursor: 'pointer', fontWeight: '600', margin: '1rem 30px .9rem 0px' }}
//                 className='botonExportar'
//               >
//                 <Box display='center' marginLeft={2.2}>
//                   <Typography marginRight={.5}>Descargar Órdenes</Typography>
//                   <FileDownloadIcon />
//                   </Box>
//               </ExcelDownloder>
//             </Box>
            
//             <Paper sx={{ width: '95%', margin: '0 auto', overflow: 'hidden' }}>
//               <TableContainer sx={{ maxHeight: '75%' }}>
//                 <Table stickyHeader aria-label="sticky table">
//                   <TableHead>
//                     <TableRow>
//                       {columns.map((column) => (
//                         <TableCell
//                           key={column.id}
//                           align={column.align}
//                           style={{ minWidth: column.minWidth }}
//                         >
//                           {column.label}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {rows
//                       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                       .map((row) => {
//                         return (
//                           <TableRow hover role="checkbox" tabIndex={-1} key={row.createdAt}>
//                             {columns.map((column) => {
//                               const value = row[column.id];
//                               return (
//                                 <TableCell key={column.id} align={column.align}>
//                                   {column.format && typeof value === 'number'
//                                     ? column.format(value)
//                                     : value}
//                                 </TableCell>
//                               );
//                             })}
//                           </TableRow>
//                         );
//                       })}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//               <TablePagination
//                 rowsPerPageOptions={[10, 25, 50, 100]}
//                 component="div"
//                 count={rows.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//                 labelRowsPerPage='Órdenes por página'
//               />
//             </Paper>
//           </>
//         ) : (
//           <Box>
//             <Typography variant="h4" fontWeight={600} textAlign='center' marginTop={8}>No tienes permisos para ver las ordenes!</Typography>
//             <Typography variant='body1' textAlign='center'>Comunicate con un Administrador...</Typography>
//           </Box>
//         )
//       }
//       <br />
//       <br />
//       <Footer />
//     </>
//   );
// };


// export default Orders;







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
import { OrderContext } from "../context/orders/OrderContext";
import { Order } from "../interfaces/Order";
import { Box, Button, Icon, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from '../context/auth/AuthContext';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Footer } from "../components/ui/Footer";
import ordersApi from "../api/ordersApi";
import { orderReducer, ORDERS_INITIAL_STATE } from "../context/orders";
import GetOut from "../components/ui/GetOut";

import ReactExport from '../modules/types/react-data.export';
import ExcelFile from '../modules/types/react-data.export';
import ExcelSheet from '../modules/types/react-data.export';


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

interface Props {
  order: Order;
}




const Orders = () => {
  //const { orders } = useContext(OrderContext);
  //console.log('Las ordenes son: ', orders)
  const [ orders, setOrders ] = React.useState<Order[]>([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  const uid = uuidv4;

  const { user } = useContext( AuthContext );
  const [ state, dispatch ] = useReducer(orderReducer, ORDERS_INITIAL_STATE);

  const refreshOrders = async () => {

    console.log('USER: ', user);

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('TOKEN-USER')}`,
            'x-token': `${localStorage.getItem('TOKEN-USER')}`,
        }
    }

    if( user?.role === 'admin' || localStorage.getItem('TOKEN-USER') ){
        const { data } = await ordersApi.get<Order[]>('/getOrders', config);
        console.log('DATA', data)
        dispatch({ type: 'Orders - RefreshData', payload: data });
        setOrders(data);
    }

  }

  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    refreshOrders();
  }, [])

  

  const data = {
    Ordenes: orders.map((order) => {
      return {
        Fecha: new Date(order.createdAt!).toLocaleDateString() +
          " - " +
          new Date(order.createdAt!).toLocaleTimeString(),
        Nombre: order.name,
        Apellido: order.lastName,
        Tipo_Identificacion: order.typeIdentification,
        Cedula: order.numberIdentification,
        Celular: order.phone,
        Email: order.email,
        Servicio: order.service,
        Producto: order.product,
        Precio: order.price,
        Metodo_Pago: order.paymentMethod
      };
    })
  };

  const dataOrders = [
    {
      columns: [
        {title: 'Fecha de Creación', style: { font: { sz: 18, bold: true }, width: { wpx: 130 } }},
        {title: 'Nombre', style: { font: { sz: 18, bold: true }, width: { wpx: 130 } }},
        {title: 'Apellido', style: { font: { sz: 18, bold: true }, width: { wpx: 130 } }},
        {title: 'Tipo de Identificacion', style: { font: { sz: 18, bold: true }, width: { wpx: 130 } }},
        {title: 'Cedula', style: { font: { sz: 18, bold: true }, width: { wpx: 130 } }},
        {title: 'Celular', style: { font: { sz: 18, bold: true }, width: { wpx: 130 } }},
        {title: 'Email', style: { font: { sz: 18, bold: true }, width: { wpx: 130 } }},
        {title: 'Servicio', style: { font: { sz: 18, bold: true }, width: { wpx: 130 } }},
        {title: 'Producto', style: { font: { sz: 18, bold: true }, width: { wpx: 130 } }},
        {title: 'Precio', style: { font: { sz: 18, bold: true }, width: { wpx: 130 } }},
        {title: 'Metodo de Pago', style: { font: { sz: 18, bold: true }, width: { wpx: 130 } }},
      ],
      data: orders.map(data => [
        {value: data.createdAt, style: {font: {sz: "14"}}},
        {value: data.name, style: {font: {sz: "14"}}},
        {value: data.lastName, style: {font: {sz: "14"}}},
        {value: data.typeIdentification, style: {font: {sz: "14"}}},
        {value: data.numberIdentification, style: {font: {sz: "14"}}},
        {value: data.phone, style: {font: {sz: "14"}}},
        {value: data.email, style: {font: {sz: "14"}}},
        {value: data.service, style: {font: {sz: "14"}}},
        {value: data.product, style: {font: {sz: "14"}}},
        {value: data.price, style: {font: {sz: "14"}}},
        {value: data.paymentMethod, style: {font: {sz: "14"}}},
      ])
    }
  ]


  return (
    <>
      <GetOut />
      {
        isLoggedIn //&& user!.role === 'admin'
        ? (
          <>
            {/* <Box display='flex'>
              <Box></Box>

              <Box flex={1} />

                {
                  orders.length >= 1 ? (
                    <ExcelFile
                      filename="Ordenes" 
                      element={<button type="button" className="">Export Data</button>}
                    >
                      <ExcelSheet dataSet={[]} name="Ordenes Sheet" />
                    </ExcelFile>
                  ) : null
                }
            </Box> */}
            
            <Paper sx={{ width: '95%', margin: '0 auto', overflow: 'hidden' }}>
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
