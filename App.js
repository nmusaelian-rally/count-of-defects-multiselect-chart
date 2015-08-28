Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    stateful: true,
    selectedTagsRefs:[],
    selectedTags:[],
    getState: function() {
        return {
            //tags: Ext.ComponentQuery.query('rallytagpicker[itemId=tagPicker]')[0]._getRecordValue();
            filterByPriority: this.down('#priorityCheckbox').getValue()
        };
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
                    select: this.onTagsSelected,
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
            xtype: 'rallycheckboxfield',
            boxLabel: 'Filter grid by Priority',
            itemId: 'priorityCheckbox',
            checked: this.filterByPriority,
            listeners: {
                change: this.onPrioirtyCheckboxChanged,
                scope: this
            }
        });
        this.down('#propertyPickerPanel').add({
            xtype: 'rallyfieldvaluecombobox',
            itemId: 'priorityCombobox',
            model: 'Defect',
            multiSelect: true,
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
    onTagsSelected:function(){
    },
    filterByTags:function(){
        console.log('_getRecordValue()...',Ext.ComponentQuery.query('rallytagpicker[itemId=tagPicker]')[0]._getRecordValue());
    },
    onPrioirtyCheckboxChanged:function(){
        this.filterByPriority = this.down('#priorityCheckbox').getValue();
        this.saveState();
    }
});
