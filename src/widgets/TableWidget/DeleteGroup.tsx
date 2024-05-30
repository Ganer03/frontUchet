import {useEffect, useState} from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button, Select, SelectItem,
} from '@nextui-org/react';
import {API} from "../../constants.ts";
import {Group} from "../../../generated";

export const DeleteGroup= ({ isOpen, onClose}: {isOpen: boolean, onClose: ()=> void}) => {

    const [isFormValid, setIsFormValid] = useState(false);
    const [groupData, setGroupData] = useState<number>(0);
    const [groupMap, selectGroup] = useState<Group[]>([]);

    useEffect(() => {
        if (!isOpen)
            return;
        API.groupAPI.getGroupsGroupsGet().then(
            ({ data }) => {
                selectGroup(data);
            }
        );
    }, [isOpen]);

    useEffect(() => {
        setIsFormValid(groupData !== 0);
    }, [groupData]);

    const handleSelectChange = (value: number | undefined) => {
        setGroupData( Number(value) );
    };

    const handleDeleteGroup = () => {
        API.groupAPI.deleteGroupGroupsGroupIdDelete(groupData).finally(()=>{
            setGroupData(0);
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
                <ModalHeader className="flex flex-col gap-1">Удалить группу</ModalHeader>
                <ModalBody>
                    <p>Вы уверены что хотите удалить группу?</p>
                    <Select
                        items={groupMap}
                        label="Группа"
                        placeholder="Выберите группу"
                        onChange={(e) => handleSelectChange(Number(e.target.value))}
                    >
                        {(item) => <SelectItem value={item.id} key={item.id}>{item.groupNumber}</SelectItem>}
                    </Select>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Закрыть
                    </Button>
                    <Button color={isFormValid ? 'primary': undefined} onPress={handleDeleteGroup} disabled={!isFormValid}>
                        Удалить
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
