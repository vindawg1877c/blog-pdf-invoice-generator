import { Form, Input, ModalProps, FormProps, Modal, InputNumber } from "antd";

type EditMissionProps = {
    modalProps: ModalProps;
    formProps: FormProps;
};

export const EditMission: React.FC<EditMissionProps> = ({
    modalProps,
    formProps,
}) => {
    return (
        <Modal {...modalProps} title="Create Contact">
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="mission"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="mission_description">
                    <Input />
                </Form.Item>
                <Form.Item label="Day(s)" name="days">
                    <InputNumber defaultValue={1} />
                </Form.Item>
                <Form.Item label="Daily Rate" name="daily_rate">
                    <InputNumber defaultValue={1} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
