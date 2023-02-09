import Client from "@/core/Cliente";
import ColecaoCliente from "@/backend/db/ColecaoCliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import { useEffect, useState } from "react";
import useTabelaOuForm from "./useTabelaOuForm";

export default function useClientes() {
  const repo: ClienteRepositorio = new ColecaoCliente();

  const { tabelaVisivel, exibirFormulario, exibirTabela } = useTabelaOuForm();

  const [cliente, setCliente] = useState<Client>(Client.vazio());
  const [clientes, setClientes] = useState<Client[]>([]);
  const [visivel, setVisivel] = useState<"tabela" | "form">("tabela");

  useEffect(() => {
    obterTodos();
  }, []);

  const obterTodos = () => {
    repo.obterTodos().then((clientes) => {
      setClientes(clientes);
      exibirTabela();
    });
  };

  const selecionarCliente = (cliente: Client) => {
    setCliente(cliente);
    // setVisivel("form");
    exibirFormulario();
    // console.log(cliente);
  };

  const novoCliente = (cliente: Client) => {
    setCliente(Client.vazio());
    // setVisivel("form");
    exibirFormulario();
    // console.log(cliente);
  };

  const excluirCliente = async (cliente: Client) => {
    await repo.excluir(cliente);
    obterTodos();
  };

  const salvarCliente = async (cliente: Client) => {
    await repo.salvar(cliente);
    obterTodos();
  };

  return {
    cliente,
    clientes,
    novoCliente,
    salvarCliente,
    excluirCliente,
    selecionarCliente,
    obterTodos,
    tabelaVisivel,
    exibirTabela,
  };
}
