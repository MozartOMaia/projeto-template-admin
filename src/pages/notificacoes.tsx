import Layout from "@/components/template/Layout";
import { useEffect, useState } from "react";

export default function Notificacoes() {
  const [urlForm, setUrlForm] = useState("");
  const [srcImage, setSrcImage] = useState("");
  const [name, setName] = useState("");
  const [pesquisa, setPesquisa] = useState("ditto");
  const [inputTxt, setInput] = useState("");

  useEffect(() => {
    function buscarPokemon() {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pesquisa}`)
        .then((response) => response.json())
        .then((data) => {
          const { forms } = data;
          const { url, name } = forms[0];

          setName(name);
          setUrlForm(url);
        });

      fetch(urlForm)
        .then((response) => response.json())
        .then((data) => {
          const { sprites } = data;
          const { front_default } = sprites;
          setSrcImage(front_default);
        });
    }

    buscarPokemon();
  }, [urlForm, pesquisa]);

  return (
    <>
      <Layout
        titulo="Notificacoes"
        subtitulo="Aqui você irá gerenciar suas notificações"
      ></Layout>

      <div>
        <input
          onChange={(e) => setInput(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
           focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={inputTxt}
          placeholder="ditto"
        />
        <img src={srcImage}></img>
        <p>{name}</p>
        {/* <h1>Contador: {contador} </h1>
        <button
          onClick={() => setContador(contador * 2)}
          className="
        rounded-md bg-indigo-600 px-3.5 py-1.5 text-base 
        font-semibold leading-7 text-white shadow-sm
         hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
         focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Incrementar
        </button> */}
        <button
          onClick={() => setPesquisa(inputTxt)}
          className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base
           font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 
           focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-indigo-600"
        >
          Buscar pokemon
        </button>
      </div>
    </>
  );
}
