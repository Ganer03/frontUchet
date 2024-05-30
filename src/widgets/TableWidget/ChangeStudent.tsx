import { useEffect, useState } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button, Input, Select, SelectItem, Switch, Selection,
} from '@nextui-org/react';
import { API } from "../../constants.ts";
import {Student} from "../../../generated";

interface Group {
    groupNumber: string;
    courseNumber: number;
    id: number;
}

interface EditStudentButtonProps {
    isOpen: boolean;
    onClose: () => void;
    // initialData: StudentUpdate;
    groupMap: Group[];
    studentId: number
}

export const ChangeStudent = ({ isOpen, onClose, groupMap, studentId }: EditStudentButtonProps) => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [studentData, setStudentData] = useState<Student | undefined>(undefined);
    // const [studentId, setStudentId] = useState<number | null>(id);

    useEffect(() => {
        if (!isOpen)
            return;
        API.studentAPI.readStudentStudentsStudentIdGet(studentId)
            .then(({data}) => { setStudentData(data);});
    }, [studentId, isOpen]);

    useEffect(() => {
        if (studentData === undefined)
            return setIsFormValid(false)
        setIsFormValid(studentData.name !== '' && studentData.groupId !== 0);
    }, [studentData]);

    const handleInputChange = (value: string) => {
        if (studentData === undefined)
            return;
        setStudentData({ ...studentData, name: value });
    };

    const handleSelectChange = (keys: Selection) => {
        if (studentData === undefined)
            return;
        setStudentData({ ...studentData, groupId: Number(Array.from(keys)[0])});
    };

    const handleSwitchChange = (value: boolean) => {
        if (studentData === undefined)
            return;
        setStudentData({ ...studentData, status: value });
    };

    const handleEditStudent = () => {
        if (studentData === undefined)
            return;
        API.studentAPI.updateStudentStudentsStudentIdPut(
             studentId, studentData
        ).finally(()=>onClose());
    };

    return (
        <Modal
            size={"5xl"}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Изменить данные студента</ModalHeader>
                <ModalBody>
                    {studentData && <>
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
                    </>}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Закрыть
                    </Button>
                    <Button color={isFormValid ? 'primary' : undefined} onPress={handleEditStudent} disabled={!isFormValid}>
                        Сохранить изменения
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
