"use client"
import React, { createElement, useEffect } from 'react'
import styles from '../../styles/GithubGrid.module.css';

function GithubGrid() {
    const arr = []
    for (let i = 1; i < 365; i++) {
        arr.push(createElement('li', {'data-level':0}));
    }
    useEffect(() => {
        const squareElements = document.querySelectorAll(`.${styles.squares} li`);
        const squareIndexes = [85, 86, 87, 88, 89, 94, 101, 108, 106, 107, 109, 110, 127, 129, 130, 131, 172, 170, 179, 177, 183, 187, 191, 192, 193];
        const MIN_IDX = 80
        for (let i = MIN_IDX; i < squareElements.length - 1; i++) {
            if (squareIndexes.includes(i)) {
                setTimeout(() => {
                    squareElements[i].setAttribute('data-level', '3');
                }, (i - MIN_IDX) * 30);
            }
        }
    }, []);

    return (
        <div className={styles.graph}>
            <ul className={styles.months}>
                <li>Jan</li>
                <li>Feb</li>
                <li>Mar</li>
                <li>Apr</li>
                <li>May</li>
                <li>Jun</li>
                <li>Jul</li>
                <li>Aug</li>
                <li>Sep</li>
                <li>Oct</li>
                <li>Nov</li>
                <li>Dec</li>
            </ul>
            <ul className={styles.days}>
                <li>Sun</li>
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
            </ul>
            <ul className={styles.squares}>
                {arr.map(x =>x)}
            </ul>
        </div>
    );
}

export default GithubGrid