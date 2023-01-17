import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
    apiKey: "AIzaSyDamm1Jk32aHjLWBFT8i8AZT8AWPcWgmao",
    authDomain: "outvoice-33a12.firebaseapp.com",
    projectId: "outvoice-33a12",
    storageBucket: "outvoice-33a12.appspot.com",
    messagingSenderId: "265279482415",
    appId: "1:265279482415:web:7afb443e35bbe2320ef4da",
    measurementId: "G-5W9GQ693G2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

*/

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Outvoice</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Outvoice
        </h1>

        <p className={styles.description}>
            Managing your invoices, made easy
        </p>

              <div className={styles.grid}>
                  <Link href="newInvoice" className={styles.card}>
                      <h3>Create a new invoice &rarr;</h3>
                  </Link>

                  <a href="manageInvoices" className={styles.card}>
                    <h3>Manage invoices &rarr;</h3>
                  </a>

                  <a
                    href="https://github.com/vercel/next.js/tree/master/examples"
                    className={styles.cardSoon}
                  >
                      <h3>Reports &rarr;</h3>
                      <p><i>Coming soon!</i></p>
                  </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}