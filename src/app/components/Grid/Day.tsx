import React from 'react';
import styles from '../../styles/Grid.module.css';

type DayProps = {
    dayOfYear: number;
    level: number;
    updateLevel: () => void;
}


export default function Day({ dayOfYear, level, updateLevel }: DayProps) {

    return (
        <div
            onClick={() => { updateLevel() }}
            className={styles[`commit_level_${level}`]}
        />
    );
}


