import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { API } from "../../constants.ts";

export const DeleteUser = ({ isOpen, onClose, studentId, studentName }: {isOpen: boolean, onClose: () => void, studentId: number | null, studentName: string}) => {
    const handleDelete = async () => {
        if (studentId !== null) {
            try {
                await API.studentAPI.deleteStudentStudentsStudentIdDelete(studentId);
                onClose();
            } catch (error) {
                console.error('Error deleting student:', error);
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>Удалить студента</ModalHeader>
                <ModalBody>
                    <p>Точно хотите удалить этого студента?</p>
                    <p>{studentName}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Отмена
                    </Button>
                    <Button color="primary" onPress={handleDelete}>
                        Удалить
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};