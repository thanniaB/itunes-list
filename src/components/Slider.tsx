import React, {SyntheticEvent} from 'react';

type SliderProps = {
    currentMinIndex:number,
    currentMaxIndex:number,
    maxRange:number,
    handleFilterMinChange?: (value: number) => void,
    handleFilterMaxChange?: (value: number) => void,
}

function Slider (props:SliderProps):JSX.Element {
    const handleMinChange = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        props?.handleFilterMinChange?.(target.valueAsNumber)
    };
    const handleFilterMaxChange = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        props?.handleFilterMaxChange?.(target.valueAsNumber);
    }
    return (
        <div className="flex text-green-50 text-2xl items-center justify-between w-4/5">
            <input type="number" aria-label="filter-min" value={props.currentMinIndex} min={1} max={props.maxRange - 1} className="bg-black w-16" onChange={handleMinChange}/>
            <div className="dual-slider flex flex-col">
                {/*max is current value of next one - 1*/}
                <input className="filter-min" value={props.currentMinIndex} type="range" min="1" max={props.maxRange} id="filter-min" onChange={handleMinChange}/>
                <label className="visually-hidden" htmlFor="filter-min">Album Filter Min</label>
                {/*min is current value of the previous one + 1*/}
                <input className="filter-max" value={props.currentMaxIndex} type="range" min="1" max={props.maxRange} id="filter-max" onChange={handleFilterMaxChange}/>
                <label className="visually-hidden" htmlFor="filter-max">Album Filter Max</label>
            </div>
            <input type="number" aria-label="filter-max" value={props.currentMaxIndex} min={2} max={props.maxRange} className="bg-black w-16" onChange={handleFilterMaxChange}/>
        </div>
)
}

export default Slider;
