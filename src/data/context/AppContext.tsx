import { createContext, useEffect, useState } from "react";

// type Tema = "dark" | "";

interface AppContextProps {
  tema?: any;
  alternarTema?: () => void;
}
//como as propriedades são opcionais é possível criar
// o AppContext vazio
//e adicionar posteriormente no AppProvider
const AppContext = createContext<AppContextProps>({});

export function AppProvider(props: any) {
  const [tema, setTema] = useState<any>("dark");

  function alternarTema() {
    const novoTema = tema === "" ? "dark" : "";
    setTema(novoTema);
    localStorage.setItem("tema", novoTema);
  }

  useEffect(() => {
    const temaSalvo = localStorage.getItem("tema");
    setTema(temaSalvo);
  }, []);

  return (
    <AppContext.Provider
      value={{
        tema,
        alternarTema,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
export default AppContext;
