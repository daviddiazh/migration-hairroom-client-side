import React, { useState, useContext } from "react";
import {
  Avatar,
  Badge,
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRadioGroup } from "@mui/material/RadioGroup";
import { useForm } from "react-hook-form";
import { ErrorOutline } from "@mui/icons-material";
import { LayoutOrders } from "../components/layouts/LayoutOrders";
import { blue } from "@mui/material/colors";
import { OrderContext } from "../context/orders/OrderContext";
import { Link as LinkRRD, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { validations } from "../utils";
import GetOut from '../components/ui/GetOut';

type FormData = {
  name: string;
  numberIdentification: string;
  typeIdentification: string;
  lastName: string;
  phone: number;
  email: string;
  service: string;
  product: string;
  price: number;
  paymentMethod: string;
};

const NewOrder = () => {

    const typeDocument = [
        "Cédula de Ciudadanía",
        "Tarjeta de Identidad",
        "Pasaporte",
        "Cédula de Extranjería",
    ];

    const [typeDoc, setTypeDoc] = useState('');
    const [touched, setTouched] = useState(false);
    let navigate = useNavigate();

    const onTypeDocumentChanged = (event: any) => {
        console.log(event.target.value);
        setTypeDoc(event.target.value);
        setTouched(true);
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        mode: "onChange",
        reValidateMode: "onChange",
        });
    
    const onSaveData = async ({
        name,
        numberIdentification,
        typeIdentification,
        lastName,
        phone,
        email,
        service,
        product,
        price,
        paymentMethod,
    }: FormData) => {

        localStorage.setItem("name", name);
        localStorage.setItem("numberIdentification", numberIdentification);
        localStorage.setItem("typeIdentification", typeDoc);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("phone", String(phone));
        localStorage.setItem("email", email);

        navigate('/formDetailsOrder')

    };

    return (
        <div>
            <GetOut />

            <LayoutOrders>
                <form onSubmit={handleSubmit(onSaveData)} noValidate>
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
                        Datos personales
                    </Typography>
                    <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        marginBottom: "8%",
                        marginTop: "-12%",
                    }}
                    >
                    <Avatar sx={{ bgcolor: blue[500] }}>1</Avatar>
                    <hr style={{ width: "255px", height: "2px", margin: "auto 0" }} />
                    <Avatar sx={{ bgcolor: blue[500], opacity: 0.3 }}>2</Avatar>
                    </Box>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        label="Nombre"
                        autoComplete="off"
                        type="text"
                        variant="filled"
                        fullWidth
                        style={{ height: "50px"}}
                        defaultValue={localStorage.getItem("name")}
                        {...register("name", {
                            required: "Este campo es requerido",
                            minLength: {
                            value: 3,
                            message: "Debe de tener un mínimo de 3 caracteres.",
                            },
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        label="Apellidos"
                        autoComplete="off"
                        type="text"
                        variant="filled"
                        fullWidth
                        defaultValue={localStorage.getItem("lastName")}
                        {...register("lastName", {
                            required: "Este campo es requerido",
                            minLength: {
                            value: 3,
                            message: "Debe de tener un mínimo de 3 caracteres.",
                            },
                        })}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        label="Celular"
                        autoComplete="off"
                        type="number"
                        variant="filled"
                        fullWidth
                        defaultValue={localStorage.getItem("phone")}
                        {...register("phone", {
                            required: "Este campo es requerido",
                            validate: (value) => validations.isNumberPhone(value),
                            minLength: {
                            value: 10,
                            message: "Debe de tener un mínimo de 10 caracteres.",
                            },
                        })}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        label="Email"
                        autoComplete="off"
                        type="email"
                        variant="filled"
                        fullWidth
                        defaultValue={localStorage.getItem("email")}
                        {...register("email", {
                            //validate: (value) => validations.isEmail(value),
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        label="Número de Identificación"
                        autoComplete="off"
                        type="string"
                        variant="filled"
                        fullWidth
                        defaultValue={localStorage.getItem("numberIdentification")}
                        {...register("numberIdentification", {
                            required: "Este campo es requerido",
                        })}
                        error={!!errors.numberIdentification}
                        helperText={errors.numberIdentification?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                        <FormLabel>Tipo de Documento:</FormLabel>
                        <RadioGroup
                            row
                            value={typeDoc}
                            onChange={onTypeDocumentChanged}
                            defaultValue={localStorage.getItem("typeIdentification")}
                        >
                            {typeDocument.map((document) => (
                            <FormControlLabel
                                key={document}
                                value={document}
                                control={<Radio />}
                                label={capitalize(document)}
                            />
                            ))}
                        </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                        className="circular-btn"
                        size="large"
                        type="submit"
                        disabled={ !isValid || !touched }
                        sx={{ backgroundColor: 'secondary.main',
                                '&:hover': {
                                    backgroundColor: 'info.main',
                                }, 
                            }}
                        >
                        Siguiente
                        </Button>
                    </Grid>
                    </Grid>
                </Box>
                </form>
            </LayoutOrders>
        </div>
    );
};

export default NewOrder;