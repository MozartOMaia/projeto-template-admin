import Botao from "@/components/template/Botao";
import Layout from "@/components/template/Layout";
import useAuth from "@/data/hook/useAuth";
// import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Perfil() {
  const { usuario } = useAuth();
  const [nome, setNome] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [imagem, setImagem] = useState<string | undefined>("");
  // console.log(usuario);
  useEffect(() => {
    setEmail(usuario?.email);
    setNome(usuario?.nome);
    setImagem(usuario?.imagemUrl);
  }, [usuario]);

  const submit = (e: any) => {
    e.preventDefault();
    // const usersCollectionRef = firestore
  };

  return (
    <Layout
      titulo="Perfil"
      subtitulo="Administre as suas informações de usuário"
    >
      <div className="flex items-center justify-center">
        <form className=" rounded px-8 pt-6 pb-8 mb-4 w-1/3">
          <div className="flex flex-col">
            <label className="mb-1"> Nome </label>
            <input
              onChange={(e) => setNome(e.target.value)}
              className="text-blue-900 bg-gray-200 mb-2 p-2 rounded-md "
              value={nome}
            />
            <label className="mb-1"> Email </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="text-blue-900 bg-gray-200 mb-2 p-2 rounded-md"
              value={email}
            />
            <label className="mb-1"> Imagem </label>
            <input
              onChange={(e) => setImagem(e.target.value)}
              className="text-blue-900 bg-gray-200 mb-2 p-2 rounded-md"
              value={imagem}
            />
            <div className="flex justify-end">
              <Botao>Salvar</Botao>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
