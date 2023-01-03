import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dogs from './components/Dogs';
import Detalle from './components/Detalle';
import Formulario from './components/Formulario';
import styles from './App.module.css';
import fstyles from './components/Paginado.module.css';
import dstyles from './components/Dog.module.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <>
              <div>
                  <div className={styles.header}>
                      <div className={styles.henry_dogs_create}>
                          <h1 className={styles.title}>Henry Dogs</h1>
                      </div>
                  </div>
                  <div>
                      <Link to={'/home'}><button className={dstyles.home}>Home</button></Link>
                  </div>
                  <footer className={fstyles.container}>

                  </footer>
              </div>
            </>
          }>
          </Route>
          <Route path='/home' element={
            <>
              <div className={styles.header}>
                  <div className={styles.henry_dogs}>
                      <Link to={'/home'} className={styles.title}><h1>Henry Dogs</h1></Link>
                  </div>
                  <div className={styles.raza_div}>
                      <Link className={styles.raza_container} to={'/create'}><h3 className={styles.crear_raza}>Crear raza</h3></Link>
                  </div>
              </div>
              <Dogs />
            </>
          }>
          </Route>
          <Route path='/:dogId' element={
            <>
              <div className={styles.header}>
                  <div className={styles.henry_dogs}>
                      <Link to={'/home'} className={styles.title}><h1>Henry Dogs</h1></Link>
                  </div>
                  <div className={styles.raza_div}>
                      <Link to={'/create'} className={styles.crear_raza}><h3>Crear raza</h3></Link>
                  </div>
              </div>
              <Detalle />
            </>
          }>
          </Route>
          <Route path='/create' element={
            <>
              <div className={styles.header}>
                  <div className={styles.henry_dogs_create}>
                      <Link to={'/home'} className={styles.titleCreate}><h1>Henry Dogs</h1></Link>
                  </div>
              </div>
              <Formulario />
            </>
          }>
          </Route>
          <Route path='/notFound' element={
            <>
              <div className={styles.header}>
                  <div className={styles.henry_dogs}>
                      <Link to={'/home'} className={styles.title}><h1>Henry Dogs</h1></Link>
                  </div>
                  <div className={styles.raza_div}>
                      <Link to={'/create'} className={styles.crear_raza}><h3>Crear raza</h3></Link>
                  </div>
              </div>
              <h4 className={dstyles.notFound}>No se encontró ninguna raza con ese nombre</h4>
              <Link to={'/home'} className={fstyles.container}><button className={fstyles.button}>Todas las razas</button></Link>
            </>
          }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
