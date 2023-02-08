import Client from "@/core/Cliente";

interface TabelaProps {
  clientes: Client[];
}

export default function Tabela(props: TabelaProps) {
  return (
    <table>
      <tr>
        <th>Código</th>
        <th>Nome</th>
        <th>Conteudo</th>
      </tr>
    </table>
  );
}
