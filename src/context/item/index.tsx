import { createContext, ReactNode, useEffect, useState } from 'react'

export interface SubItemProps {
    id: number,
    item: string,
    created?: string,
    order: number,
    done?: boolean,
}

export interface ItemProps {
    id: number,
    name: string,
    created?: string,
    permalink: string,
    items: SubItemProps[],
}

interface ItemContextProps {
    items: ItemProps[],
    onCreateItem: (item: ItemProps) => Promise<boolean>,
    onUpdateItem: (item: ItemProps) => Promise<boolean>,
    onDeleteItem: (id: number) => Promise<boolean>,
    onUpdateSubItem: (item: ItemProps, subItem: SubItemProps) => Promise<boolean>,
}

interface ItemProviderProps {
    children: ReactNode
}

export const ItemContext = createContext<ItemContextProps>({} as ItemContextProps)

export function ItemProvider({ children }: ItemProviderProps) {
    const [ items, setItems ] = useState<ItemProps[]>([])

    useEffect(() => {
        const dbItems = localStorage.getItem('items')

        if(!dbItems) {
            localStorage.setItem('items', JSON.stringify(items))
        }else {
            setItems(JSON.parse(dbItems))
        }
    }, [])

    async function onCreateItem(item: ItemProps) {
        const itemListTemp = [item, ...items] 
        setItems(itemListTemp)
        localStorage.setItem('items', JSON.stringify(itemListTemp))

        return true
    }

    async function onUpdateItem(item: ItemProps) {
        const itemTemp = items.find(itemTemp => itemTemp.id === item.id)!
        const itemListTemp = [...items]
        const itemIndex = items.findIndex(item => item.id === itemTemp.id)

        itemListTemp[itemIndex] = item

        setItems(itemListTemp)
        localStorage.setItem('items', JSON.stringify(itemListTemp))
        return true
    }

    async function onDeleteItem(id: number) {
        const itemListTemp = items.filter(item => item.id !== id)

        setItems(itemListTemp)
        localStorage.setItem('items', JSON.stringify(itemListTemp))
        return true
    }

    async function onUpdateSubItem(item: ItemProps, subItem: SubItemProps) {
        subItem.done = !subItem.done

        await onUpdateItem(item)

        return true
    }

    return (
        <ItemContext.Provider value={{ items, onCreateItem, onDeleteItem, onUpdateItem, onUpdateSubItem }}>
            { children }
        </ItemContext.Provider>
    )
}