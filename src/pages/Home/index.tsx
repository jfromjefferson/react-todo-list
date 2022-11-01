import { useContext, useState } from 'react'
import { FaPen, FaTrash, FaPlus, FaShare } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { CopyModal } from '../../components/CopyModal'
import { ItemModal } from '../../components/ItemModal'
import { ItemContext, ItemProps } from '../../context/item'
import styles from './styles.module.scss'

export function Home() {
    const [itemId, setItemId] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isCopyModalOpen, setIsCopyModalOpen] = useState(false)
    const [copyItem, setCopyItem] = useState<ItemProps>()
    const { items, onDeleteItem } = useContext(ItemContext)

    function handleModal() {
        setIsModalOpen(!isModalOpen)
        
        if(isModalOpen) {
            setItemId(0)
        }
    }

    function handleCopyModal(item?: ItemProps) {
        setIsCopyModalOpen(!isCopyModalOpen)

        if(item?.id) {
            setCopyItem(item)
        }
    }

    function handleEditItem(id: number) {        
        setItemId(id)
        handleModal()
    }

    return (
        <>
            <div className={styles.itemListArea}>
                {
                    items?.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Subitens</th>
                                    <th>Criação</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items?.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>
                                                <NavLink to={item.permalink}>
                                                    <button>
                                                        {
                                                            item.items.length > 0 
                                                            ? (`Ver os ${item.items.length} subitens cadastrados`)
                                                            : ('Criar subitem')
                                                        }
                                                    </button>
                                                </NavLink>
                                            </td>
                                            <td>{item.created}</td>
                                            <td>
                                                <FaPen className={styles.icons} title="Editar" onClick={() => handleEditItem(item.id)} /> 
                                                <FaTrash className={styles.icons} title="Excluir" onClick={() => onDeleteItem(item.id)} />
                                                <FaShare className={styles.icons} title="Compartilhar" onClick={() => handleCopyModal(item)} />
                                            </td>
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
            </div>
            <ItemModal isOpen={isModalOpen} items={items} isSubItem={false} itemId={itemId} onClose={() => handleModal()} />
            <CopyModal isOpen={isCopyModalOpen} item={copyItem} onClose={handleCopyModal} />
        </>
    )
}