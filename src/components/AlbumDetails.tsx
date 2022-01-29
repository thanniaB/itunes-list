import React from 'react';

type AlbumDetailsProps = {
    name: string,
    artist: string,
    imageUrl: string,
    date:string,
    copyright:string,
    url:string,
    category:string,
    isBigScreen:boolean,
}

function AlbumDetails (props:AlbumDetailsProps):JSX.Element {
    const {name, artist, imageUrl, date, copyright, url, category, isBigScreen} = props;
    const readableDate = new Date(date);

    return (
        <div className={`${!name || !isBigScreen ? 'hidden' : 'w-2/5'} text-indigo-50 bg-black h-1/4 flex flex-col p-8 items-center`}>
            <img src={imageUrl} alt="album cover" width="170" height="170" className="mb-2"/>
            <div className="text-3xl font-bold">{name}</div>
            <div className="text-2xl">{artist}</div>
            <div>{readableDate.toDateString()}</div>
            <div>{category}</div>
            <a href={url} target="_blank" className="block bg-green-50 text-black font-bold rounded p-1 hover:bg-pink-50 mt-2 mb-3">Buy!</a>
            <div className="text-xs">{copyright}</div>
        </div>
    )
}

export default AlbumDetails;
