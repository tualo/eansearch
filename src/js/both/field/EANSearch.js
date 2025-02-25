Ext.define('Tualo.eansearch.data.field.GruppeEANSearch', {
    extend: 'Ext.data.field.String',
    alias: [
        'data.field.tualo_eansearch_artikelnummer_gruppe'
    ],
    convert: function (v,rec) {
        console.log('tualo_eansearch_gruppe',rec.get('gruppe'),this._queriedArticles);
        let doQuery = false,
            map = rec.getFieldsMap();
        if (!Ext.isEmpty(rec.get('artikelnummer'))){
            if (rec.get('gruppe')!=rec.get('_ean_queried_gruppe')) doQuery=true;
        }
        if (doQuery) {
            this.guery(v,rec);
        }
        return v;
    },

    guery: async function(v,rec){
        let resData = await fetch('./eansearch/'+v,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        let data = await resData.json();
        if (data.success && data.data && data.data.length>0){
            rec.set('gruppe',data.data[0].name);
        }
    },

    depends: [
        'artikelnummer'
    ]
    
});