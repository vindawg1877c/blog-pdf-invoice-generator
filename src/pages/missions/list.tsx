import { List, useTable, TagField, useModalForm, EditButton } from "@refinedev/antd";
import { Table } from "antd";

import { IMission } from "interfaces";
import { CreateMission, EditMission } from "components/mission";

export const MissionList: React.FC = () => {
    const { tableProps } = useTable<IMission>();

    const { formProps, modalProps, show } = useModalForm({
        resource: "missions",
        action: "create",
    });

    const {
        formProps: editFormProps,
        modalProps: editModalProps,
        show: editShow,
    } = useModalForm({
        resource: "missions",
        action: "edit",
    });

    return (
        <>
            <List
                createButtonProps={{
                    onClick: () => {
                        show();
                    },
                }}
            >
                <Table {...tableProps}>
                    <Table.Column dataIndex="id" title="ID" />
                    <Table.Column dataIndex="mission" title="Name" />
                    <Table.Column
                        dataIndex="mission_description"
                        title="Mission Description"
                    />
                    <Table.Column dataIndex="days" title="Day(s)" />
                    <Table.Column
                        dataIndex="daily_rate"
                        title="Daily Rate"
                        render={(value) => (
                            <TagField value={value} color="red" />
                        )}
                    />
                    <Table.Column<IMission>
                        title="Total"
                        render={(_, record) => {
                            return (
                                <TagField
                                    value={`${
                                        record?.daily_rate * record?.days
                                    } $`}
                                    color="green"
                                />
                            );
                        }}
                    />
                    <Table.Column<IMission>
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        render={(_value, record) => (
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record?.id}
                                onClick={() => editShow(record?.id)}
                            />
                        )}
                    />
                </Table>
            </List>
            <CreateMission modalProps={modalProps} formProps={formProps} />
            <EditMission
                modalProps={editModalProps}
                formProps={editFormProps}
            />
        </>
    );
};
