Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    selectedTags:[],
    launch: function() {
        var widgetPanel = Ext.create('Ext.Panel', {
            itemId: 'widget',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'panel',
                //title: 'tagPickerPanel',
                itemId:'tagPickerPanel',
                flex: 1
            },{
                xtype: 'panel',
                title: 'propertyPickerPanel',
                itemId:'propertyPickerPanel',
                flex: 1
            },{
                xtype: 'container',
                title: 'myTags',
                itemId:'myTags',
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
        
        this.down('#tagPickerPanel').add({
            xtype: 'rallytagpicker',
            itemId: 'tagPicker',
            listeners: {
                select: this.getSelectedTags,
                scope: this
            }
        });
        
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
             defaultSelectionPosition: null,
            field: 'Priority',
            listeners: {
                select: this.getFilter,
                ready: this.getFilter,
                scope: this
            }
        });
    },
    getFilter:function(){
        
    },
    getSelectedTags:function(){
        var selectedTagsList = '';
        var container = (Ext.ComponentQuery.query('container[itemId=myTags]')[0]);
        selectedTags = (Ext.ComponentQuery.query('rallytagpicker[itemId=tagPicker]')[0])._getRecordValue();
        _.each(selectedTags, function(tag){
            selectedTagsList = selectedTagsList + '<br />' + tag.get('Name');
            container.update(selectedTagsList);
        });
       
    }
});
