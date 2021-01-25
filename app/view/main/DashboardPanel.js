Ext.define('PpMain.view.main.DashboardPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'main-dashboard-panel',
    frame: true,
    margin: '5 0',
    layout: 'fit',
    height: 80,
    width: '100%',
    draggable: {
        moveOnDrag: false,
        ddGroup: 'dashboard'
    },
    items: [
        {
            xtype: 'component',
            bind: {
                html: '<div class="item-panel-num">TASK-{taskNumber}</div>' +
                    '<div  class="item-panel-name">{taskName}</div>'
            }
        }
    ],
    listeners: {
        render: 'onDashboardPanelRender'
    },
    initComponent() {
        const self = this;
        const vm = self.getViewModel();

        self.addBodyCls('dashboard-panel-' + vm.get('importance'));
        self.callParent(arguments);
    }
});
