"use client"
import { validateInputs } from '../../API/api';
import ContributionGrid from '../Grid/ContributionGrid';
import styles from '../../styles/OldHome.module.css';
import { useState } from 'react';
export default function Home() {
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [token, setToken] = useState<string>('');
    const [repoUrl, setRepoUrl] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const fields = [
        { html: "token", type: "text", value: token, onChange: (event: any) => setToken(event.target.value), placeholder: "Enter your token" },
        { html: "repoUrl", type: "text", value: repoUrl, onChange: (event: any) => setRepoUrl(event.target.value), placeholder: "Enter the Git repository URL" },
        { html: "email", type: "text", value: email, onChange: (event: any) => setEmail(event.target.value), placeholder: "Enter your git email" },
    ]



    return (
        <div className={styles.container}>
            <h1> GitHub Contribution Grid</h1>

            <div>
                {fields.map((f) => (
                    <div key={f.html}>
                        <label htmlFor={f.html}>{f.html}: </label>
                        <input
                            type={f.type}
                            id={f.html}
                            value={f.value}
                            onChange={f.onChange}
                            placeholder={f.placeholder}
                        />
                    </div>
                ))}
                <button onClick={() => validateInputs({
                    token,
                    repository: repoUrl,
                    email,
                    year
                })}> validate </button>
            </div>

            <div className={styles.yearSelector}>
                <label htmlFor="year">Select Year: </label>
                <input
                    type="number"
                    id="year"
                    value={year}
                    onChange={(event) => setYear(Number(event.target.value))}
                    min="2000"
                    max="2100"
                />
            </div>
            <ContributionGrid
                key={year}
                year={year}
                repoUrl={repoUrl}
                token={token}
                email={email} />
        </div >
    );
};

