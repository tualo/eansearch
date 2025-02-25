Ext.define('Tualo.routes.EANSearch', {
    statics: {
        load: async function() {
            return [
                {
                    name: 'eansearch',
                    path: '#eansearch'
                }
            ]
        }
    },
    requires: [
        'Tualo.eansearch.data.field.GruppeEANSearch',
    ],
    url: 'eansearch',
    handler: {
        action: function (type, id) {
            /*
            type = 'views';
            let tablenamecase = tablename.toLocaleUpperCase().substring(0, 1) + tablename.toLowerCase().slice(1);
            console.log('Tualo.DataSets.' + type + '.' + tablenamecase, arguments);
            let opt = {};
            if (typeof id != 'undefined') {
                opt.loadId = id;
            }
            Ext.getApplication().addView('Tualo.report.lazy.ReportPanel', {
                type: type,
                reportnumber: id
            });
            */

        },
        before: function (type, id, action) {

            /*
            console.log('Tualo.routes.Cmp_ds', arguments, 'reject');
            action.stop();
            let tablenamecase = tablename.toLocaleUpperCase().substring(0,1) + tablename.toLowerCase().slice(1);
            let id = null;
            if (typeof xid.resume=='function'){ action=xid; }else{ id = xid;}
            action.resume();
            */
        }
    }
});