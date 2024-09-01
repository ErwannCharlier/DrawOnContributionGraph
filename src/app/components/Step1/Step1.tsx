import { Dispatch, SetStateAction } from 'react'
import styles from '../../styles/Step1.module.css'
import { Accordion, Placeholder } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import Header from '../Homepage/Header';
import Inputs from '../Inputs/Inputs';

interface HomePageProps {
    setStep: Dispatch<SetStateAction<number>>;
    setRepoUrl: Dispatch<SetStateAction<string>>;
}

function Step1({ setStep, setRepoUrl }: HomePageProps) {
    return (
        <>
            <Accordion >
                <Accordion.Panel header="How to create a repository" >
                    <div className={styles.accordionContainer}>
                        <p className={styles.p}>
                            navigate to <a className={styles.link} href='https://github.com/new' target='_blank'>https://github.com/new</a> and create a new public repository
                        </p>
                        <img className={styles.img} src="/createRepo.jpg" alt="" />
                    </div>
                </Accordion.Panel>
            </Accordion>
            <Inputs textBox='Paste the link here:' onChange={(e) => setRepoUrl(e.target.value)} placeHolder='https://github.com' />
            <button className={styles.btn} onClick={() => setStep(2)}>
                next step
            </button>
        </>
    )
}

export default Step1