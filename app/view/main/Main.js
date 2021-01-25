Ext.define('App.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',
    requires: [
        'Ext.dd.DropTarget'
    ],
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    layout: 'vbox',
    height: '100%',
    width: '100%',
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'vbox'
            },
            height: '100%',
            width: '100%',
            items: [
                {
                    xtype: 'container',
                    reference: 'dashboard',
                    layout: {
                        type: 'hbox'
                    },
                    width: '100%',
                    flex: 1,
                    defaults: {
                        xtype: 'panel',
                        flex: 1,
                        height: '100%',
                        padding: '0 5 0 5',
                        items: [],
                        scrollable: 'y'
                    },
                    items: [
                        {
                            title: 'PLAN'
                        },
                        {
                            title: 'IN PROGRESS'
                        },
                        {
                            title: 'TESTING'
                        },
                        {
                            title: 'DONE'
                        }
                    ],
                    listeners: {
                        afterrender: 'onDashboardRender'
                    }
                },
                {
                    xtype: 'panel',
                    height: 60,
                    width: '100%',
                    layout: 'hbox',
                    padding: 20,
                    cls: 'info-panel',
                    bodyStyle: {
                        background: 'gray',
                    },
                    defaults: {
                        xtype: 'label',
                        cls: 'info-panel-item'
                    },
                    items: [
                        {
                            bind: {
                                text: 'Номер задачи: {selectedTask.taskNumber}',
                                hidden: '{!selectedTask}'
                            }
                        },
                        {
                            bind: {
                                text: 'Название задачи: {selectedTask.taskName}',
                                hidden: '{!selectedTask}'
                            }
                        },
                        {
                            bind: {
                                text: 'Имя, фамилия: {selectedTask.name}, {selectedTask.surname}',
                                hidden: '{!selectedTask}'
                            }
                        },
                        {
                            bind: {
                                text: 'Статус: {selectedTask.status}',
                                hidden: '{!selectedTask}'
                            }
                        },
                        {
                            bind: {
                                text: 'Важность: {selectedTask.importance}',
                                hidden: '{!selectedTask}'
                            }
                        },
                        {
                            bind: {
                                text: 'Дата: {selectedTask.date}',
                                hidden: '{!selectedTask}'
                            }
                        }
                    ]
                }
            ]
        }],
    listeners: {
        selectTaskPanel: 'onSelectTask'
    }
});
