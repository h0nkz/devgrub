import { fetchFilterList } from "./recipeFetcher.js";

export async function getFilter(filterList) {
    

    for(let i = 0; i < filterList.length; i++)
    {
        const LIST_ITEM = document.createElement('li');
        LIST_ITEM.className = 'filter_item';
        LIST_ITEM.innerHTML = filterList[i].strArea;
        flex_ul.appendChild(LIST_ITEM);
    }
    return flex_ul.outerHTML;
}
