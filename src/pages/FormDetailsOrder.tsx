import React, { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  capitalize,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Link,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { LayoutOrders } from "../components/layouts/LayoutOrders";
import { blue } from "@mui/material/colors";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SaveIcon from '@mui/icons-material/Save';
import { OrderContext } from '../context/orders';
import { useForm } from "react-hook-form";
import { useNavigate, Link as LinkRRD } from 'react-router-dom';
import { validations } from "../utils";
import GetOut from "../components/ui/GetOut";
import { Loading } from "../components/ui/Loading";


type FormData = {
  nameCookies: string;
  lastNameCookies: string;
  phoneCookies: number;
  emailCookies: string;
  numberIdentificationCookies: string
  typeIdentificationCookies: string;
  service: string;
  product: string;
  price: number;
  paymentMethod: string;
};

export const FormDetailsOrder = () => {

  const { addOrder } = useContext(OrderContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const paymentMethods = ["Efectivo", "Tarjeta Débito", "Tarjeta de Crédito"];

  const [typePay, setTypePay] = useState('');
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const onTypePaymentChanged = (event: any) => {
    console.log(event.target.value);
    setTypePay(event.target.value);
    setTouched(true)
  };

  const dataOrder = {
    nameStorage: '',
    numberIdentificationStorage: '',
    typeIdentificationStorage: '',
    lastNameStorage: '',
    phoneStorage: '',
    emailStorage: ''
  }

  const getLocalStorage = () => {
    dataOrder['nameStorage'] = localStorage.getItem('name')!
    dataOrder['numberIdentificationStorage'] = localStorage.getItem('numberIdentification')!
    dataOrder.typeIdentificationStorage = localStorage.getItem('typeIdentification')!
    dataOrder.lastNameStorage = localStorage.getItem('lastName')!
    dataOrder.phoneStorage = localStorage.getItem('phone')!
    dataOrder.emailStorage = localStorage.getItem('email')!
    console.log({dataOrder})
  }

  const onSaveData = async ({
    service,
    product,
    price,
    paymentMethod,}: FormData) => {

    getLocalStorage();

    console.log({ dataOrder })

    setLoading(true);

    const isValidData = await addOrder( dataOrder.nameStorage!,
      dataOrder.lastNameStorage!,
      parseInt(dataOrder.phoneStorage!),
      dataOrder.emailStorage!,
      dataOrder.numberIdentificationStorage!,
      dataOrder.typeIdentificationStorage!,
      service,
      product,
      price,
      typePay);
    
    if (isValidData["_id"]) {

      localStorage.removeItem('name');
      localStorage.removeItem('numberIdentification');
      localStorage.removeItem('typeIdentification');
      localStorage.removeItem('lastName');
      localStorage.removeItem('phone');
      localStorage.removeItem('email');
      
      navigate('/');
      
      setLoading(false)
      
    }
        
  }


  return (
    <>
      {
        loading 
          ? ( <Loading /> ) 
          : (
            <>
              <GetOut />
              <LayoutOrders>
                <form onSubmit={ handleSubmit(onSaveData) }>
                  <Box sx={{ width: 350, padding: "10px 20px", margin: "0 auto" }}>
                    <Typography
                      variant="h2"
                      fontWeight={600}
                      fontSize="30px"
                      textAlign="center"
                      marginBottom={1}
                    >
                      Registro de órdenes
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={400}
                      fontSize="23px"
                      textAlign="center"
                      marginBottom={8}
                    >
                      Datos de servicio
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        marginBottom: "8%",
                        marginTop: "-12%",
                      }}
                    >
                      <Avatar sx={{ bgcolor: blue[500], opacity: 0.3 }}>1</Avatar>
                      <hr style={{ width: '255px', height: '2px', margin: 'auto 0' }}/>
                      <Avatar sx={{ bgcolor: blue[500] }}>2</Avatar>
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          label="Servicio"
                          autoComplete="off"
                          type="text"
                          variant="filled"
                          fullWidth
                          {
                            ...register('service', {
                              required: 'Este campo es requerido',
                              minLength: {
                                value: 3,
                                message: 'Debe de tener un mínimo de 3 caracteres.',
                              },
                              maxLength: {
                                value: 45,
                                message: 'Superaste el límite de caracteres, debe tener máximo 45.'
                              }
                            })
                          }
                          error={ !!errors.service }
                          helperText={ errors.service?.message }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Producto"
                          autoComplete="off"
                          type="text"
                          variant="filled"
                          fullWidth
                          {
                            ...register('product', {
                              minLength: {
                                value: 3,
                                message: 'Debe de tener un mínimo de 3 caracteres.'
                              },
                              maxLength: {
                                value: 45,
                                message: 'Superaste el límite de caracteres, debe tener máximo 45.'
                              }
                            })
                          }
                          error={ !!errors.product }
                          helperText={ errors.product?.message }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Precio"
                          autoComplete="off"
                          type="number"
                          variant="filled"
                          fullWidth
                          {
                            ...register('price', {
                              required: 'Este campo es requerido',
                              validate: (value) => validations.isPrice(value)
                            })
                          }
                          error={ !!errors.price }
                          helperText={ errors.price?.message }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl sx={{ mt: 3 }}>
                          <FormLabel>Metodo de Pago:</FormLabel>
                          <RadioGroup
                            row
                            value={typePay}
                            onChange={onTypePaymentChanged}
                          >
                            {paymentMethods.map((method) => (
                              <FormControlLabel
                                key={method}
                                value={method}
                                control={<Radio />}
                                label={capitalize(method)}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                          marginTop: 3
                        }}
                      >
                        <Grid>
                          <LinkRRD to="/newOrder" className="withoutUnderline">
                            <Link
                              display="flex"
                              alignItems="center"
                              style={{ cursor: "pointer" }}
                            >
                              <KeyboardReturnIcon />
                              <Typography variant="h6">Volver</Typography>
                            </Link>
                          </LinkRRD>
                        </Grid>
                        <Grid>
                          <Button 
                            type="submit"
                            className="circular-btn" 
                            size="large"
                            disabled={ !isValid || !touched }
                            sx={{ backgroundColor: 'secondary.main',
                                '&:hover': {
                                    backgroundColor: 'info.main',
                                }, 
                            }}
                          >
                            <SaveIcon />
                            <span style={{ marginLeft: 6 }}>Enviar</span>
                          </Button>
                        </Grid>
                      </Box>
                  </Box>
                </form>
              </LayoutOrders>
            </>
          )
      }
    </>
  );
};
