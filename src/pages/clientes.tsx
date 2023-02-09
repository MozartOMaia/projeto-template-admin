import Layout from "@/components/template/Layout";
import Client from "@/core/Cliente";
import Tabela from "@/components/Tabela";
import Botao from "@/components/template/Botao";

export default function Cliente() {
  const clientes = [
    new Client("Ana", 34, "1"),
    new Client("Bia", 26, "2"),
    new Client("Carlos", 16, "3"),
    new Client("Pedro", 34, "4"),
  ];

  function clienteSelecionado(cliente: Client) {
    console.log(cliente);
  }

  function clienteExcluido(cliente: Client) {
    console.log("excluindo", cliente.nome);
  }

  return (
    <Layout titulo="Cadastro simples" subtitulo="">
      <Botao>Novo Cliente</Botao>
      <Tabela
        clientes={clientes}
        clientSelecionado={clienteSelecionado}
        clientExcluido={clienteExcluido}
      ></Tabela>
    </Layout>
  );
}
