import Layout from "@/components/template/Layout";
// import Client from "@/core/Cliente";
import Tabela from "@/components/Tabela";
import Botao from "@/components/template/Botao";
import Formulario from "@/components/template/Formulario";
// import { useEffect, useState } from "react";
// import ClienteRepositorio from "@/core/ClienteRepositorio";
// import ColecaoCliente from "@/backend/db/ColecaoCliente";
import useClientes from "@/data/hook/useClientes";

export default function Cliente() {
  const {
    cliente,
    clientes,
    excluirCliente,
    selecionarCliente,
    salvarCliente,
    novoCliente,
    tabelaVisivel,
    exibirTabela,
  } = useClientes();

  return (
    <Layout titulo="Cadastro simples" subtitulo="">
      {tabelaVisivel ? (
        <>
          <div className="flex justify-start">
            <Botao
              onClick={novoCliente}
              type="button"
              cor="blue"
              className="w-1/4 mb-2"
            >
              Novo Cliente
            </Botao>
          </div>
          <Tabela
            clientes={clientes}
            clientSelecionado={selecionarCliente}
            clientExcluido={excluirCliente}
          ></Tabela>
        </>
      ) : (
        <Formulario
          cliente={cliente}
          clientMudou={salvarCliente}
          cancelado={() => {
            exibirTabela();
          }}
        ></Formulario>
      )}
    </Layout>
  );
}
