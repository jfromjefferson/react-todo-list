import { useContext, useEffect, useState } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { NavLink, useParams } from 'react-router-dom'
import { ItemModal } from '../../components/ItemModal'
import { ItemContext, SubItemProps } from '../../context/item'
import { getSubItems } from '../../utils/utils'
import styles from './styles.module.scss'

export function Items() {
    const [itemId, setItemId] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [subItems, setSubItems] = useState<SubItemProps[]>([])

    const { items, onUpdateSubItem, onUpdateItem } = useContext(ItemContext)

    const params = useParams()

    function handleModal() {
        setIsModalOpen(!isModalOpen)

        if (isModalOpen) {
            setItemId(0)
        }
    }

    function handleItemDone(subItem: SubItemProps) {
        const filteredItem = items.find(item => item.permalink === `/list/${params.slug}`)!

        onUpdateSubItem(filteredItem, subItem)
    }

    async function handleDeleteSubItem(subItem: SubItemProps) {
        const filteredItem = items.find(item => item.permalink === `/list/${params.slug}`)!
        
        filteredItem.items = filteredItem.items.filter(subItemTemp => subItemTemp.id != subItem.id)

        await onUpdateItem(filteredItem)
    }

    useEffect(() => {
        const subItemList = getSubItems(items, params.slug!)

        setSubItems(subItemList)
    }, [items])

    return (
        <div className={styles.subItemListArea}>
            <header className={styles.header}>
                <span></span>
                <h2>{params.slug?.replaceAll('-', ' ')}</h2>

                <NavLink to='/'>Voltar</NavLink>
            </header>

            {
                subItems.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Criação</th>
                                <th>Finalizado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                subItems.map((subItem) => (
                                    <tr key={subItem.id} className={subItem.done ? styles['line-through'] : ''}>
                                        <td>{subItem.item}</td>
                                        <td>{subItem.created}</td>
                                        <td><input type="checkbox" checked={subItem.done} onChange={() => handleItemDone(subItem)} /></td>
                                        <td><FaTrash className={styles.icons} title="Excluir" onClick={() => handleDeleteSubItem(subItem)} /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                ) : <h2 className={styles.empty}>Nenhum item encontrado :(</h2>
            }

            <div className={styles.addItemButton} onClick={handleModal}>
                <FaPlus />
            </div>

            <ItemModal isOpen={isModalOpen} items={items} itemId={itemId} isSubItem={Boolean(params.slug)} onClose={handleModal} />
        </div>
    )
}