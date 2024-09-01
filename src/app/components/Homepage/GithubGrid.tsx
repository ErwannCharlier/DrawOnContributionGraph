"use client"
import React, { useEffect } from 'react'
import styles from '../../styles/GithubGrid.module.css';

function GithubGrid() {
    useEffect(() => {
        const squares = document.querySelector(`.${styles.squares}`);
        if (squares?.children.length === 0) { // Ajoutez une vérification pour éviter la duplication
            for (let i = 1; i < 365; i++) {
                squares.insertAdjacentHTML('beforeend', `<li data-level="0"></li>`);
            }
        }

        const squareElements = document.querySelectorAll(`.${styles.squares} li`);
        const squareIndexes = [85, 86, 87, 88, 89, 94, 101, 108, 106, 107, 109, 110, 127, 129, 130, 131, 172, 170, 179, 177, 183, 187, 191, 192, 193];

        squareElements.forEach((square, index) => {
            if (squareIndexes.includes(index)) {
                setTimeout(() => {
                    square.setAttribute('data-level', '3');
                }, index * 30);
            }
        });
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
            <ul className={styles.squares}></ul>
        </div>
    );
}

export default GithubGrid