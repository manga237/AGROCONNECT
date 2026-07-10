"use client";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";

export default function Page() {
  const [comp, setcomp] = useState(0);
 // let is = true;
  // useEffect(() => {
  //   alert("compteru");
  // }, []);
  return (
    <div >
      BIENVENUE DANS LE LOGIN
      <p className={styles.page}>compteur : {comp} </p>
      <button
        className="btn"
        onClick={function () {
          setcomp(comp + 1);
        }}
      >
        +
      </button>
    </div>
  );
}
