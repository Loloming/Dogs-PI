import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllDogs } from "../actions/actionCreators";
import Dog from "./Dog";
import fstyles from './Paginado.module.css';
import styles from './Detalle.module.css';
import dstyles from './Dog.module.css';

export default function Detalle() {

    const { dogId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dog, setDog] = useState([]);

    useEffect(() => {
        if (!dogId.includes('db')) {
            fetch('https://api.thedogapi.com/v1/breeds')
                .then(data => data.json())
                .then(data => data.filter(dog => dog.id === dogId * 1))
                .then(data => {
                    console.log(data)
                    setDog(data)
                })
        }
        else {
            fetch(`http://localhost:3001/dogs/${dogId.replace('db', '')}`, {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }
                })
                .then(data => data.json())
                .then(data => {
                    console.log(data)
                    setDog(data)
                })
        }
        
    }, [dogId])

    return (
        dog[0]
        ?
        <div className={styles.container}>
            <Dog img={dog[0].image ? dog[0].image.url : null} name={dog[0].name} temperament={dog[0].temperament} weight={dog[0].weight.metric} height={dog[0].height.metric} life_span={dog[0].life_span ? dog[0].life_span : dog[0].age} detail={'detail'} key={dog[0].id}/>
            <div className={fstyles.container}>
                <button className={fstyles.button} onClick={() => {
                dispatch(getAllDogs())
                navigate('/home')
                }}>Todos los perros</button>
            </div>
            
        </div>
        :
        <>
            <h4 className={dstyles.notFound}>Cargando...</h4>
            <footer className={fstyles.container}></footer>
        </>
    )

}