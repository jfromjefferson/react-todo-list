import { useState } from 'react'
import Modal from 'react-modal'
import { ItemProps } from '../../context/item'
import styles from './styles.module.scss'

interface CopyModal {
    isOpen: boolean,
    item?: ItemProps
    onClose: () => void,
}

export function CopyModal({ isOpen, item, onClose }: CopyModal) {
    const [email, setEmail] = useState('')


    const textData = `Olá pessoa :)\n\nVocê pode editar esse item através desse link: ${location.protocol}//${location.host}${item?.permalink}`

    function copyToClipboard() {
        navigator.clipboard.writeText(textData)
        onClose()

        alert('Copiado para área de transferência')
    }

    return (
        <Modal id={styles.modal} isOpen={isOpen} onRequestClose={onClose}>
            <form>
                <textarea value={textData} onChange={() => { }}>
                </textarea>
                <input type="email" placeholder="E-mail" value={email} onChange={(event) => setEmail(event.target.value)} />

                <div className={styles.buttonArea}>
                    <button type="button" onClick={copyToClipboard}>Copiar</button>
                    <a href={`mailto:${email}`}> Enviar por e-mail</a>
                </div>
            </form>

        </Modal>
    )
}