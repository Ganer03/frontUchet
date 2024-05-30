import { useEffect, useState} from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button, Input, Select, SelectItem, Switch, Selection,
} from '@nextui-org/react';
import {API} from "../../constants.ts";
import {Group, StudentCreate} from "../../../generated";

export const AddStudent= ({ isOpen, onClose}: {isOpen: boolean, onClose: ()=> void}) => {

    const [isFormValid, setIsFormValid] = useState(false);
    const [studentData, setStudentData] = useState<StudentCreate>({ name: '', groupId: 0, status: false });
    const [groupMap, selectGroup] = useState<Group[]>([]);

    useEffect(() => {
        if (!isOpen)
            return;
        API.groupAPI.getGroupsGroupsGet().then(
            ({ data }) => {
                selectGroup(data);
            }
        )
    }, [isOpen]);

    useEffect(() => {
        setIsFormValid(studentData.name !== '' && studentData.groupId !== 0);
    }, [studentData]);

    const handleInputChange = (value: string) => {
        setStudentData({ ...studentData, name: value });
    };

    const handleSelectChange = (keys: Selection) => {
        setStudentData({ ...studentData, groupId: Number(Array.from(keys)[0])});
    };

    const handleSwitchChange = (value: boolean) => {
        setStudentData({ ...studentData, status: value });
    };

    const handleAddStudent = () => {
        API.studentAPI.createStudentStudentsPost({
                name: studentData.name,
                groupId: studentData.groupId,
                status: studentData.status
        }).finally(()=>{
            setStudentData({ name: '', groupId: 0, status: false });
            onClose();
        });
    };

    return (
        <Modal
            size={"5xl"}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Добавить студента</ModalHeader>
                <ModalBody>
                    <Input
                        placeholder="Имя"
                        name="name"
                        value={studentData.name}
                        onValueChange={handleInputChange}
                    />
                    <Select
                        items={groupMap}
                        label="Группа"
                        selectionMode={"single"}
                        placeholder="Выберите группу"
                        disallowEmptySelection
                        selectedKeys={[studentData.groupId]}
                        onSelectionChange={handleSelectChange}
                    >
                        {(item) => <SelectItem value={item.id} key={item.id}>{item.groupNumber}</SelectItem>}
                    </Select>
                    <Switch
                        isSelected={studentData.status}
                        onValueChange={handleSwitchChange}
                    >
                        Статус
                    </Switch>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Закрыть
                    </Button>
                    <Button color={isFormValid ? 'primary': undefined} onPress={handleAddStudent} disabled={!isFormValid}>
                        Добавить
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
