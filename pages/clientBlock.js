import styles from '../styles/Home.module.css'

export default function ClientBlock(props) {
    return (
        <div className={styles.clientDisplay}>
            <h3>Client:</h3>
            <div className={styles.name}>
                {client.clientFirstName} {client.clientLastName}
            </div>
            <div className={styles.email}>
                {client.clientEmail}
            </div>
        </div>
    );
}
