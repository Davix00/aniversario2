import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Image as ImageIcon, Sparkles, ChevronDown, MapPinned, Play, Pause, X, ChevronLeft, ChevronRight } from 'lucide-react';
import './App.css';

const FadeInSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay: delay }}
    className="section-container"
  >
    {children}
  </motion.div>
);

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Estados para la animación final del pastel
  const [pumpCount, setPumpCount] = useState(0);
  const [isBlownOut, setIsBlownOut] = useState(false);

  const handlePump = () => {
    if (pumpCount < 10) {
      const newCount = pumpCount + 1;
      setPumpCount(newCount);
      if (newCount === 10) {
        setIsBlownOut(true);
      }
    }
  };

  // Generar globos aleatorios (se calculan una sola vez al cargar la página)
  const balloons = React.useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.floor(Math.random() * 90) + "vw", // Posición horizontal aleatoria
      delay: Math.random() * 1.5,               // Retraso para que no salgan todos al mismo tiempo
      duration: 4 + Math.random() * 3,          // Velocidad a la que suben
      emoji: ['🎈', '💖', '✨', '🎉'][Math.floor(Math.random() * 4)] // Diferentes figuras
    }));
  }, []);

  // Estado para las galerías de fotos
  const [activeGallery, setActiveGallery] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Agrupación de las fotos en la carpeta public/
  const galleries = {
    1: ['/foto1.jpg', '/foto2.jpg', '/foto3.jpg', '/foto4.jpg', '/foto5.jpg'],
    2: ['/foto6.jpg', '/foto7.jpg', '/foto8.jpg', '/foto9.jpg', '/foto10.jpg'],
    3: ['/foto11.jpg', '/foto12.jpg', '/foto13.jpg', '/foto14.jpg', '/foto15.jpg'],
  };

  const openGallery = (id) => {
    setActiveGallery(id);
    setCurrentImageIndex(0); // Empezamos siempre en la primera foto
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % 5);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? 4 : prev - 1));
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
          }).catch(error => {
            console.error("Error al intentar reproducir el audio:", error);
          });
        }
      }
    }
  };

  return (
     <div className="app-container">
      <audio ref={audioRef} src="/cancion.mp3" loop />

      {/* Sección 1: Bienvenida */}
      <section className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Para mi persona favorita
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Te cuento que me encuentro enamorado, y siento que esta vez, es la correcta.
          </motion.h1>

          <motion.div 
            className="play-container"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className={`glass-icon ${isPlaying ? 'pulse' : ''}`} onClick={togglePlay}>
              {isPlaying ? <Pause color="#ff4d85" size={40} /> : <Play color="#ff4d85" size={40} style={{ marginLeft: '5px'}} />}
            </div>
            <p className="play-label">
              {isPlaying ? 'Escuchando nuestra historia...' : 'Dale play a nuestra canción'}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Recuerdos individuales */}
      <section>
        <FadeInSection>
          <motion.div 
            className="memory-card"
          >
            <Sparkles className='bnt-carrousel-fotos' size={40} color="#ff4d85" onClick={() => openGallery(1)} />
            <h2>Nuestras primeras veces...</h2>
            <p>
              Para ser sincero, he vivido muchas "primeras veces" a tu lado. La primera vez que te vi en aquella reunión en PV; 
              cuando me enamoró tu personalidad única al verte platicar con mis hermanos, o cuando sentí lo que era tomarte de la mano para bailar juntos en el viaje a San Luis... 
              Sé que aún nos esperan muchísimas "primeras veces" por descubrir.
            </p>
            <p>Lo más hermoso es que, sin importar cuántas veces repitamos esos momentos, hacer cualquier cosa contigo me sigue pareciendo increíble. Jamás me cansaré de compartir mi vida a tu lado.</p>
          </motion.div>
        </FadeInSection>
      </section>

      <section>
        <FadeInSection>
          <motion.div 
            className="memory-card"
          >
            <MapPinned className='bnt-carrousel-fotos' size={40} color="#ff4d85" onClick={() => openGallery(2)} />
            <h2>Nuestro primer viaje juntos</h2>
            <p>
              Nunca olvidaré ese viaje. Desde que nos vimos de noche en el Santuario Guadalupano hasta el instante en que llegamos a la cima del Cubilete, 
              cada momento fue mágico. Nunca antes había viajado solo, y que tú me acompañaras fue un verdadero regalito de Dios.
            </p>
            <p> 
              Así como estuviste a mi lado en ese entonces, quiero acompañarte en cada aventura que la vida nos depare, 
              porque cualquier experiencia, si es contigo, se convierte en un recuerdo inolvidable.
            </p>
          </motion.div>
        </FadeInSection>
      </section>
      
      <section>
        <FadeInSection>
          <motion.div 
            className="memory-card"
          >
            <Heart className='bnt-carrousel-fotos' size={40} color="#ff4d85" onClick={() => openGallery(3)} />
            <h2>Hoy, mañana y siempre</h2>
            <p>
              Han sido dos años llenos de amor y crecimiento mutuo. Si mi "yo" del pasado me viera hoy, no creería en el hombre en el que me has ayudado a convertirme. 
              Tal vez no lo notes, pero me inspiras a ser mejor cada día, simplemente porque tú eres maravillosa y me impulsas a estar a tu altura. 
              Mi vida, me faltan palabras para describir todo lo que me haces sentir. Solo tengo una certeza: quiero seguir caminando pasito a pasito a tu lado, hasta donde el camino nos lleve.
            </p>
          </motion.div>
        </FadeInSection>
      </section>

      {/* Sección 3: Mensaje Final */}
      <section className="footer">
        <FadeInSection>
          {!isBlownOut ? (
            <div className="pump-container">
              <p>¡Toca el viento para apagar la velita!</p>
              <motion.div
                style={{ fontSize: '2.5rem', cursor: 'pointer' }}
                className="wind-emoji-btn"
                whileTap={{ scale: 0.8 }}
                onClick={handlePump}
              >
                💨
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <p className="success-message">¡Lo logramos mi amor!</p>
              <p style={{ marginTop: '1rem', color: '#ffb3c1' }}>
                Que sean muchísimos años más celebrando juntos nuestro amor. ❤️
              </p>
            </motion.div>
          )}
          
          <div className="celebration-container">
            <motion.div className="character" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              👨🏻
            </motion.div>
            
            <div className="cake-container">
              <span className="cake">🎂</span>
              <div className="candle">
                {!isBlownOut && (
                  <motion.div
                    className="flame"
                    animate={{ scale: [1, 1.2, 1], rotate: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                  >
                    🔥
                  </motion.div>
                )}
                <span className="candle-number">2</span>
              </div>
            </div>

            <motion.div className="character" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2.2, delay: 0.2 }}>
              👩🏽
            </motion.div>
          </div>

          <h2>¡Feliz 2do Aniversario!</h2>
        </FadeInSection>
      </section>

      {/* Modal de la Galería de Fotos */}
      <AnimatePresence>
        {activeGallery && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveGallery(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Evita que se cierre al dar clic en la foto
            >
              <button className="carousel-btn close-btn" onClick={() => setActiveGallery(null)}>
                <X size={25} color="#ff4d85" />
              </button>
              <button className="carousel-btn prev-btn" onClick={prevImage}>
              <ChevronLeft size={45} color="#ff4d85" />
              </button>
              <img src={galleries[activeGallery][currentImageIndex]} alt="Recuerdo" className="carousel-image" />
              <button className="carousel-btn next-btn" onClick={nextImage}>
              <ChevronRight size={45} color="#ff4d85" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animación de Globos al apagar la vela */}
      <AnimatePresence>
        {isBlownOut && (
          <div className="balloons-container">
            {balloons.map((balloon) => (
              <motion.div
                key={balloon.id}
                className="balloon"
                initial={{ top: '100vh', left: balloon.x }}
                animate={{ top: '-20vh' }}
                transition={{ duration: balloon.duration, delay: balloon.delay, ease: "linear" }}
              >
                {balloon.emoji}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
