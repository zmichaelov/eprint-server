//We've added a third and final item to our tab panel - scroll down to see it
Ext.application({
    name: 'Sencha',

    launch: function() {
        Ext.create("Ext.tab.Panel", {
            fullscreen: true,
            tabBarPosition: 'bottom',

            items: [
                // Left tab (Home tab)
                {
                    title: 'Home',
                    iconCls: 'home',
                    cls: 'home',
                    xtype: 'formpanel',
                    url: 'upload',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'ePrint Mobile',
                            instructions: 'Set your printer job configuration options',
                            items: [
                                {
                                    xtype: 'urlfield',
                                    label: 'File',
                                    name: 'print-upload',
                                    placeHolder: 'File to print',
                                    value : 'file:///Users/zmichaelov/udacity/forms.html'
                                },
                                {
                                    xtype: 'textfield',
                                    label: 'NetID',
                                    name: 'net-id'
                                },
                                {
                                    xtype: 'togglefield',
                                    label: 'Double-Sided',
                                    name: 'double-sided'
                                },
                                {
                                    xtype: 'textfield',
                                    label: 'Copies',
                                    name: 'copies'
                                },
                                {
                                    xtype: 'textfield',
                                    label: 'Pages',
                                    name: 'pages'
                                }                                
                            ]
                        },
                        // form submission logic
                        {
                            xtype: 'button',
                            text: 'Send',
                            ui: 'confirm',
                            handler: function() {
                                this.up('formpanel').submit();
                            }
                        }
                    ]
                },
                // Center Tab ()
                {
                    xtype: 'nestedlist',
                    title: 'Documents',
                    iconCls: 'star',
                    displayField: 'path',

                    store: {
                        type: 'tree',

                        fields: [
                            'size', 'rev', 'thumb_exists', 'bytes', 'modified',
                            'mime_type', 'path', 'is_dir', "icon", "root", "client_mtime", "revision",
                            {name: 'leaf', defaultValue: true}
                        ],

                        root: {
                            leaf: false
                        },

                        proxy: {
                            type: 'ajax',
                            url: '/meta',
                            reader: {
                                type: 'json',
                                rootProperty: 'contents'
                            }
                        }
                    },

                    detailCard: {
                        xtype: 'panel',
                        scrollable: true,
                        styleHtmlContent: true
                    },

                    listeners: {
                        itemtap: function(nestedList, list, index, element, post) {
                            if(post.get('is_dir')){
                                
                                post.set({leaf : false});
                                
                            }
                            else { // show the file size for now
                                this.getDetailCard().setHtml(post.get('size'));                            
                            }
                        }
                        
                    }
                },
                //this is where the Settings will go
                {
                    title: 'Dropbox',
                    iconCls: 'user',
                    xtype: 'formpanel',
                    url: '/dropbox',
                    layout: 'vbox',

                    items: [
                        {
                            xtype: 'button',
                            text: 'Link',
//                             ui: 'confirm',
                            handler: function() {
                                this.up('formpanel').submit();
                            }
                        }
                    ]
                }
            ]
        });
    }
});
