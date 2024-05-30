import {Configuration, GroupsApi, StudentsApi} from "../generated";

const ApiConfig = new Configuration( {basePath: "https://fktpm.k-lab.su"})

export const API = {
    studentAPI: new StudentsApi(ApiConfig),
    groupAPI: new GroupsApi(ApiConfig),
}

export const columns = [
    { key: "id", label: "ID", sort: 'asc' },
    { key: "name", label: "ФИО", sort: 'asc' },
    { key: "groupNumber", label: "ГРУППА", sort: 'asc' },
    { key: "courseNumber", label: "КУРС", sort: 'asc' },
    { key: "updatedAt", label: "ОБНОВЛЕН", sort: 'asc' },
    { key: "status", label: "СТАТУС", sort: 'asc' },
    { key: "actions", label: "ACTIONS", sort: 'asc' },
];

export const courseMap = [
    {
        id: 1,
        course: "1"
    },
    {
        id: 2,
        course: "2"
    },
    {
        id: 3,
        course: "3"
    },
    {
        id: 4,
        course: "4"
    },
]

export const groupMap = [
    {
        groupNumber:'11',
        id:1,
        courseNumber: 1
    },
    {
        groupNumber: '12',
        id:2,
        courseNumber: 1
    },
    {
        groupNumber: '13',
        id:3,
        courseNumber: 1
    },
    {
        groupNumber: '14',
        id:4,
        courseNumber: 1
    },
    {
        groupNumber: '15',
        id: 5,
        courseNumber: 1
    },
    {
        groupNumber: '16',
        id:6,
        courseNumber: 1
    },
    {
        groupNumber: '17',
        id:7,
        courseNumber: 1
    },
    {
        groupNumber: '18',
        id:8,
        courseNumber: 1
    },
    {
        groupNumber: '21',
        id:9,
        courseNumber: 2
    },
    {
        groupNumber: '22',
        id:10,
        courseNumber: 2
    },
    {
        groupNumber: '23',
        id:11,
        courseNumber: 2
    },
    {
        groupNumber: '24',
        id:12,
        courseNumber: 2
    },
    {
        groupNumber: '25',
        id:13,
        courseNumber: 2
    },
]