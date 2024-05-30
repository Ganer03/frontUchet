import React, {useEffect, useState} from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button, Input, Select, SelectItem,
} from '@nextui-org/react';
import {API, courseMap} from "../../constants.ts";
import {GroupCreate} from "../../../generated";

export const AddGroup= ({ isOpen, onClose}: {isOpen: boolean, onClose: ()=> void}) => {

    const [isFormValid, setIsFormValid] = useState(false);
    const [groupData, setGroupData] = useState<GroupCreate>({groupNumber: '', courseNumber: 0});

    useEffect(() => {
        setIsFormValid(groupData.groupNumber !== '' && groupData.courseNumber !== 0);
    }, [groupData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setGroupData({ ...groupData, [name]: value });
        console.log(groupData);
    };

    const handleSelectChange = (value: number | undefined) => {
        setGroupData({ ...groupData, courseNumber: Number(value) });
        console.log(groupData);
    };

    const handleAddStudent = () => {
        API.groupAPI.createGroupGroupsPost({
            groupNumber: groupData.groupNumber,
            courseNumber: groupData.courseNumber
        }).finally(()=>{
            setGroupData({groupNumber: '', courseNumber: 0});
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
                        placeholder="Группа"
                        name="groupNumber"
                        value={groupData.groupNumber}
                        onChange={handleInputChange}
                    />
                    <Select
                        items={courseMap}
                        label="Курс"
                        placeholder="Выберите курс"
                        onChange={(e) => handleSelectChange(Number(e.target.value))}
                    >
                        {(item) => <SelectItem value={item.id} key={item.id}>{item.course}</SelectItem>}
                    </Select>
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
