import { useState, useEffect } from "react";

const RatingBar = ({onValueChange}) => {
    
    const [value, setValue] = useState(1);

    const [maxValue, setMaxValue] = useState(10);

    const handleRatingChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        setValue(newValue);
        onValueChange(newValue);
    };

    useEffect(() => {
        if (value > maxValue) {
            setValue(maxValue);
        }
    }, [maxValue,value]);

    return (
        <div>
            <div className='type'>Rating</div>
            <div>
                <input type='range' id="rating" name="rating" min="1" max={maxValue} value={value} onChange={handleRatingChange}/>
                <p className='value'>{value}</p>
            </div>
        </div>
    );
}

export default RatingBar;