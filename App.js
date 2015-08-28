Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    stateful: true,
    getState: function() {
        return {
            tags: this.getTagRefsFromTagObjects(),
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
                value: this.tags,
                listeners: {
                    select: this.onTagsSelected,
                    deselect: this.onTagsSelected,
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
                border: 1,
                flex: 1
            },
            {
                //replace with: https://help.rallydev.com/apps/2.0/doc/#!/api/Ext.form.field.Number
                //xtype: 'textfield',
                //itemId: 'numberOfWeeks',
                //fieldLabel: 'Number of weeks to look back',
                //allowBlank: false  // requires a non-empty value
                xtype: 'numberfield',
                itemId: 'numberOfWeeks',
                value: 16,
                maxValue: 56,
                minValue: 0,
                listeners: {
                    change: this.getNumberOfWeeks,
                    scope: this
                }
            },
            {
                xtype: 'panel',
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
            boxLabel: 'Filter defects by Priority',
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
        this.tags = this.getTagRefsFromTagObjects();
        this.saveState();
    },
    getTagRefsFromTagObjects:function(){
        var tagsRefs = [];
        var tags = Ext.ComponentQuery.query('rallytagpicker[itemId=tagPicker]')[0]._getRecordValue();
        console.log('_getRecordValue()...',tags);
        _.each(tags, function(tag){
            console.log(tag.data._ref);
            tagsRefs.push(tag.data._ref);
        });
        console.log(tagsRefs);
        return tagsRefs;
    },
    filterByTags:function(){
        var selectedTagsList = 'Selected tags';
        var tags = Ext.ComponentQuery.query('rallytagpicker[itemId=tagPicker]')[0]._getRecordValue();
        var container = (Ext.ComponentQuery.query('container[itemId=myTags]')[0]);
        _.each(tags, function(tag){
          selectedTagsList = selectedTagsList + '<br />' + tag.data._refObjectName;
           container.update(selectedTagsList);
        });
        //var tagsRefs = [];
        //var tags = Ext.ComponentQuery.query('rallytagpicker[itemId=tagPicker]')[0]._getRecordValue();
        //console.log('_getRecordValue()...',tags);
        //_.each(tags, function(tag){
        //    console.log(tag.data._ref);
        //    tagsRefs.push(tag.data._ref);
        //});
        //console.log(tagsRefs);
    },
    onPrioirtyCheckboxChanged:function(){
        this.filterByPriority = this.down('#priorityCheckbox').getValue();
        this.saveState();
    },
    getNumberOfWeeks:function(){
        console.log(this.down('#numberOfWeeks').getValue())
    }
});