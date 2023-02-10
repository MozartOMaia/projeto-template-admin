import Botao from "@/components/template/Botao";
import Layout from "@/components/template/Layout";
import useAuth from "@/data/hook/useAuth";
import firebase from "@/firebase/config";
import { useEffect, useState } from "react";
import { storage } from "@/firebase/config";

export default function Perfil() {
  const { usuario } = useAuth();
  const [nome, setNome] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [imagem, setImagem] = useState<any>({});
  const [tipoImg, settipoImg] = useState<string>("");
  // console.log(usuario);
  useEffect(() => {
    setEmail(usuario?.email);
    setNome(usuario?.nome);
    setImagem(usuario?.imagemUrl);
  }, [usuario]);

  const submit = async (e: any) => {
    e.preventDefault();

    if (imagem) {
      console.log(tipoImg);
      const ref = firebase.storage().ref(`users/${usuario?.uid}`);
      ref
        .child(`avatar.png`)
        .put(imagem)
        .then((snapshot) => {
          console.log("snapshot", snapshot);
          ref
            .child(`avatar.png`)
            .getDownloadURL()
            .then((url) => {
              console.log("string para downloadl", url);
            });
        });
    } else {
      console.warn("Arquivo não encontrado!");
    }

    const query = firebase
      .firestore()
      .collection("users")
      .where("user_id", "==", usuario?.uid);

    query
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          firebase.firestore().collection("users").add({
            nome,
            email,
            user_id: usuario?.uid,
          });
        } else {
          const docRef = querySnapshot.docs[0].ref;

          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                console.log("Documento encontrado:", doc.data());

                // Atualize o documento
                docRef.update({
                  nome,
                  email,
                  imagem,
                });
              } else {
                console.log("Documento não encontrado");
              }
            })
            .catch((error) => {
              console.error("Erro ao buscar o documento:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Erro ao executar a query:", error);
      });
  };

  //   querySnapshot.forEach(async (doc) => {
  //     const documento = firebase
  //       .firestore()
  //       .collection("users")
  //       .doc(doc.id);
  //     console.log(doc.data());
  //     if (doc.data()) {
  //       await documento.set({ nome, email, imagem, user_id: usuario?.uid });
  //     } else {
  //       await firebase
  //         .firestore()
  //         .collection("users")
  //         .add({ nome, email, imagem, user_id: usuario?.uid });
  //     }
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // })
  // .catch((error) => {
  //   console.log("Error getting documents: ", error);
  // });

  // const collectionRef = await firebase.firestore().collection("users");
  // const query = await collectionRef
  //   .where("user_id", "==", usuario?.uid)
  //   .get();
  // // console.log(query);
  // await firebase
  //   .firestore()
  //   .collection("users")
  //   .add({ nome, email, imagem, user_id: usuario?.uid });
  // };

  return (
    <Layout
      titulo="Perfil"
      subtitulo="Administre as suas informações de usuário"
    >
      <div className="flex items-center justify-center">
        <form onSubmit={submit} className=" rounded px-8 pt-6 pb-8 mb-4 w-1/3">
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
              type="file"
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  setImagem(files[0]);
                  console.log("File:", files[0]);
                  console.log("Imagem:", imagem);
                  const { type } = files[0];
                  settipoImg(type.slice(6));
                  console.log(tipoImg);
                } else {
                  console.log("arquivo não escolhido");
                }
              }}
              className="text-blue-900 bg-gray-200 mb-2 p-2 rounded-md"
            />
            <div className="flex justify-end">
              <Botao type="submit">Salvar</Botao>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
