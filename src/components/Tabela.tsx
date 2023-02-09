import Client from "@/core/Cliente";
import { IconeEdicao, IconeLixo } from "./icons";

interface TabelaProps {
  clientes: Client[];
  clientSelecionado?: (cliente: Client) => void;
  clientExcluido?: (cliente: Client) => void;
}

export default function Tabela(props: TabelaProps) {
  const exibirAcoes = props.clientExcluido || props.clientSelecionado;

  function renderizarCabecalho() {
    return (
      <tr>
        <th className="text-left p-4">Código</th>
        <th className="text-left p-4">Nome</th>
        <th className="text-left p-4">Conteudo</th>
        {exibirAcoes ? <th className="text-left p-4">Ações</th> : false}
      </tr>
    );
  }

  function renderizarDados() {
    return props.clientes?.map((client, i) => {
      return (
        <tr
          key={client.id}
          className={`${
            i % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
          } text-gray-200`}
        >
          <td className="text-left p-4">{client.id}</td>
          <td className="text-left p-4">{client.nome}</td>
          <td className="text-left p-4">{client.idade}</td>
          {exibirAcoes ? renderizarAcoes(client) : false}
        </tr>
      );
    });
  }

  function renderizarAcoes(cliente: Client) {
    return (
      <td className="flex">
        {props.clientSelecionado ? (
          <button
            onClick={() => props.clientSelecionado?.(cliente)}
            className={`
          flex flex-col justify-center items-center
          text-green-600 rounded-full p-2 m-1
          hover:bg-gray-500
        `}
          >
            {IconeEdicao}
          </button>
        ) : (
          false
        )}

        {props.clientExcluido ? (
          <button
            onClick={() => props.clientExcluido?.(cliente)}
            className={`
          flex flex-col justify-center items-center
          text-red-600 rounded-full p-2 m-1
          hover:bg-gray-500
        `}
          >
            {IconeLixo}
          </button>
        ) : (
          false
        )}
      </td>
    );
  }

  return (
    <table className="w-full rounded-xl overflow-hidden ">
      <thead
        className={`
        bg-gradient-to-r from-blue-700 to-blue-800 text-gray-200
      `}
      >
        {renderizarCabecalho()}
      </thead>
      <tbody>{renderizarDados()}</tbody>
    </table>
  );
}
