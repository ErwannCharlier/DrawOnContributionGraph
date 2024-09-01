"use client"
import { Dispatch, SetStateAction, useState } from 'react'
import styles from '../../styles/Step3.module.css'
import 'rsuite/dist/rsuite-no-reset.min.css';
import { SelectPicker, Stack } from 'rsuite';
import ContributionGrid from '../Grid/ContributionGrid';

interface step3Props {
    token: string;
    email: string;
    repoUrl: string;
}

function generateYearsData() {
    const currentYear = new Date().getFullYear();
    const startYear = 2005;
    return Array.from(
        { length: currentYear - startYear + 1 },
        (_, index) => {
            const year = startYear + index;
            return { label: year.toString(), value: year.toString() };
        }
    );
};

export default function Step3({ token, email, repoUrl }: step3Props) {
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const data = generateYearsData();


    return (
        <>
            <div className={styles.datePicker}>
                <p>Select a year</p>
                <Stack spacing={10} direction="column" alignItems="flex-start">
                    <SelectPicker
                        data={data}
                        searchable={false}
                        style={{ width: 100 }}
                        placeholder="Select"
                        appearance="subtle"
                        defaultValue={data[data.length - 1]?.value}
                        onChange={(e) => setYear(Number(e))}
                    />
                </Stack>
            </div>
            <div className={styles.grid}>
                <div className={styles.blur_circle} />
                <ContributionGrid year={year} token={token} repoUrl={repoUrl} email={email} />
            </div >
        </>
    );
}
