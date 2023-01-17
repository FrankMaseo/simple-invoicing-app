import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function FirstPost() {
    return (
        <div className={styles.container}>
            <Head> 
                <title>First Post</title>
            </Head>

            <main>
                <h1>First Post</h1>
                <h2><Link href="/">Back to Home</Link></h2>
            </main>
            
        </div>
    );
}