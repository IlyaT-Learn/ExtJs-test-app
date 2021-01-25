Ext.define('App.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onDashboardRender: function () {
        const me = this;
        const dashboard = me.lookupReference('dashboard');
        const el = dashboard.getEl();
        const dashboardColumn = dashboard.items;
        const toDashboardRecords = me.getStore('tasks') || [];
        const sortPriority = {
            'MUST': 1,
            'SHOULD': 2,
            'COULD': 3
        };

        me.dd = Ext.create('Ext.dd.DropTarget', el, {
            dashboard: dashboard,
            ddGroup: 'dashboard',
            notifyOver: me.ddNotifyOver,
            notifyDrop: me.ddNotifyDrop,
            getOverEvent: me.ddGetOverEvent
        });

        toDashboardRecords.sort((a, b) => {
            if (a.get('surname').localeCompare(b.get('surname'))) {
                return a.get('surname').localeCompare(b.get('surname'));
            }
            if (sortPriority[a.get('importance')] < sortPriority[b.get('importance')]) {
                return -1;
            }
            if (sortPriority[a.get('importance')] > sortPriority[b.get('importance')]) {
                return 1;
            }

            return 0;
        });

        toDashboardRecords.each((item) => {
            dashboardColumn.getAt(0).add({
                xtype: 'main-dashboard-panel',
                viewModel: {
                    data: item.getData()
                }
            });
        });
    },

    ddNotifyOver: function (dd, e, data) {
        const dropTarget = this;
        const clsContBody = '.x-autocontainer-innerCt';
        const dashboard = dropTarget.dashboard;
        const over = dropTarget.getOverEvent(dd, e, data);
        const col = dashboard.items.get(over.columnIndex);

        if (data.panel.hasCls('scale-component')) {
            data.panel.removeCls('scale-component');
            dashboard.lookupViewModel().set('selectedTask', null);
        }

        data.lastOver = over;
        dd.panelProxy.moveProxy(col.getEl().down(clsContBody, true),
            over.aboveIndex >= 0 ? col.items.get(over.aboveIndex).getEl().dom : null);

        return dropTarget.dropAllowed;
    },

    ddNotifyDrop: function (dd, e, data) {
        const dropTarget = this;
        const dashboard = dropTarget.dashboard;
        const over = data.lastOver;
        const panel = data.panel;
        const fromCt = panel.ownerCt;
        const toCt = dashboard.items.get(over.columnIndex);
        const currentIndex = fromCt.items.indexOf(panel);
        let newIndex = over.aboveIndex >= 0 ? over.aboveIndex : toCt.items.getCount();

        if (this.overClass) {
            this.el.removeCls(this.overClass);
        }

        if (fromCt === toCt) {
            if (fromCt.items.getCount() === 1 || currentIndex === newIndex) {
                return false;
            }
            if (currentIndex < newIndex) {
                newIndex -= 1;
            }
        }

        Ext.suspendLayouts();

        panel.isMoving = true;
        panel.getEl().dom.style.display = '';
        panel.getViewModel().set('status', toCt.getTitle());
        toCt.insert(newIndex, panel);

        panel.isMoving = false;
        toCt.updateLayout();

        Ext.resumeLayouts(true);

        return true;
    },

    ddGetOverEvent: function (dd, e) {
        const dashboard = this.dashboard;
        const cols = dashboard.items;
        const bodyBox = dashboard.getEl().getBox();
        const eXY = e.getXY();
        const over = {
            columnIndex: Math.round((eXY[0] - bodyBox.x) / (bodyBox.width / 4)),
            aboveIndex: undefined
        };
        let i, k, col, childCount, colItems, childItemBox;

        for (i = 0; i < 4; i += 1) {
            col = cols.get(i);
            if (e.within(col.el)) {
                over.columnIndex = i;
                colItems = col.items;
                childCount = colItems.length;
                for (k = 0; k < childCount; k += 1) {
                    childItemBox = colItems.get(k).getEl().getBox();
                    if (eXY[1] < (childItemBox.top + childItemBox.height / 2)) {
                        over.aboveIndex = k;
                        break;
                    }
                }
            }
        }

        return over;
    },

    onDashboardPanelRender: function (panel) {
        const view = this.getView();

        panel.body.on('click', function () {
            view.fireEvent('selectTaskPanel', panel);
        });
    },

    onSelectTask: function (panel) {
        const vm = this.getViewModel();
        const view = this.getView();
        const selectTask = panel.getViewModel().getData();
        const allDashboard = view.query('main-dashboard-panel');
        const unselectedClick = panel.hasCls('scale-component');

        Ext.each(allDashboard, (item) => {
            item.removeCls('scale-component');
        });

        if (!unselectedClick) {
            panel.addCls('scale-component');
        }

        vm.set('selectedTask', unselectedClick ? null : selectTask);
    }
});
