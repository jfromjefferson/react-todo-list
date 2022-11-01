import { FormEvent, useContext, useState, useEffect } from 'react'
import Modal from 'react-modal'
import styles from './style.module.scss'
import { ItemContext, ItemProps } from '../../context/item'
import { getRandomNumber, toSlug } from '../../utils/utils'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ModalProps {
    isOpen: boolean,
    itemId?: number,
    items: ItemProps[],
    isSubItem?: boolean,
    onClose: () => void,
}

export function ItemModal({ isOpen, items, itemId, isSubItem, onClose }: ModalProps) {
    const [itemName, setItemName] = useState('')
    const { onCreateItem, onUpdateItem } = useContext(ItemContext)

    const params = useParams()

    useEffect(() => {
        const filteredItem = items?.find(item => item.id === itemId)
        setItemName(filteredItem?.name ?? '')
    }, [itemId])

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        
        const createdFormatted = format(new Date(), "dd 'de' LLLL 'de' u 'às' HH:mm'h'", {
            locale: ptBR,
        })

        if (!isSubItem) {
            const itemData = {
                id: getRandomNumber(),
                name: itemName,
                created: createdFormatted,
                permalink: `/list/${toSlug(itemName)}`,
                items: [],
            }

            if (!itemId) {
                const success = await onCreateItem(itemData)

                if (success) {
                    setItemName('')
                    onClose()
                }
            } else {
                const filteredItem = items?.find(item => item.id === itemId)!

                const newItemData = {
                    ...filteredItem,
                    id: itemId,
                    name: itemName,
                    permalink: `/list/${toSlug(itemName)}`,
                }
                
                const success = await onUpdateItem(newItemData)

                if (success) {
                    setItemName('')
                    onClose()
                }
            }
        } else {
            const filteredItems = items.find(item => item.permalink === `/list/${params.slug}`)!

            const subItemData = {
                id: getRandomNumber(),
                item: itemName,
                created: createdFormatted,
                order: 0,
                done: false,
            }

            filteredItems.items.push(subItemData)

            const success = await onUpdateItem(filteredItems)

            if (success) {
                setItemName('')
                onClose()
            }
        }

    }

    return (
        <Modal id={styles.modal} isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={handleSubmit}>
                <h2>
                    {
                        !isSubItem ? 'Adicionar item' : 'Adicionar subitem'
                    }
                </h2>

                <input type="text" placeholder='Nome' value={itemName} autoFocus onChange={(event) => setItemName(event.target.value)} required />

                <button type='submit'>{
                    !itemId ? 'Adicionar' : 'Atualizar'
                }</button>
            </form>
        </Modal>
    )
}