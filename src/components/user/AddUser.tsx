import React, { useState} from "react";
import { TextField, Button, Paper, Typography, Grid } from "@mui/material";
import { ApiService } from "../../infrastructure/http/ApiService";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { IUserAdd } from "../../core/entities/user/IUser";
import { RegisterUser } from "../../core/use-cases/user/RegisterUser";
import { CustomError } from "../../core/errors/CustomError";

interface AddUserProps {
    onUserAdded: () => void;
    onCancel: () => void;
}

const AddUser: React.FC<AddUserProps> = ({ onUserAdded, onCancel}) => {
    const [user, setUser] = useState<IUserAdd>({
        firstName: '',
        lastName: '',
        dni: '',
        email: '',
        phoneNumber: '',
        enabled: true,
        password: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(false);
        setError(null);
        setSuccess(false);

        const apiService = new ApiService();
        const userRepository = new UserRepository(apiService);
        const registerNewUser = new RegisterUser(userRepository);

        try {
            await registerNewUser.registerUser(user);
            setSuccess(true);
            onUserAdded();
            setUser({
                firstName: '',
                lastName: '',
                dni: '',
                email: '',
                phoneNumber: '',
                enabled: true,
                password: "",
            });
        } catch (err) {
            if (err instanceof CustomError) {
              setError(err.message);
            } else {
              setError('Error desconocido para buscar el usuario');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper style= {{ padding: 16 }}>
            <Typography variant="h6">Agregar Usuario</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label= "Nombre"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label= "Apellido"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label= "DNI"
                    name="dni"
                    value={user.dni}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label= "Email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label= "Teléfono"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label= "Contraseña"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />

                {error && <Typography color="error">{error}</Typography> }
                {success && <Typography color="primary">User added successfully!</Typography> }

                <Grid container spacing={2} justifyContent="flex-end" mb={2}>
                    <Grid item>
                        <Button color="secondary" onClick={onCancel}>
                            Salir
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained" color="primary" disabled={loading} >
                            {loading ? 'Adding...' : 'Agregar Usuario'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default AddUser;