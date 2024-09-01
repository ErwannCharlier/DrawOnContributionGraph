import React from 'react'
import styles from '../../styles/Header.module.css'
import Image from "next/image";

type HeaderProps = {
    title: string;
    description: string;
    subtitle?: string;
}

function Header({ title, description, subtitle }: HeaderProps) {
    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <div className={styles.textContent}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.description}>
                        {description}
                    </p>

                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>
                <div className={styles.gitLogo}>
                    <Image
                        src="/gitLogo.png"
                        alt="GitHub Contribution Graph"
                        width={300}
                        height={300}
                    />
                </div>
            </div>
        </div>
    )
}

export default Header;
