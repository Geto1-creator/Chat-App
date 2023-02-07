import { useContext } from 'react'
import styles from './assets/css/chatheader.module.css'
import { ChatContext } from './common/Provider/ChatProvider'


export const ChatHeader = () => {
    const {data} = useContext(ChatContext)
    console.log(data)
    return (
        <div className={styles.Container}>
            <div className={styles.userSection}>
                <span>{data.user?.name}</span>
            </div>
        </div>
    )
}