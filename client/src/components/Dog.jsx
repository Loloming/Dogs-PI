import React from "react";
import styles from './Dog.module.css';
import dstyles from './Detalle.module.css';
export default function Dog({img, name, temperament, weight, reference, height, life_span, detail}) {
    if (life_span && !life_span.toString().includes('years')) {
        life_span = `${life_span} years`
    }
    if (!img && !reference) {
        img = 'https://i.pinimg.com/736x/a3/d8/65/a3d86547f72dcf88eda14a4a74a4a40b.jpg'
    }
    return (
        <div className={detail === 'detail' ? dstyles.dog : styles.dog}>
            <div className={detail === 'detail' ? dstyles.dogImg : styles.dogImg}>
                {img ? <img src={`${img}`} alt={name}></img> : <img src={`https://cdn2.thedogapi.com/images/${reference}.jpg`} alt={name}></img>}
            </div>
            <div className={detail === 'detail' ? dstyles.name : styles.name}>
                <h4>{`${name}`}</h4>
            </div>
            <div className={detail === 'detail' ? dstyles.temperaments : styles.temperaments}>
                <h6>{`${temperament}`}</h6>
            </div>
            <div className={detail === 'detail' ? dstyles.weight : height ? styles.weight : styles.weightAll}>
                <h6>{`${weight} kg`}</h6>
            </div>
            <div className={detail === 'detail' ? dstyles.height : styles.height}>
                {height ? <h6>{`${height} cm`}</h6> : null}
            </div>
            <div className={detail === 'detail' ? dstyles.life_span : styles.life_span}>
                {life_span ? <h6>{`${life_span}`}</h6> : null}
            </div>
        </div>
    )
}