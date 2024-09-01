"use client"
import { useState, Dispatch, SetStateAction } from 'react'
import styles from '../../styles/Step2.module.css'
import { Accordion } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { httpReponse } from '@/app/API/api';
import Inputs from '../Inputs/Inputs';
import ScaleLoader from "react-spinners/ScaleLoader";

interface Step2Props {
    setStep: Dispatch<SetStateAction<number>>;
    setToken: Dispatch<SetStateAction<string>>;
    setEmail: Dispatch<SetStateAction<string>>;
    validateInputs: () => Promise<httpReponse>;
}

function Step2({ setStep, setToken, setEmail, validateInputs }: Step2Props) {
    const [validInput, setValidInput] = useState<boolean | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setIsLoading] = useState(false);
    const buttonClassName = `${styles.btn} ${validInput === false ? styles.redBtn : ''}`;

    return (
        <>

            <Accordion>
                <Accordion.Panel header="How to create a token">
                    <div className={styles.accordionContainer}>
                        <p className={styles.p}>1. Navigate to <a className={styles.link} target='_blank' href='https://github.com/settings/personal-access-tokens/new' about='_blank'>https://github.com/settings/personal-access-tokens/new</a> and create a new token</p>
                        <img className={styles.img} src="/CreateToken.jpg" alt="Create Token" />
                        <p className={styles.p}>2. Grant permission to commit to the repository</p>
                        <img className={styles.img} src="/TokenPerm.jpg" alt="Token Permission" />
                    </div>
                </Accordion.Panel>
            </Accordion>


            <Inputs textBox='Paste the token here:' onChange={(e) => setToken(e.target.value)} placeHolder='github token' />

            <Inputs textBox='Paste your GitHub account email:' onChange={(e) => setEmail(e.target.value)} placeHolder='email@email.com' />

            <button
                className={buttonClassName}
                onClick={async () => {
                    //input already valid
                    if (validInput === true) {
                        setStep(3);
                        return;
                    }
                    setIsLoading(true);

                    const resp = await validateInputs();
                    setIsLoading(false);
                    setValidInput(!resp.error);
                    setErrorMessage("");
                    if (resp.error)
                        setErrorMessage(resp.message);
                }}
            >
                {validInput ? 'next step' : 'validate inputs'}

            </button>
            <div className="sweet-loading">
                <ScaleLoader
                    color={"#1F6FEB"}
                    loading={loading}
                    speedMultiplier={1.5}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>

            {validInput === false && <p className={styles.errorMessage}>Error: {errorMessage} </p>}
            {validInput === true && <p className={styles.succesMessage}>Succes ! your inputs are valid </p>}

        </>
    );
}

export default Step2;
