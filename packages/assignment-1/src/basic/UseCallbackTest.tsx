import React, { useState, useCallback } from "react";

const MeowButton = React.memo(({ onClick }) => <button onClick={onClick}>Meow</button>);
const BarkButton = React.memo(({ onClick }) => <button onClick={onClick}>Bark</button>);

function UseCallbackTest() {
    const [meowCount, setMeowCount] = useState(0);
    const [barkedCount, setBarkedCount] = useState(0);

    const incrementMeowCount = useCallback(() => {
        setMeowCount((n) => n + 1);
    }, []);

    const incrementBarkedCount = useCallback(() => {
        setBarkedCount((n) => n + 1);
    }, []);

    return (
        <div>
            <p data-testid="cat">meowCount {meowCount}</p>
            <p data-testid="dog">barkedCount {barkedCount}</p>
            <MeowButton onClick={incrementMeowCount} />
            <BarkButton onClick={incrementBarkedCount} />
        </div>
    );
}

export default UseCallbackTest;
