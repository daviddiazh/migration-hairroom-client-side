import { Column } from '../interfaces/Column';

export const columns: readonly Column[] = [
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