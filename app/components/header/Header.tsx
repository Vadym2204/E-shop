import React, { FC } from "react";
import Search from "./nav/Search";
import styles from "./Header.module.scss";
import { Redressed } from "next/font/google";
import Link from "next/link";
import CartCount from "./nav/CartCount";
import UserMenu from "./nav/UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Categories from "./nav/Categories";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const Header: FC = async () => {
  const currentUser = await getCurrentUser()
  return (
    <>
      <div className={styles.nav}>
        <Link href="/" className={`${redressed.className} ${styles.title}`}>
          E-shop
        </Link> <div className="hidden md:block">

        <Search/>
        </div>
        <div className={styles.navLinks}>
          <CartCount/>
          <UserMenu currentUser={currentUser}/>
        </div>
      </div>
        <Categories/>
    </>
  );
};

export default Header;
