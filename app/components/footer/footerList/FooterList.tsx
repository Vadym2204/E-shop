import Link from "next/link";
import { FC } from "react";
import styles from "./FooterList.module.scss";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import Container from "../../styles/Container";

const FooterList: FC = () => {
  return (
    <Container>
    <div className={styles.content}>
      <ul className={styles.info}>
        <h2>Shop Categories</h2>
        <Link href="#">Phones</Link>
        <Link href="#">Laptops</Link>
        <Link href="#">Desktops</Link>
        <Link href="#">Watches</Link>
        <Link href="#">TVs</Link>
        <Link href="#">Accessories</Link>
      </ul>
      <ul className={styles.info}>
        <h2>Customer Service</h2>
        <Link href="#">Contact us</Link>
        <Link href="#">Shipping Policy </Link>
        <Link href="#">Returns & Exchanges</Link>
        <Link href="#">Watches</Link>
        <Link href="#">FAQs</Link>
      </ul>
      <ul className={styles.info}>
        <h2>About Us</h2>
        <p>
          At our electronics store, we are dedicated to providing the latest and
          greatest devices and accessories to our customers. With a wide
          selection of phones, TVs, laptops, watches, and accessories.
        </p>
        <p>&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
      </ul>
      <ul className={styles.info}>
        <h2>Follow Us</h2>
        <div className={styles.icons}>
          <Link href="#">
            <FaFacebookF size={25} />
          </Link>
          <Link href="#">
            <FaTwitter size={25} />
          </Link>
          <Link href="#">
            <IoLogoInstagram size={25} />
          </Link>
          <Link href="#">
            <FaYoutube size={25} />
          </Link>
        </div>
      </ul>
    </div>
    </Container>
  );
};

export default FooterList;
