// in "resolvers/Mutation.js"
const Mutation = {
    createMessage: async (parent, { name, to, body }, { pubsub }) => {
        const chatBox = await checkOutChatBox(name, to);
        const newMsg = { sender: name, body };
        chatBox.messages.push(newMsg);
        await chatBox.save();
        const chatBoxName = makeName(name, to);
        pubsub.publish(`chatBox ${chatBoxName}`, {
            message: newMsg,
        });
        return newMsg;
    },
    createChatBox: (parent, { name1, name2 }) => {
        return checkOutChatBox(name1, name2);
    },
};


