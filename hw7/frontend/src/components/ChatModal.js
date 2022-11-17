import { Modal, Form, Input } from 'antd';

const ChatModal = ({ open, onCreate, onCancel, setActiveKey }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title='Create a new chat room'
            okText='Create'
            cancelText='Cancel'
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((e) => {
                        window.alert(e);
                    });
            }}
        >
            <Form form={form} layout='vertical' name='form_in_modal'>
                <Form.Item
                    name='name'
                    lable='Name'
                    onChange={(e) => setActiveKey(e.target.value)}
                    rules={[
                        {
                            required: true,
                            message:
                                'Error: Please enter the name of the person to chat!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ChatModal;
