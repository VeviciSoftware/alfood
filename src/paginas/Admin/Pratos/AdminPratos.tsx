import React, { useEffect, useState } from 'react';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import http from '../../../http';
import IPrato from '../../../interfaces/IPrato';


const AdministracaoPratos = () => {

    const [pratos, setPratos] = useState<IPrato[]>([]);

    useEffect(() => {
       http.get<IPrato[]>('pratos/')
            .then(response => {
                setPratos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const excluir = (pratoDeletar: IPrato) => {
        http.delete(`pratos/${pratoDeletar.id}/`)
            .then(() => {
                const listPratos = pratos.filter(pratos => pratos.id !== pratoDeletar.id);
                setPratos(listPratos);
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
                        <TableCell>Descrição</TableCell>
                        <TableCell>Tag</TableCell>
                        <TableCell>Imagem</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map((prato) => (
                        <TableRow key={prato.id}>
                            <TableCell>{prato.nome}</TableCell>
                            <TableCell>{prato.descricao}</TableCell>
                            <TableCell>{prato.tag}</TableCell>
                            <TableCell><a href={prato.imagem} rel='norrefer' target="blank">Ver Imagem</a></TableCell>
                            <TableCell>
                                <Link to={`/admin/pratos/${prato.id}`}>Editar</Link> 
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" color="error" onClick={() => excluir(prato)}>
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

export default AdministracaoPratos;