import React, {useState, useEffect, SyntheticEvent} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import AlbumListItem from "./components/AlbumListItem";
import Slider from "./components/Slider";
import AlbumDetails from "./components/AlbumDetails";

type Details = {
    label: string,
}

type Category = {
    attributes: Details
}

type Album = {
    id: Details,
    category: Category,
    rights: Details,
    title: Details,
    place?: number,
    "im:name": Details,
    "im:artist": Details,
    "im:image": [Details, Details, Details],
    "im:releaseDate": Details
};

function App() {
    const emptyAlbum: Album = {
        "im:name":{label:""},
        "im:artist":{label:""},
        title:{label:""},
        "im:image":[{label:""}, {label:""}, {label:""}],
        "im:releaseDate":{label:""},
        id:{label:""},
        rights:{label:""},
        category:{attributes: {label:""}},
    }
    const [displayedAlbums, setDisplayedAlbums] = useState([]);
    const [allAlbums, setAllAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isBigScreen, setIsBigScreen] = useState(true);
    const [maxAlbums, setMaxAlbums] = useState(100);
    const [filterMin, setFilterMin] = useState(0);
    const [filterMax, setFilterMax] = useState(99);
    const [selectedAlbum, setSelectedAlbum] = useState(emptyAlbum)


    useEffect(() => {
        let ignore = false;
        const fetchAlbums = async () => {
            try {
                const response = await axios.get('https://itunes.apple.com/us/rss/topalbums/limit=100/json');
                if (!ignore) {
                    const responseAlbums = response.data.feed.entry;
                    responseAlbums.forEach((element: Album, index: number) => {
                        element.place = index + 1
                    });
                    setAllAlbums(responseAlbums);
                    setDisplayedAlbums(responseAlbums);
                    setMaxAlbums(responseAlbums.length);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchAlbums();
        const resizeHandler = () => {
          let intViewportWidth = window.innerWidth;
          if (intViewportWidth < 1025) {
            setIsBigScreen(false);
          } else {
            setIsBigScreen(true);
          }
        };

        window.addEventListener('resize', resizeHandler);

        return () => {
            ignore = true;
            window.removeEventListener("resize", resizeHandler);
        };

    }, []);

    useEffect(() => {
        let minValue = filterMin === 0 ? filterMin : filterMin - 1;
        setDisplayedAlbums(allAlbums.slice(minValue, filterMax));
    }, [filterMin, filterMax]);

    const handleOnSearchboxChange = (event: SyntheticEvent) => {
        const element = event.currentTarget as HTMLInputElement;
        const value: string = element.value;

        function hasQuery(album: Album) {
            const title = album.title.label.toLowerCase();
            return title.includes(value.toLowerCase());
        }

        setDisplayedAlbums(displayedAlbums.filter(hasQuery));

        if (value === '' || value === undefined) {
            setDisplayedAlbums(allAlbums);
        }
    }

    const handleFilterMinChange = (value: number | undefined) => {
        if (!value) { return; }
        setFilterMin(value);
    }

    const handleFilterMaxChange = (value: number | undefined) => {
        if (!value) { return; }
        value = value > maxAlbums ? maxAlbums : value;
        setFilterMax(value);
    }

    const resetList = () => {
        setDisplayedAlbums(allAlbums);
    }

    const handleSelectAlbum = (place: number | undefined) => {
        if(!place) { return; }
        setSelectedAlbum(allAlbums[place - 1]);
    }

    if (isLoading) {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="loading"/>
                    <div className="my-4 text-red-500 text-center font-bold">Loading...</div>
                </div>

            </div>
        );
    } else {
        return (
            <div className="App">
                <header className="flex p-8 justify-between items-center">
                    <div className="text-indigo-50">
                        <div className="text-5xl">
                            Top {maxAlbums} Albums on iTunes
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-end">
                        <input aria-label="search-input" placeholder="Search..." type="text"
                               className="p-2 rounded w-2/3"
                               onChange={handleOnSearchboxChange}/>
                    </div>
                </header>
                <div className="h-10 mb-5 border-t-4 border-b-4 border-black flex justify-between px-5">
                    <Slider currentMinIndex={filterMin} currentMaxIndex={filterMax} maxRange={maxAlbums}
                            handleFilterMinChange={handleFilterMinChange}
                            handleFilterMaxChange={handleFilterMaxChange}/>
                    <button onClick={resetList}
                            className="bg-pink-500 rounded p-1 active:bg-pink-600 hover:bg-pink-400">Reset
                    </button>
                </div>
                <main className="flex">
                    <div
                        className={`ml-5 text-pink-500 text-3xl font-semibold ${displayedAlbums.length ? "hidden" : ""}`}>
                        <span
                            className={`${filterMin < filterMax ? "hidden" : ""}`}>
                            Index out of bounds ...
                        </span>
                        No albums found :(
                    </div>
                    <ul className={`${isBigScreen ? "w-3/5 mr-8" : "w-full"} ${displayedAlbums.length ? "" : "hidden"}`}>
                        {displayedAlbums.map((album: Album, index: number) => (
                            <AlbumListItem title={album.title.label} key={index} number={album.place}
                                           imageUrl={album["im:image"][1].label} handleClick={handleSelectAlbum}/>
                        ))}
                    </ul>
                    <AlbumDetails name={selectedAlbum["im:name"].label} artist={selectedAlbum["im:artist"].label}
                                  imageUrl={selectedAlbum["im:image"][2].label}
                                  date={selectedAlbum["im:releaseDate"].label} copyright={selectedAlbum.rights.label}
                                  url={selectedAlbum.id.label} category={selectedAlbum.category.attributes.label}
                                  isBigScreen={isBigScreen}
                    />
                </main>
            </div>
        );
    }

}

export default App;
