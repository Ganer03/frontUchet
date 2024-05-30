import React, { useState } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from '@nextui-org/react';
import {API} from "../../constants.ts";

export const AddFileStudent= ({ isOpen, onClose }: {isOpen: boolean, onClose: ()=> void}) => {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            setFile(event.dataTransfer.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file) {
            try {
                await API.studentAPI.importStudentsStudentsImportPost(
                    file
                );
                console.log('File uploaded successfully');
                onClose();
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>Загрузить документ</ModalHeader>
                <ModalBody>
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 rounded-xl border-dashed p-4 flex flex-col items-center justify-center ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                        style={{ minHeight: '200px', position: 'relative', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                        onClick={() => document.getElementById('fileUpload')?.click()}
                    >
                        <p className="text-gray-500 mt-2 text-center">Перетащите файл сюда или нажмите для загрузки</p>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            id="fileUpload"
                        />
                        {file && <p className="mt-2 text-green-500">{file.name}</p>}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Закрыть
                    </Button>
                    <Button
                        color={file ? 'primary': undefined}
                        onPress={handleUpload}
                        disabled={!file}
                    >
                        Подтвердить
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
