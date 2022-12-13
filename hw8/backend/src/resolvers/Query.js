import { ChatBoxModel } from '../models/chatbox';

const Query = {
    chatbox: async (parent, { name }, info) => {
        // console.log(name);
        let box = await ChatBoxModel.findOne({ name });
        if (!box) box = await new ChatBoxModel({ name }).save();
        return box;
    },
};
export default Query;
