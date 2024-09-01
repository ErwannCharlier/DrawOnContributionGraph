import React from 'react'
import styles from '../../styles/Inputs.module.css'

type InputsProps = {
    textBox: string;
    placeHolder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

function Inputs({ textBox, placeHolder, onChange }: InputsProps) {
    return (
        <>
            <h2 className={styles.h2}>{textBox}</h2>
            <div className={styles.textBox}>
                <input
                    type="text"
                    placeholder={placeHolder}
                    className={styles.input}
                    onChange={onChange}
                />
            </div>
        </>
    )
}

export default Inputs