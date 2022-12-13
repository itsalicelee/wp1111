import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/*======User Schema======*/
const UserSchema = new Schema({
    name: { type: String, required: [true, 'Name field is required.'] },
    chatBoxes: [{ type: mongoose.Types.ObjectId, ref: 'ChatBox' }],
});

const UserModel = mongoose.model('User', UserSchema);
/*======Message Schema======*/
const MessageSchema = new Schema({
    chatBox: { type: mongoose.Types.ObjectId, ref: 'ChatBox' },
    sender: { type: mongoose.Types.ObjectId, ref: 'User' },
    body: { type: String, required: [true, 'Body field is required.'] },
});

const MessageModel = mongoose.model('Message', MessageSchema);
/*======Chatbox Schema======*/
 const ChatBoxSchema = new Schema({
     name: {
         type: String,
         required: [true, 'Name field is required.'],
     },
     messages: [
         {
             sender: { type: String },
             body: { type: String },
         },
     ],
 });
const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema);



export { UserModel, MessageModel, ChatBoxModel };
