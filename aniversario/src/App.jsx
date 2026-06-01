import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Image as ImageIcon, Sparkles, Music, ChevronDown, MapPinned } from 'lucide-react';
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
  return (
     <div className="app-container">
      {/* Sección 1: Bienvenida */}
      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Te cuento que me encuentro enamorado y siento que esta vez es la correcta... 
          <Music color="#ff80bf" size={50}/>          
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          style={{ marginTop: '4rem', color: '#666' }}
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown color='#5fa8d3' size={50} />
          </motion.div>
        </motion.div>
      </section>

      {/* Recuerdos individuales */}
      <section>
        <FadeInSection>
          <div className="memory-card">
            <Sparkles size={40} color="#ff80bf" />
            <h2>La primera vez que te conocí...</h2>
            <p>Para serte sincero hubo muchas primeras veces, cuando te ví fisicamente en una reunión en PV, 
              cuando conocí tu personalidad única porque les empezaste a hablar a mis hermanos, 
              cuando conocí como era tomarte de la mano al bailar contigo en el viaje a San Luis...
              Y seguramente van a existir nuevas primeras veces donde te tenga que conocer en muchos más aspectos.
            </p>
            <p>Pero lo más hermoso es que, sin importar cuántas veces repitamos esas experiencias, hacer cualquier cosa contigo me sigue pareciendo increíble. Nunca me voy a cansar de compartir mi tiempo a tu lado.</p>
          </div>
        </FadeInSection>
      </section>

      <section>
        <FadeInSection>
          <div className="memory-card">
            <MapPinned size={40} color="#ff80bf" />
            <h2>Nuestro Primer Viaje</h2>
            <p>Ese momento inolvidable donde compartimos aventuras, risas y descubrimos el mundo juntos.</p>
          </div>
        </FadeInSection>
      </section>
      
      <section>
        <FadeInSection>
          <div className="memory-card">
            <Heart size={40} color="#ff80bf" />
            <h2>Hoy y Siempre</h2>
            <p>Dos años llenos de amor y crecimiento mutuo. Eres lo mejor que me ha pasado.</p>
          </div>
        </FadeInSection>
      </section>

      {/* Sección 3: Mensaje Final */}
      <section className="footer">
        <FadeInSection>
          <h2>Te amo muchísimo</h2>
          <p>Por muchos años más creando hermosos recuerdos juntos.</p>
          <div style={{ marginTop: '2rem' }}>
            <Music color="#ff4d4d" size={60} className="pulse" />
          </div>
        </FadeInSection>
      </section>
    </div>
  )
}

export default App
