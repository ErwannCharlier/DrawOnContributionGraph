"use client";
import HomePage from "./components/Homepage/Homepage";
import Header from "./components/Homepage/Header";
import styles from "./styles/Home.module.css";

const headerContent = {
  title: "Draw",
  description: "On Your Github Contribution Graph",
  subtitle: "In three easy steps",
};

export default function Home() {
  const { title, description, subtitle } = headerContent;

  return (
    <>
      <Header title={title} description={description} subtitle={subtitle} />
      <div className={styles.container}>
        <HomePage />
      </div>
    </>
  );
}
