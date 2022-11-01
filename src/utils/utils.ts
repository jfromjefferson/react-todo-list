import { ItemProps } from "../context/item"

export function getRandomNumber() {
    return Math.floor(Math.random()*99999999)
}

export function toSlug(text: string) {
    return text.toLowerCase()
       .replace(/\s+/g, '-')
       .replace(/[^\w\-]+/g, '-')
       .replace(/\-\-+/g, '-')
       .replace(/^-+/, '-')
       .replace(/-+$/, '-')
       .replace('_', '-')
}

export function getSubItems(items: ItemProps[], slug: string) {
    if(items){
        const filteredItems = items.find(item => item.permalink === `/list/${slug}`)!

        return filteredItems?.items ?? []
    }

    return []
}