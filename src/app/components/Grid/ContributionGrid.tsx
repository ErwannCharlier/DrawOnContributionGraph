import React, { useEffect, useState } from 'react';
import styles from '../../styles/Grid.module.css';
import Day from './Day';
import { sendGrid } from '../../API/api';
import { launchConfetti } from './Confetti';
import ScaleLoader from "react-spinners/ScaleLoader";

type ContributionGridProps = {
    year: number,
    token: string,
    repoUrl: string,
    email: string
}

const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

export default function ContributionGrid({ year, token, repoUrl, email }: ContributionGridProps) {
    const [dayLevels, setDayLevels] = useState<Record<number, number>>({});
    const [selectedLevel, setSelectedLevel] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [githubProfileLink, setGithubProfileLink] = useState<string>("");
    const [loading, setIsLoading] = useState(false);


    const processGrid = async () => {
        const response = await sendGrid({
            token,
            repoUrl,
            year,
            email,
            dayLevels
        });
        return response;
    };

    useEffect(() => {
        //reset grid when year change
        setDayLevels({});
    }, [year]);

    useEffect(() => {
        setErrorMessage("");
        setGithubProfileLink("");
    }, [dayLevels, year]);

    function generateGrid(year: number) {
        const daysInYear = isLeapYear(year) ? 366 : 365;
        const startDay = new Date(year, 0, 1).getDay();

        let grid: JSX.Element[][] = [];
        let week: JSX.Element[] = [];

        for (let i = 0; i < startDay; i++) {
            week.push(<div key={`empty-${i}`} className={styles.empty_cell}>  </div>);
        }

        for (let day = 1; day <= daysInYear; day++) {
            week.push(
                <Day
                    key={`day-${day}`}
                    dayOfYear={day}
                    level={dayLevels[day] || 0}
                    updateLevel={() => setDayLevels(prevLevels => ({
                        ...prevLevels,
                        [day]: selectedLevel
                    }))}
                />
            );
            if (week.length === 7) {
                grid.push(week);
                week = [];
            }
        }

        while (week.length < 7) {
            week.push(<div key={`empty-end-${week.length}`} className={styles.empty_cell}>  </div>);
        }
        grid.push(week);

        return grid;
    };


    const grid = generateGrid(year);
    return (
        <div>
            <div className={styles.grid}>
                {grid.map((week, i) => (
                    <div key={i} className={styles.week_row}>
                        {week}
                    </div>
                ))}

            </div>

            <div className={styles.afterGrid}>
                <label htmlFor="level">Select color: </label>

                <div className={styles.colorPicker}>
                    {[0, 1, 2, 3, 4].map((level) => (
                        <div
                            key={level}
                            className={`${styles[`color${level}`]} ${selectedLevel === level ? styles.selectionnedColor : ''}`}
                            onClick={() => setSelectedLevel(level)}
                        />
                    ))}
                </div>
                <button
                    className={styles.btn}
                    onClick={async () => {
                        setIsLoading(true);
                        const resp = await processGrid();
                        setIsLoading(false);
                        if (!resp.error) {
                            setErrorMessage("");
                            setGithubProfileLink(`https://github.com/${repoUrl.split('/')[3]}?tab=overview&from=${year}-12-01&to=${year}-12-31`)
                            launchConfetti();
                            return;
                        }
                        setGithubProfileLink("");
                        setErrorMessage(resp.message)
                    }}>
                    Send Grid
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
                {errorMessage !== "" && <p className={styles.errorMessage}>Error: {errorMessage} </p>}
                {githubProfileLink !== "" && <p className={styles.githubProfileLink}>
                    Succes! you can go and visit <a className={styles.link} href={githubProfileLink}>{githubProfileLink}</a>  </p>}
            </div>

        </div >
    );
};

