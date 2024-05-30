import {useEffect, useState} from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button, Input, Select, SelectItem, Selection,
} from '@nextui-org/react';
import {API, courseMap} from "../../constants.ts";
import {GroupCreate} from "../../../generated";

export const AddGroup= ({ isOpen, onClose}: {isOpen: boolean, onClose: ()=> void}) => {

    const [isFormValid, setIsFormValid] = useState(false);
    const [groupData, setGroupData] = useState<GroupCreate>({groupNumber: '', courseNumber: 1});

    useEffect(() => {
        setIsFormValid(groupData.groupNumber !== '' && groupData.courseNumber !== 0);
    }, [groupData]);

    const handleInputChange = (value: string) => {
        setGroupData({ ...groupData, groupNumber: value });
    };

    const handleSelectChange = (keys: Selection ) => {
        setGroupData({ ...groupData, courseNumber: Number(Array.from(keys)[0]) });
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
                <ModalHeader className="flex flex-col gap-1">Добавить группу</ModalHeader>
                <ModalBody>
                    <Input
                        placeholder="Группа"
                        name="groupNumber"
                        onValueChange={handleInputChange}
                        value={groupData.groupNumber}
                    />
                    <Select
                        items={courseMap}
                        label="Курс"
                        selectionMode={"single"}
                        disallowEmptySelection
                        placeholder="Выберите курс"
                        selectedKeys={[groupData.courseNumber]}
                        onSelectionChange={handleSelectChange}
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
