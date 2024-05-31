import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Input,
    Switch,
    getKeyValue,
    Select,
    SelectItem,
    SortDescriptor, Tooltip, useDisclosure, SelectSection, Selection,
} from "@nextui-org/react";
import React, {useCallback, useEffect, useState} from "react";
import { SearchIcon } from "../SearchIcon.tsx";
import {API, columns, courseMap} from "../../constants.ts";
import { AddStudentButton } from "./AddStudentButton.tsx";
import {DeleteIcon} from "../DeleteIcon.tsx";
import {EditIcon} from "../EditIcon.tsx";
import {DeleteUser} from "./DeleteUser.tsx";
import {Group, StudentWithGroup} from "../../../generated";
import {ChangeStudent} from "./ChangeStudent.tsx";

const MySwitch = ({item}: {item: StudentWithGroup}) => {
    const [isSelected, setSelected] = useState(item.status)

    const changeStatus = useCallback((status: boolean) =>{
             API.studentAPI.changeStatusStudentsChangeStatusPatch({
                studentId: item.id,
                status
            });
        },[item]
    )

    useEffect(() => {
        setSelected(item.status);
    }, [item]);
    return (
        <Switch
            defaultSelected={item.status}
            isSelected={isSelected}
            onValueChange={(value) => {
                setSelected(value);
                changeStatus(value);
            }}
        />
    )
}

