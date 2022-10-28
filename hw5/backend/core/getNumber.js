var number = 0;

export const getNumber = () => {
    return number;
};

export const genNumber = () => {
    number = getRandomInt(0, 100);
    return number;
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
