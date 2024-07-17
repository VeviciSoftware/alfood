import React, { useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import http from '../../../http';


const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() => {
       http.get<IRestaurante[]>('restaurantes/')
            .then(response => {
                setRestaurantes(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const excluir = (restauranteDeletar: IRestaurante) => {
        http.delete(`restaurantes/${restauranteDeletar.id}/`)
            .then(() => {
                const listRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteDeletar.id);
                setRestaurantes(listRestaurante);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map((restaurante) => (
                        <TableRow key={restaurante.id}>
                            <TableCell>{restaurante.nome}</TableCell>
                            <TableCell>
                                <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link> 
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" color="error" onClick={() => excluir(restaurante)}>
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AdministracaoRestaurantes;