import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { API } from "../../constants.ts";

export const ExportFileStudents = ({ isOpen, onClose, text, groupId, status }: { isOpen: boolean, onClose: () => void, text: string, groupId: number | undefined, status: boolean | undefined }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        setIsDownloading(true);

        try {
            const response = await API.studentAPI.exportStudentsExportPost({
                    take: 999999,
                    skip: 0,
                    name: undefined,
                    groupId: groupId === 0 ? undefined: groupId,
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
                    <p>{text}</p>
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
