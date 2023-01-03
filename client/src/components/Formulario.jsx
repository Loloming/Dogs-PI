import React from "react";
import { useEffect, useState } from "react";
import styles from './Formulario.module.css';
import fstyles from './Paginado.module.css';

export default function Formulario() {

    const [temps, setTemps] = useState([]);
    const [disabled, setDisabled] = useState(false)

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [alturaMinima, setAlturaMinima] = useState('');
    const [alturaMaxima, setAlturaMaxima] = useState('');
    const [pesoMinimo, setPesoMinimo] = useState('');
    const [pesoMaximo, setPesoMaximo] = useState('');
    const [temperamentos, setTemperamentos] = useState([]);

    const [error, setError] = useState('Ingresar un nombre');
    const [validation, setValidation] = useState('');


    useEffect(() => {
        if (!temps[0]) {
            fetch('http://localhost:3001/temperaments')
                .then(r => r.json())
                .then(r => setTemps(r))
        }
    }, [temps])

    function validateName(val) {
        var nombreRegEx = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/
        if (val === '') {
            setError('Ingresar un nombre')
        }
        else {
            var respuesta = nombreRegEx.test(val)
            if (respuesta) {
                setError('')
                return respuesta;
            }
            else {
                setError('El nombre debe tener una mayúscula al inicio de cada palabra, más de un carácter y debe ser solo texto')
            }
        }
        
    }

    function validateImage(url) {
        var validate = /^(ftp|http|https):\/\/[^ "]+$/;
        if (validate.test(url)) {
            setError('')
        }
        else {
            setError('La URL ingresada no es válida')
        }
    }

    function handleTemps(action) {
        if (action.task === 'Agregar') {
            setError('');
        }
        else if (action.task === 'Eliminar') {
            if (temperamentos.length === 1) {
                setError('Seleccionar al menos un temperamento')
            }
            else {
                setError('');
            }
        }
    }

    function validateAge(e) {
        if (e > 0) {
            setError('')
        }
        else {
            setError('Ingresar número de años de vida')
        }
    }

    function validateHeight(obj) {
        if (obj.min !== '' && obj.max !== '') {
            if (obj.min < 1) {
                setError('La altura mínima tiene que ser mayor a 0 kg')
            }
            else if (obj.max < 1) {
                setError('La altura máxima tiene que ser mayor a 0 kg')
            }
            else if (obj.min < obj.max) {
                setError('')
            }
            else {
                setError('La altura mínima debe ser menor a la altura máxima')
            }
        }
        else if (obj.min !== '') {
            setError('Ingresar altura máxima')
        }
        else if (obj.max !== '') {
            setError('Ingresar altura mínima')
        } 
    }

    function validateWeight(obj) {
        if (obj.min !== '' && obj.max !== '') {
            if (obj.min < 1) {
                setError('El peso mínimo tiene que ser mayor a 0 kg')
            }
            else if (obj.max < 1) {
                setError('El peso máximo tiene que ser mayor a 0 kg')
            }
            else if (obj.min < obj.max) {
                setError('')
            }
            else {
                setError('El peso mínimo debe ser menor al peso máximo')
            }
        }
        else if (obj.min !== '') {
            setError('Ingresar peso máximo')
        }
        else if (obj.max !== '') {
            setError('Ingresar peso mínimo')
        } 
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const obj = {
            image,
            name,
            age,
            height: {
                min: alturaMinima,
                max: alturaMaxima
            },
            weight: {
                min: pesoMinimo,
                max: pesoMaximo
            },
            temperament: temperamentos
        }
        fetch('http://localhost:3001/dogs', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(r => r.json())
        .then(r => {
            console.log(r)
            if (r === '¡Raza creada con éxito!') {
                setValidation(r)
            }
            else {
                setError(r)
            }
        })
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                {error ? <div className={styles.error_container}><span className={styles.error}>{error}</span></div> : null}
                {validation ? <span className={styles.validation}>{validation}</span> : null}
                <div>
                    <select className={styles.temperamentos} onChange={(e) => {
                        if (disabled === false) {
                            setDisabled(true);
                        }
                        setTemperamentos(oldTemp => [...oldTemp, e.target.value]);
                        handleTemps({task: 'Agregar'});
                        console.log(temperamentos);
                    }}>
                        <option disabled={disabled}>Seleccionar temperamento</option>
                        {temps[0] ? temps.map(a => {
                            return (
                                <option value={a.name} key={a.name}>{a.name}</option>
                            )
                        }) : <option>Cargando...</option>}
                    </select>
                </div>
                <div className={styles.tempContainer}>
                    <div className={styles.temps}>
                        {temperamentos[0]
                        ? temperamentos.map(t => {
                            return (
                                    <h6 className={styles.selectedTemp} onClick={(e) => {
                                        setTemperamentos(temperamentos.filter(temp => temp !== t))
                                        handleTemps({task: 'Eliminar'});
                                    }} value={t} key={t}>{t}</h6>
                            )
                        })
                        : <h6>No hay temperamentos elegidos</h6>
                        }
                    </div>
                    
                </div>
                <div className={styles.image_container}>
                    <input className={styles.image} type='text' placeholder="Imagen" value={image} onChange={(e) => {
                        setImage(e.target.value)
                        validateImage(e.target.value)
                    }}></input>
                    {}
                </div>
                <div className={styles.nombre_container}>
                    <input className={styles.nombre} type='text' placeholder="Nombre de la raza" value={name} onChange={(e) => {
                        setName(e.target.value)
                        validateName(e.target.value)
                    }}></input>
                    {}
                </div>
                <div className={styles.age_container}>
                    <input className={styles.edad} type='number' placeholder="Años de vida" onChange={(e) => {
                        setAge(e.target.value * 1)
                        validateAge(e.target.value);
                        console.log(age)
                    }}></input>
                </div>
                <div className={styles.altura_container}>
                    <input className={styles.altura} type='number' placeholder="Altura mínima" onChange={(e) => {
                        setAlturaMinima(e.target.value * 1)
                        validateHeight({min: e.target.value * 1,
                                        max: alturaMaxima});
                        console.log(alturaMinima)
                    }}></input>
                    <input className={styles.altura} type='number' placeholder="Altura máxima" onChange={(e) => {
                        setAlturaMaxima(e.target.value * 1)
                        validateHeight({max: e.target.value * 1,
                                        min: alturaMinima});
                        console.log(alturaMaxima)
                    }}></input>
                </div>
                <div className={styles.peso_container}>
                    <input className={styles.peso} type='number' placeholder="Peso mínimo" onChange={(e) => {
                        setPesoMinimo(e.target.value * 1)
                        validateWeight({min: e.target.value * 1,
                                        max: pesoMaximo});
                        console.log(e.target.value * 1)
                    }}></input>
                    <input className={styles.peso} type='number' placeholder="Peso máximo" onChange={(e) => {
                        setPesoMaximo(e.target.value * 1)
                        validateWeight({min: pesoMinimo,
                                        max: e.target.value * 1});
                        console.log(pesoMaximo)
                    }}></input>
                </div>
                <div className={styles.botonContainer}>
                    <button className={styles.boton} disabled={temperamentos[0] && age > 0 && error === '' ? false : true}>Crear raza</button>
                </div>
            </form>
            <footer className={fstyles.container}>

            </footer>
        </div>
    )
}