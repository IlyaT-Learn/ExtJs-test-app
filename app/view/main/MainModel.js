Ext.define('App.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',
    data: {
        selectedTask: null
    },
    stores: {
        tasks: {
            fields: [],
            data: [
                {
                    taskNumber: 1,
                    taskName: 'Task_1',
                    name: 'Иван',
                    surname: 'Иванов',
                    status: 'PLAN',
                    importance: 'COULD',
                    date: '01.01.2021'
                },
                {
                    taskNumber: 2,
                    taskName: 'Task_2',
                    name: 'Петр',
                    surname: 'Петров',
                    status: 'PLAN',
                    importance: 'COULD',
                    date: '01.01.2021'
                },
                {
                    taskNumber: 3,
                    taskName: 'Task_3',
                    name: 'Иван',
                    surname: 'Иванов',
                    status: 'PLAN',
                    importance: 'MUST',
                    date: '01.01.2021'
                },
                {
                    taskNumber: 4,
                    taskName: 'Task_4',
                    name: 'Петр',
                    surname: 'Петров',
                    status: 'PLAN',
                    importance: 'SHOULD',
                    date: '01.01.2021'
                },
                {
                    taskNumber: 5,
                    taskName: 'Task_5',
                    name: 'Петр',
                    surname: 'Петров',
                    status: 'PLAN',
                    importance: 'COULD',
                    date: '01.01.2021'
                },
                {
                    taskNumber: 6,
                    taskName: 'Task_6',
                    name: 'Иван',
                    surname: 'Иванов',
                    status: 'PLAN',
                    importance: 'COULD',
                    date: '01.01.2021'
                },
                {
                    taskNumber: 7,
                    taskName: 'Task_7',
                    name: 'Петр',
                    surname: 'Петров',
                    status: 'PLAN',
                    importance: 'SHOULD',
                    date: '01.01.2021'
                },
                {
                    taskNumber: 8,
                    taskName: 'Task_8',
                    name: 'Иван',
                    surname: 'Иванов',
                    status: 'PLAN',
                    importance: 'MUST',
                    date: '01.01.2021'
                },
                {
                    taskNumber: 9,
                    taskName: 'Task_9',
                    name: 'Петр',
                    surname: 'Петров',
                    status: 'PLAN',
                    importance: 'SHOULD',
                    date: '01.01.2021'
                },
                {
                    taskNumber: 10,
                    taskName: 'Task_10',
                    name: 'Петр',
                    surname: 'Петров',
                    status: 'PLAN',
                    importance: 'MUST',
                    date: '01.01.2021'
                }
            ]
        }
    }
});
