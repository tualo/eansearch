Ext.define('Tualo.eansearch.data.field.GruppeEANSearch', {
    extend: 'Ext.data.field.String',
    alias: [
        'data.field.tualo_eansearch_artikelnummer_gruppe'
    ],
    convert: function (v,rec) {

        let doQuery = false,
            map = rec.getFieldsMap();

        if (!Ext.isEmpty(rec.get('artikelnummer'))){
            if ((typeof rec.get('gruppe')=='undefined') || ( Ext.isEmpty(rec.get('gruppe')) )){ 
                if(rec.get('artikelnummer')!=rec.get('_ean_search')){
                        if (rec.get('artikelnummer').length==13){
                            doQuery=true;
                        }
                }
            }
        }
        if (doQuery) {
            this.guery(v,rec);
        }
        return v;
    },

    guery: async function(v,rec){

        let resData = await fetch('./eansearch/'+rec.get('artikelnummer'),{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(params)
        });
        let data = await resData.json();
        if (data.success && data.data && data.data.length>0){
            rec.set('gruppe',data.data[0].name);
            rec.set('_ean_search',rec.get('artikelnummer'));
            
        }
    },

    depends: [
        'artikelnummer'
    ]
    
});