export const TableWidget = () => {
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [countStudents, setCountStudents] = useState(20);
    const [limit, setLimit] = useState(20);
    const [status, setStatus] = useState<boolean | undefined>(undefined);
    const [searchQuery, setSearchQuery] = useState('');
    const [students, setStudents] = useState<StudentWithGroup[]>([]);
    const [groupId, setGroupId] = useState<number>(0);
    const [courseId, setCourseId] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<SortDescriptor>({ column: "id", direction: "ascending" });
    const [selectedStudentId, setSelectedStudentId] = useState<number>(0);
    // const [selectedStudent, setSelectedStudent] = useState<StudentUpdate>({name: '', groupId: 0, status: false});
    const [groupMap, selectGroup] = useState<Group[]>([{groupNumber: '', courseNumber: 0, id:0}])
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

    const handleSelectChange = (keys: Selection) => {
        if (isNaN(Number(Array.from(keys)[0])))
            setCourseId(0);
        else
            setCourseId(Number(Array.from(keys)[0]));
    };

    const loadGroup = useCallback(()=>{
        API.groupAPI.getGroupsGroupsGet().then(
            ({data}) => {
                selectGroup(courseId === 0 ? data : data.filter(itemMap => itemMap.courseNumber === courseId));
            }
        )
    },[courseId])

    const loadData = useCallback(()=> {
        API.studentAPI.getStudentsStudentsFilterPost({
                take: limit,
                skip: (page - 1) * limit,
                name: searchQuery === '' ? undefined : searchQuery,
                groupId: groupId === 0 ? undefined : groupId,
                status: status,
                courseNumber: courseId === 0? undefined: courseId,
                order: {
                    by: sortOrder.column === undefined ? 'id' : sortOrder.column,
                    direction: sortOrder.direction === 'ascending' ? 'asc' : 'desc'
                }
        }).then(({data}) => { setStudents(data.students); setPages(Math.ceil(data.count/ data.take)); setCountStudents(data.count);});
    }, [limit, page, searchQuery, groupId, status, sortOrder, courseId]);

    useEffect(() => {
        loadData();
        loadGroup();
    }, [loadData, loadGroup]);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSortChange = (columnKey: string | undefined | number) => {
        setSortOrder(prevState => ({
            column: columnKey,
            direction: prevState.column === columnKey && prevState.direction === "ascending" ? "descending" : "ascending"
        }));
    };

    const handleDeleteClick = (studentId: number) => {
        setSelectedStudentId(studentId);
        onOpen();
    };

    const handleEditClick = (student: StudentWithGroup) => {
        setSelectedStudentId(student.id);
        onEditOpen();
    };

    return (
        <>
            <ChangeStudent
                isOpen={isEditOpen}
                onClose={()=>{onEditClose(); loadData(); }}
                groupMap={groupMap}
                studentId={selectedStudentId}
            />
            <DeleteUser
                isOpen={isOpen}
                onClose={()=>{onClose(); loadData(); }}
                studentId={selectedStudentId}
                studentName={selectedStudentId === null || undefined ? "noname" : students.filter((value) => value.id==selectedStudentId).map((value) => value.name)[0]}
            />
            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap md:flex-nowrap justify-between items-start h-full gap-3 items-end ">
                    <Select
                        // items={courseId === 0 || courseId === undefined ? groupMap : groupMap.filter(itemMap => itemMap.courseNumber === courseId)}
                        items={groupMap}
                        label="Группы"
                        size={"sm"}
                        className="w-full md:max-w-md"
                        onChange={(e) => setGroupId(Number(e.target.value))}
                    >
                        {(item) => <SelectItem value={item.id} key={item.id}>{item.groupNumber}</SelectItem>}
                    </Select>
                    <Select
                        label="Курс"
                        size={"sm"}
                        className="w-full md:max-w-md"
                        onSelectionChange={handleSelectChange}
                    >
                        {Object.keys(courseMap).map(section => (
                            <SelectSection key={section} title={section} showDivider>
                                {courseMap[section].map(course => (
                                    <SelectItem key={course.id} value={course.id}>
                                        {course.course}
                                    </SelectItem>
                                ))}
                            </SelectSection>
                        ))}
                    </Select>
                    <Select
                        label="Статус"
                        size={"sm"}
                        className="w-full md:max-w-md"
                        onChange={(e) => setStatus(e.target.value === "" ? undefined :  Boolean(Number(e.target.value)))}
                    >
                        <SelectItem value={1} key={1}>Сдана</SelectItem>
                        <SelectItem value={0} key={0}>Не сдана</SelectItem>
                    </Select>
                </div>
                <div className="flex flex-wrap md:flex-nowrap justify-between items-start h-full gap-3 items-end mb-5">
                    <Input
                        isClearable
                        className="w-full h-full"
                        placeholder="Поиск по ФИО..."
                        startContent={<SearchIcon />}
                        onChange={handleSearchInputChange}
                    />
                    <AddStudentButton onCloseModal={loadData} onCloseModalGroup={loadGroup} groupId={groupId} />
                </div>
            </div>
            <div className="flex justify-between items-center mb-4">
                <span className="text-default-400 text-small">Total {countStudents} users</span>
                <label className="flex items-center text-default-400 text-small">
                    Rows per page:
                    <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        onChange={(e) => setLimit(Number(e.target.value))}
                    >
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="60">60</option>
                        <option value="100">100</option>
                    </select>
                </label>
            </div>
            <div className="flex flex-col gap-3">
                <Table
                    sortDescriptor={sortOrder}
                    onSortChange={(e) => handleSortChange(e.column)}
                    isStriped
                    aria-label="Rows actions table example with dynamic content"
                    bottomContent={
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="primary"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    }
                    classNames={{
                        wrapper: "min-h-[222px]"
                    }}
                >
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn allowsSorting={column.key == 'updatedAt' || column.key == 'courseNumber' || column.key == 'groupNumber' ||  column.key == 'actions'? false :true} key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={students}>
                        {(item: StudentWithGroup) => (
                            <TableRow key={item.id}>
                                {columns.map((column) => (
                                    <TableCell key={column.key}>
                                        {column.key === 'status' ? (
                                                <MySwitch item={item}/>
                                        ) : (
                                            <span>
                                                {column.key === 'groupNumber' || column.key === 'courseNumber' ?  (
                                                    <span>
                                                        {getKeyValue(item.group, column.key)}
                                                        {/*{groupMap.filter(itemMap => itemMap.id === item.groupId).map(itemMap => itemMap.groupNumber)[0]}*/}
                                                    </span>
                                            ):(
                                                <span>
                                                    {column.key == 'updatedAt' ?(
                                                        <span>
                                                            {new Date (item.updatedAt).toLocaleDateString()}
                                                        </span>
                                                    ):( <span>
                                                            {column.key === "actions" ? (
                                                                <span className={"relative flex items-center gap-2"}>
                                                                    <Tooltip content="Edit user">
                                                                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={()=>handleEditClick(item)}>
                                                                        <EditIcon />
                                                                      </span>
                                                                    </Tooltip>
                                                                    <Tooltip color="danger" content="Delete user">
                                                                      <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleDeleteClick(item.id)}>
                                                                        <DeleteIcon />
                                                                      </span>
                                                                    </Tooltip>
                                                                </span>
                                                            ):(
                                                                <span>
                                                                    {getKeyValue(item, column.key)}
                                                                </span>
                                                            )}
                                                        </span>
                                                    )}
                                                </span>
                                                    )}
                                                </span>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};
