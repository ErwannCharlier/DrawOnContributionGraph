import React from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import GithubGrid from "./GithubGrid";
import Link from "next/link";


const HomePage = ({ ...props }) => {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.blur_circle}></div>
                    <GithubGrid />
                </div>
                <button className={styles.btn} >
                    <Link href="/steps">
                        start now
                    </Link>
                </button>

            </div >
        </div>
    );
};

export default HomePage;
