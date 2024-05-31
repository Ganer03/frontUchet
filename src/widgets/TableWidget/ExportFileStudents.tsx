import {useEffect, useState} from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { API } from "../../constants.ts";
import {Group} from "../../../generated";

export const ExportFileStudents = ({ isOpen, onClose, text, groupId, status }: { isOpen: boolean, onClose: () => void, text: string, groupId: number | undefined, status: boolean | undefined}) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [isGroup, setGroup] = useState<Group| undefined>(undefined);

    useEffect(() => {
        if (!isOpen || groupId === undefined || groupId === 0)
            return;
        API.groupAPI.readGroupGroupsGroupIdGet(groupId).then(
            ({ data }) => {
                setGroup(data);
            }
        )
    }, [isOpen]);

    useEffect(() => {
        setGroup(undefined);
    }, [onClose]);

    const handleDownload = async () => {
        setIsDownloading(true);

        try {
            const response = await API.studentAPI.exportStudentsExportPost({
                    take: 999999,
                    skip: 0,
                    name: undefined,
                    groupId: groupId === 0 || groupId === undefined ? undefined: groupId,
                    // courseId: courseId === 0 ? undefined: courseId,
                    status: status,
                    order: undefined
            }, {responseType: 'blob'});

            // Handle file stream response
            // const blob = new Blob([response.data]);
            const link = document.createElement('a');
            link.href = URL.createObjectURL(response.data);
            link.download = 'students.xlsx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        } finally {
            setIsDownloading(false);
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>Загрузить документ</ModalHeader>
                <ModalBody>
                    <p>{text} {isGroup === undefined? '?': ' из группы '+isGroup.groupNumber+'?'}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Отмена
                    </Button>
                    <Button color="primary" onPress={handleDownload} disabled={isDownloading}>
                        {isDownloading ? 'Загрузка...' : 'Загрузить'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
