import {
    Button,
    useDisclosure, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from '@nextui-org/react';
import {AddNoteIcon} from "../AddNoteIcon.tsx";
import {EditDocumentIcon} from "../EditDocumentIcon.tsx";
import {AddFileStudent} from "./AddFileStudent.tsx";
import {AddStudent} from "./AddStudent.tsx";
import {ExportFileStudents} from "./ExportFileStudents.tsx";
import {useState} from "react";
import {groupMap} from "../../constants.ts";
import {AddGroup} from "./AddGroup.tsx";
import {DeleteGroup} from "./DeleteGroup.tsx";
import {DeleteIcon} from "../DeleteIcon.tsx";

export const AddStudentButton = ({onCloseModal, groupId,onCloseModalGroup}: {onCloseModal: ()=>void,onCloseModalGroup: ()=>void, groupId: number | undefined}) => {
    const [isStatus, setStatus] = useState<boolean | undefined>(undefined);
    const [isText, setText] = useState<string>('');
    // const [isGroup, setGroup] = useState<string>('');
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {isOpen: isGroupAddOpen, onOpen: onGroupAddOpen, onClose: onGroupAddClose} = useDisclosure();
    const {isOpen: isGroupDeleteOpen, onOpen: onGroupDeleteOpen, onClose: onGroupDeleteClose} = useDisclosure();
    const { isOpen: isFileOpen, onOpen: onFileOpen, onClose: onFileClose } = useDisclosure();
    const { isOpen: isExportOpen, onOpen: onExportOpen, onClose: onExportClose } = useDisclosure();



    return (
        <>
            <DeleteGroup isOpen={isGroupDeleteOpen} onClose={() => {onGroupDeleteClose(); onCloseModal(); onCloseModalGroup();}}/>
            <AddGroup isOpen={isGroupAddOpen} onClose={() => {onGroupAddClose(); onCloseModal(); onCloseModalGroup();}} />
            <ExportFileStudents text={isText} status={isStatus} groupId={groupId} isOpen={isExportOpen} onClose={() => {onCloseModal(); onExportClose();}}/>
            <AddStudent isOpen={isOpen} onClose={() => {onClose(); onCloseModal();}}/>
            <AddFileStudent isOpen={isFileOpen} onClose={() => {onCloseModal(); onFileClose();}}/>
            <div className={"w-full sm:max-w-[44%] h-full"}>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        fullWidth={true}
                        color={"primary"}
                        variant="solid"
                    >
                        Импорт/экспорт
                    </Button>
                </DropdownTrigger>
                <DropdownMenu variant="light" aria-label="Пользовательское окно, аккуратно делать все">
                    <DropdownItem
                        onPress={onOpen}
                        key="newStuddent"
                        color={"primary"}
                        description="Добавить одного нового студента"
                        startContent={<AddNoteIcon className={iconClasses} />}
                    >
                        Добавить студента
                    </DropdownItem>
                    <DropdownItem
                        onPress={onGroupAddOpen}
                        key="newGroup"
                        color={"primary"}
                        description="Добавить группу"
                        startContent={<AddNoteIcon className={iconClasses} />}
                    >
                        Добавить группу
                    </DropdownItem>
                    <DropdownItem
                        onPress={() =>{
                            setStatus(false);
                            setText(`Вы уверены, что хотите скачать файл со студентами, не сдавшими зачетки${groupId === 0? '?': ' из группы '+ groupMap.filter(itemMap => itemMap.id === groupId).map(itemMap => itemMap.groupNumber)[0]+'?'}`);
                            onExportOpen();
                        }}
                        key="copy"
                        color={"primary"}
                        description="Скачать файл с студентами не сдавшими зачетки и/или с выбранной группой"
                        startContent={<EditDocumentIcon className={iconClasses} />}
                    >
                        Скачать со статусом не сдали
                    </DropdownItem>
                    <DropdownItem
                        onPress={
                            () => {setStatus(undefined);
                                setText(`Вы уверены, что хотите скачать файл со всеми студентами${groupId === 0? '?': ' из группы '+groupMap.filter(itemMap => itemMap.id === groupId).map(itemMap => itemMap.groupNumber)[0]+'?'}`);
                            onExportOpen();}}
                        key="edit"
                        color={"primary"}
                        description="Документ в котором все студенты с/без выбранной группой"
                        startContent={<EditDocumentIcon className={iconClasses} />}
                    >
                        Скачать всех
                    </DropdownItem>
                    <DropdownItem
                        onPress={onFileOpen}
                        key="download"
                        color={"primary"}
                        showDivider
                        description="Загрузить документ"
                        startContent={<AddNoteIcon className={iconClasses} />}
                    >
                        Загрузить документ
                    </DropdownItem>
                    <DropdownItem
                        onPress={onGroupDeleteOpen}
                        key="deleteGroup"
                        className="text-danger"
                        color="danger"
                        description="Удалить группу"
                        startContent={<DeleteIcon className={iconClasses} />}
                    >
                        Удалить группу
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            </div>
        </>
    );
};
