    
Item = Backbone.Model.extend({_parse_class_name: "Item"});

ItemCollection = Backbone.Collection.extend({
    model: Item,
    _parse_class_name: "Item"
});

ItemListView = Backbone.View.extend({
    tagName: "ul",
    events: {
        "click a": "clicked"
    },
    
    clicked: function(e){
        e.preventDefault();
        var id = $(e.currentTarget).data("id");
        var item = this.collection.get(id);
        var name = item.get("name");
        alert(name);
    },
    
    render: function(){
        var template = $("#item-template");
        var el = $(this.el);
        this.collection.each(function(model){
            var html = template.tmpl(model.toJSON());
            el.append(html);
        });
    }
});




$(function() {
    var items = new ItemCollection();
    items.fetch({
        success: function() {
            var view = new ItemListView({collection: items});
            view.render();
            $("#showIt").html(view.el);
        },
        query: {"in_stock":true}
    });
    
    // var item = new Item({id: "86YC9d8K9v", name:"sayonee"});
    // item.fetch({
    //     success: function() {
    //         console.log(item.toJSON());
    //     }
    // });
    
});