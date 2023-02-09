interface EntradaProps {
  tipo?: "text" | "number";
  texto: string;
  valor: any;
  somenteLeitura?: boolean;
  valorMudou?: (valor: any) => void;
}

export default function Entrada(props: EntradaProps) {
  return (
    <div className="flex flex-col mt-2">
      <label className="ml-2">{props.texto}</label>
      <input
        type={props.tipo ?? "text"}
        value={props.valor}
        readOnly={props.somenteLeitura}
        onChange={(e) => props.valorMudou?.(e.target.value)}
        className={`
            border border-blue-500 rounded-lg focus:outline-none
             bg-gray-300 px-4 py-2 ${
               props.somenteLeitura ? "" : "focus:bg-white"
             } text-gray-700
        `}
      />
    </div>
  );
}
