import axios from "axios";

const instance = axios.create({ baseURL: "..." });
const startGame = async () => {
    const {
        data: { msg },
    } = await instance.post("/start");
    return msg;
};
const guess = async (number) => {
    try {
        //TODO:
        // return msg;
    } catch (error) {}
};

const restart = {};
export { startGame, guess, restart };
