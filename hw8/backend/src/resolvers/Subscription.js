

const Subscription = {
    message: {
        subscribe: (parent, { from, to }, { pubsub }) => {
            const chatBoxName = makeName(from, to);
            return pubsub.subscribe(`chatBox ${chatBoxName}`);
        },
    },
};
