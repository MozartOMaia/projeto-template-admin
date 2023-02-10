import Layout from "@/components/template/Layout";

export default function Ajustes() {
  const wrapper = document.getElementById("bubble-wrapper");

  const animateBubble = (x) => {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.style.left = `${x}px`;
    // let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    // bubble.style.backgroundColor = `#${randomColor}`;
    wrapper?.appendChild(bubble);
    setTimeout(() => wrapper?.removeChild(bubble), 1500);
  };

  return (
    <div onMouseMove={(e) => animateBubble(e.clientX)}>
      <Layout
        titulo="Ajustes & Configurações"
        subtitulo="Personalize o sistema por aqui"
      >
        <h3> Conteúdo </h3>
        <div id="bubble-wrapper"></div>
      </Layout>
    </div>
  );
}
