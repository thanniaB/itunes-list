import React from 'react';

type AlbumListItemProps = {
    title:string,
    imageUrl:string,
    number?:number,
    handleClick?: (place: number | undefined) => void,
}

function AlbumListItem (props:AlbumListItemProps):JSX.Element {
    return (
        <li className="bg-black flex py-2 pr-5 items-center hover:bg-gray-900" onClick={() => props?.handleClick?.(props.number)}>
            <div className="place text-purple-100 border-r border-purple-100 text-3xl w-1/12 p-1">{props.number}</div>
            <img src={props.imageUrl} alt="album cover" className="mx-5 w-1/12"/>
            <div className="text-green-50 font-semibold break-words w-10/12 text-left">{props.title}</div>
        </li>
    )
}

export default AlbumListItem;
