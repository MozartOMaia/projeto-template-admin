import Head from "next/head";
import Image from "next/image";
import loading from "../../../public/images/loading.gif";
import useAuth from "@/data/hook/useAuth";
import Router from "next/router";

export default function ForcarAutenticacao(props) {
  const { usuario, carregando } = useAuth();

  function renderizarConteudo() {
    return <>{props.children}</>;
    //gambiarra abaixo
    // <Head>
    //     <script
    //       dangerouslySetInnerHTML={{
    //         __html: `
    //                     if(!document.cookie?.includes("admin-template-auth")) {
    //                     window.location.href = "/autenticacao"
    //                     }`,
    //       }}
    //      />
    //   </Head>
  }

  function renderizarCarregando() {
    return (
      <div
        className={`
        flex justify-center items-center h-screen
    `}
      >
        <Image src={loading} alt="gif de carregamento" />
      </div>
    );
  }

  if (!carregando && usuario?.email) {
    return renderizarConteudo();
  } else if (carregando) {
    return renderizarCarregando();
  } else {
    Router.push("/autenticacao");
    return null;
  }
}
