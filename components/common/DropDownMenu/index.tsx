import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";

const DropDownMenu = () => {
  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>
        <Image
          className={styles.dropbtn__icon}
          width={64}
          height={64}
          alt="menu"
          src={"/burger-menu.svg"}
        />
      </button>
      <div className={styles.dropdown__content}>
        <Link href={"/images/rating"} className={styles.subNav__link}>
          Images Rating
        </Link>
        <Link href={"/user/rating"} className={styles.subNav__link}>
          Users Rating
        </Link>
      </div>
    </div>
  );
};

export default DropDownMenu;

