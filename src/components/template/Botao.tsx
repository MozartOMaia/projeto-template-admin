interface BotaoProps {
  cor?: "green" | "blue" | "gray";
  children?: any;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void | undefined;
}

export default function Botao(props: BotaoProps) {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={`
    bg-gradient-to-r from-blue-400 to-blue-700
    text-white px-4 py-2 rounded-md ${props.className}
  `}
    >
      {props.children}
    </button>
  );
}
