import Entrada from "./Entrada";
import Cliente from "../../core/Cliente";
import { useState } from "react";
import Botao from "./Botao";
import Client from "../../core/Cliente";

interface FormularioProps {
  cliente: Cliente;
  clientMudou?: (cliente: Cliente) => void;
  cancelado?: () => void;
}

export default function Formulario(props: FormularioProps) {
  const id = props.cliente?.id;
  const [nome, setNome] = useState(props.cliente?.nome ?? "");
  const [idade, setIdade] = useState(props.cliente?.idade ?? 0);

  return (
    <div className="flex flex-col justify-start items-start">
      {id ? (
        <Entrada somenteLeitura texto="Código" valor={id}></Entrada>
      ) : (
        false
      )}
      <Entrada texto="Nome" valor={nome} valorMudou={setNome}></Entrada>
      <Entrada
        texto="Idade"
        tipo="number"
        valor={idade}
        valorMudou={setIdade}
      ></Entrada>
      <div>
        <Botao
          type="button"
          className="mr-2 mt-2"
          onClick={() => props.clientMudou?.(new Client(nome, idade, id))}
        >
          {id ? "Alterar" : "Salvar"}
        </Botao>
        <Botao onClick={props.cancelado}>Cancelar</Botao>
      </div>
    </div>
  );
}
