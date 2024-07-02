export function createHooks(callback) {
    let state = null; // 전역 상태 변수
    const useState = (initState) => {
        console.log("callback 1:", initState);
        state = initState;

        const setState = (newState) => {
            state = newState;
            console.log("callback 22222:", newState);
            const result = callback(); // 상태가 업데이트될 때마다 콜백 실행
            console.log("resul :", result);
        };

        return [state, setState];
    };

    const useMemo = (fn, refs) => {
        return fn();
    };

    const resetContext = () => {};

    return { useState, useMemo, resetContext };
}
