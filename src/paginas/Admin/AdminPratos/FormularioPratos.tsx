import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const FormularioPratos = () => {
  const { id } = useParams<{ id: string }>();
  const [nomePrato, setNomePrato] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurante, setRestaurante] = useState("");
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [imagem, setImagem] = useState<File | null>(null);

  useEffect(() => {
    http
      .get<{ tags: ITag[] }>("tags/")
      .then((response) => setTags(response.data.tags));
    http
      .get<IRestaurante[]>("restaurantes/")
      .then((response) => setRestaurantes(response.data));

    if (id) {
      http
        .get(`pratos/${id}/`)
        .then((response) => {
          setNomePrato(response.data.nome);
          setDescricao(response.data.descricao);
          setTag(response.data.tag);
          setRestaurante(response.data.restaurante);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
    }
  };

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const formData = new FormData();
    formData.append("nome", nomePrato);
    formData.append("descricao", descricao);
    formData.append("tag", tag);
    formData.append("restaurante", restaurante);

    if (imagem) {
      formData.append("imagem", imagem);
    }

    const metodo = id ? "PUT" : "POST";
    const url = id ? `pratos/${id}/` : "pratos/";

    http
      .request({
        url: url,
        method: metodo,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
      .then(() => {
        setNomePrato("");
        setDescricao("");
        setTag("");
        setRestaurante("");
        setImagem(null);
        alert(`Prato ${id ? "atualizado" : "cadastrado"} com sucesso!`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 1 }}>
        <Paper sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h6">
              Cadastro de Prato
            </Typography>
            <Box
              component="form"
              sx={{ width: "100%" }}
              onSubmit={aoSubmeterForm}
            >
              <TextField
                value={nomePrato}
                onChange={(evento) => setNomePrato(evento.target.value)}
                label="Nome do prato"
                variant="standard"
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                value={descricao}
                onChange={(evento) => setDescricao(evento.target.value)}
                label="Descrição do prato"
                variant="standard"
                fullWidth
                required
                sx={{ mb: 2 }}
              />

              <FormControl margin="dense" fullWidth sx={{ mb: 2 }}>
                <InputLabel id="select-tag">Tag</InputLabel>
                <Select
                  labelId="select-tag"
                  value={tag}
                  onChange={(evento) => setTag(evento.target.value)}
                >
                  {tags.map((tag) => (
                    <MenuItem key={tag.id} value={tag.value}>
                      {tag.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl margin="dense" fullWidth sx={{ mb: 2 }}>
                <InputLabel id="select-restaurante">Restaurante</InputLabel>
                <Select
                  labelId="select-restaurante"
                  value={restaurante}
                  onChange={(evento) => setRestaurante(evento.target.value)}
                >
                  {restaurantes.map((restaurante) => (
                    <MenuItem key={restaurante.id} value={restaurante.id}>
                      {restaurante.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <input
                type="file"
                onChange={selecionarArquivo}
                style={{ marginBottom: "16px" }}
              />

              <Button
                sx={{ marginTop: 1 }}
                type="submit"
                fullWidth
                variant="outlined"
              >
                Salvar
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default FormularioPratos;
