import { signOut, useSession } from "next-auth/react";
import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";
import { useAppSelector } from "../../store/hooks";
import { userSliceSelector } from "../../store/slices/user/user.slice";

const Header = () => {
  const session = useSession();
  const { user } = useAppSelector(userSliceSelector);
  const handlerLogout = () => {
    signOut();
  };

  const renderProfileJsx =
    session.status != "authenticated" ? (
      <Link className={styles.header__link} href={"/auth/sign-in"}>
        Login
      </Link>
    ) : (
      <Fragment>
        <Link className={styles.header__link} href={"/profile"}>
          Profile
        </Link>
        <Link className={styles.header__link} href={"/user/messages"}>
          <div className={styles.header__msgBlock}>
            <Image
              width={48}
              height={40}
              alt={"Messages"}
              src={"/chat-icon.svg"}
            />
            {user?.messageNotification?.length ? (
              <span className={styles.header__notification}>
                {user?.messageNotification?.length || null}
              </span>
            ) : null}
          </div>
        </Link>
        <Link className={styles.header__link} onClick={handlerLogout} href="#">
          Logout
        </Link>
      </Fragment>
    );

  return (
    <header className={styles.header}>
      <div>
        <Link href={"/"} className={styles.header__logo}>
          <Image width={64} height={64} alt="logo" src={"/logo.svg"} />
          <h1>Uploader</h1>
        </Link>
      </div>
      <nav className={styles.header__nav}>
        <Link className={styles.header__link} href={"/images/1"}>
          Images
        </Link>
        <Link className={styles.header__link} href={"/map/1"}>
          Map
        </Link>
        {renderProfileJsx}
      </nav>
    </header>
  );
};

export default Header;

