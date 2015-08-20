Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    stateful: true,
    selectedTags:[],
    getState: function() {
        return {
            priorities: Ext.ComponentQuery.query('rallyfieldvaluecombobox[itemId=priorityCombobox]')[0].getValue()
        };
    },
    applyState: function(state) {
        this.priorities = state.priorities;
    },
    launch: function() {
        var widgetPanel = Ext.create('Ext.Panel', {
            itemId: 'widget',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [{
                xtype: 'rallytagpicker',
                itemId: 'tagPicker',
                stateful: true,
                stateId: this.getContext().getScopedStateId('n-tags'),
                listeners: {
                    select: this.getSelectedTags,
                    scope: this
                }
            },
            {
                xtype: 'rallybutton',
                itemId: 'applyTagFilter',
                text: 'Apply Tag Filter',
                maxHeight: 20,
                cls:'',
                margin: 10,
                listeners: {
                    click: this.filterByTags,
                    scope: this
                }
            },
            {
                xtype: 'container',
                title: 'myTags',
                itemId:'myTags',
                html: 'Currently selected tags:',
                border: 1,
                flex: 1
            },
            {
                xtype: 'panel',
                title: 'propertyPickerPanel',
                itemId:'propertyPickerPanel',
                flex: 1
            }]
        });
        var gridPanel = Ext.create('Ext.Panel', {
            itemId:'gridPanel',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'panel',
                title: 'Grid Panel 1',
                itemId:'gridPanel1',
                flex: 1
            },{
                xtype: 'panel',
                 title: 'Grid Panel 2',
                itemId:'gridPanel2',
                flex: 1
            }]
        });
        var chartPanel = Ext.create('Ext.Panel', {
            title: 'Chart Panel',
            itemId: 'chartPanel'
        });
        this.add(widgetPanel);
        this.add(gridPanel);
        this.add(chartPanel);
        
        this.down('#propertyPickerPanel').add({
            xtype: 'checkbox',
            boxLabel: 'Filter grid by Priority',
            itemId: 'priorityCheckbox',
            handler: this.getFilter,
            scope: this
        });
        this.down('#propertyPickerPanel').add({
            xtype: 'rallyfieldvaluecombobox',
            itemId: 'priorityCombobox',
            model: 'Defect',
            multiSelect: true,
            value: this.priorities,
            defaultSelectionPosition: null,
            field: 'Priority',
            stateful: true,
            stateId: this.getContext().getScopedStateId('n-priority'),
            listeners: {
                select: this.getFilter,
                ready: this.getFilter,
                scope: this
            }
        });
    },
    getFilter:function(){
        var priorityBox = (Ext.ComponentQuery.query('rallyfieldvaluecombobox[itemId=priorityCombobox]')[0]);
        console.log('selected priorities:', priorityBox.getValue());
    },
    getSelectedTags:function(){
        var selectedTagsList = 'Currently selected tags:<br />';
        var container = (Ext.ComponentQuery.query('container[itemId=myTags]')[0]);
        selectedTags = (Ext.ComponentQuery.query('rallytagpicker[itemId=tagPicker]')[0])._getRecordValue();
        _.each(selectedTags, function(tag){
            selectedTagsList = selectedTagsList + ',' + tag.get('Name');
            container.update(selectedTagsList);
        });
        
    },
    filterByTags:function(){
        console.log((Ext.ComponentQuery.query('rallytagpicker[itemId=tagPicker]')[0])._getRecordValue());
    }
});
