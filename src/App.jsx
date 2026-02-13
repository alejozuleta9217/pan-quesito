import { useEffect, useRef, useState } from "react";
import "./SunflowerFrame.css";
<link
  href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600&display=swap"
  rel="stylesheet"
></link>;

const leftImages = ["/1.jpeg", "/2.jpeg", "/3.jpeg"];
const rightImages = ["/4.jpeg", "/5.jpeg", "/6.jpeg", "/7.jpeg"];
const leafImages = ["/8.png", "/9.png", "/10.png"];

function generateLeaves(leafImages, count = 15) {
  return Array.from({ length: count }, () => {
    const randomIndex = Math.floor(Math.random() * leafImages.length);
    return {
      src: leafImages[randomIndex],
      left: Math.random() * 100,
      duration: 7 + Math.random() * 6,
      size: 25 + Math.random() * 40,
      rotation: Math.random() * 360,
      blur: Math.random() > 0.6 ? 2 : 0,
    };
  });
}

export default function SunflowerFrame() {
  const containerRef = useRef(null);
  const noBtnRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [showMain, setShowMain] = useState(false);
  const [leaves] = useState(() => generateLeaves(leafImages, 15));

  // 🌻 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 💔 Botón NO que se mueve
  const moveNoButton = () => {
    const btn = noBtnRef.current;
    if (!btn) return;

    const maxX = window.innerWidth - btn.offsetWidth - 20;
    const maxY = window.innerHeight - btn.offsetHeight - 20;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    btn.style.position = "fixed";
    btn.style.left = randomX + "px";
    btn.style.top = randomY + "px";
  };

  // 🌻 Mouse parallax
  const handleMouseMove = (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 30;
    const y = (e.clientY - window.innerHeight / 2) / 30;
    setMouse({ x, y });
  };

  return (
    <>
      {/* 💌 TARJETA INICIAL */}
      {!showMain && (
        <div className="valentine-card">
          <div className="envelope">
            <div className="envelope-flap"></div>
            <div className="letter">
              <img src="/6.jpeg" alt="Nosotros" />
            </div>
          </div>

          <h2>Hola Pau mi amor 💖</h2>
          <p>¿Quieres salir hoy conmigo?</p>

          <div className="buttons">
            <button className="btn yes" onClick={() => setShowMain(true)}>
              Sí ❤️
            </button>

            <button
              ref={noBtnRef}
              className="btn no"
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
            >
              No 😢
            </button>
          </div>
        </div>
      )}

      {/* 🌻 CONTENIDO PRINCIPAL */}
      {showMain && (
        <div
          className="frame-container"
          ref={containerRef}
          onMouseMove={handleMouseMove}
        >
          {/* LADO IZQUIERDO */}
          <div className="side left">
            {leftImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className={`sunflower ${visible ? "fade-in" : ""}`}
                style={{
                  transform: `translate3d(${mouse.x * (i + 1)}px,
                                          ${mouse.y * (i + 1)}px,
                                          ${i * 60}px)`,
                  filter: `blur(${Math.abs(mouse.x) * 0.3}px)`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>

          {/* CONTENIDO CENTRAL */}
          <div
            className="content glass"
            style={{
              transform: `rotateY(${mouse.x * 0.3}deg) rotateX(${
                -mouse.y * 0.3
              }deg)`,
            }}
          >
            <div className="mensaje-aniversario">
              <p>
                Hoy cumplimos un mes más juntos y cada vez me doy cuenta de lo
                agradecido que estoy por tenerte en mi vida.
              </p>

              <p>
                Desde el 2022 hemos construido algo que para mí es real, fuerte
                y lleno de momentos que no cambiaría por nada. El 13 de abril
                cumplimos 4 años, y me emociona pensar en todo lo que aún nos
                queda por vivir.
              </p>

              <p>
                Te amo. Me encanta lo que somos y me ilusiona la idea de seguir
                compartiendo mi vida contigo, creciendo juntos y construyendo
                nuestro futuro paso a paso.
              </p>

              <p className="invitacion">
                Hoy quiero invitarte a una cena solo los dos, a las 8 pm. Quiero
                verte hermosa, como siempre, y disfrutar de un momento especial
                contigo.
              </p>
            </div>
          </div>

          {/* LADO DERECHO */}
          <div className="side right">
            {rightImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className={`sunflower ${visible ? "fade-in" : ""}`}
                style={{
                  transform: `translate3d(${mouse.x * (i + 1)}px,
                                          ${mouse.y * (i + 1)}px,
                                          ${i * 60}px)`,
                  filter: `blur(${Math.abs(mouse.x) * 0.3}px)`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>

          {/* LLUVIA */}
          <div className="rain">
            {leaves.map((leaf, i) => (
              <img
                key={i}
                src={leaf.src}
                className="rain-leaf"
                style={{
                  left: `${leaf.left}%`,
                  width: `${leaf.size}px`,
                  animationDuration: `${leaf.duration}s`,
                  transform: `rotate(${leaf.rotation}deg)`,
                  filter: `blur(${leaf.blur}px)`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
