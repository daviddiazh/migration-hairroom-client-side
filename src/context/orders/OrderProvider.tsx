import { FC, useContext, useEffect, useReducer } from 'react';
import { Order } from '../../interfaces/Order';
import { OrderContext, orderReducer } from './';
import authApi from '../../api/authApi';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../auth';

export interface OrdersState{
    orders: Order[];
}

export const ORDERS_INITIAL_STATE: OrdersState = {
    orders: [],
}

export const OrderProvider: React.FC<any> = ({ children }) => {

    const [ state, dispatch ] = useReducer(orderReducer, ORDERS_INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useContext(AuthContext);

    const addOrder = async ( name: string,
        lastName: string,
        phone: number,
        email: string,
        numberIdentification: string,
        typeIdentification: string,
        service: string,
        product: string,
        price: number,
        paymentMethod: string, ) => {

        const { data } = await authApi.post<Order>('/createOrder', { name, lastName, phone, email, numberIdentification, typeIdentification, service, product, price, paymentMethod, });
        dispatch({ type: 'Orders - AddNewOrder', payload: data })

        enqueueSnackbar('Órden agregada correctamente!', {
            variant: 'success',
            autoHideDuration: 2000,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        })

        return data;
    }

    // const updateClient = async () => {

    // }

    // const deleteClient =  async () => {
        
    // } //TODO: Estas funciones deben ir?

    const refreshOrders = async () => {

        console.log('USER: ', user);

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'x-token': `${localStorage.getItem('token')}`,
            }
        }

        if( user?.role === 'admin' ){
            const { data } = await authApi.get<Order[]>('/getOrders', config);
            dispatch({ type: 'Orders - RefreshData', payload: data });
        }

    }

    useEffect(() => {
        refreshOrders();
    }, [])
    

    return (
        <OrderContext.Provider value={{
            ...state,

            //Methods
            addOrder,
        }}>
            { children }
        </OrderContext.Provider>
    )
}