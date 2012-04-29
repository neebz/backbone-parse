(function() {

	var original_toJSON =Backbone.Model.prototype.toJSON; 
    var ParseModel = {
        toJSON : function(options) {
            _parse_class_name = this.__proto__._parse_class_name;
            data = original_toJSON.call(this,options);
            delete data.createdAt
            delete data.updatedAt
            return data
        },

        idAttribute: "objectId"
    };
    _.extend(Backbone.Model.prototype, ParseModel);

    original_parse =Backbone.Collection.prototype.parse; 
    var ParseCollection = {
        parse : function(options) {
            _parse_class_name = this.__proto__._parse_class_name;
            data = original_parse.call(this,options);
            if (_parse_class_name && data.results) {
                //do your thing
                return data.results;
            }
            else {
            	//return original
                return data;
            }
        }
    };
    _.extend(Backbone.Collection.prototype, ParseCollection);


	var methodMap = {
        'create': 'POST',
        'update': 'PUT',
        'delete': 'DELETE',
        'read':   'GET'
    };

	Backbone.sync = function(method, model, options) {
		var object_id;
		var class_name;
		if (model.models) { //is a collection

			object_id = ""
			class_name = model.__proto__._parse_class_name;
		}
		else { //is a single model
			object_id = model.id
			class_name = model.__proto__._parse_class_name;
		}

		var type = methodMap[method];
	    options || (options = {});

		var api_version = "1";
		var base_url = "https://api.parse.com/" + api_version + "/classes";

		var application_id = "CkWCHMSOgyqoNKoIc5hu09uvdZcJ9rpHJD4iwhxI";
		var api_key = "H5SIwarTRXqd07C0OIZPbcRTYTNLKsjFAJt5PrFY";


		var url = ""

		switch(method) {
			case "create": 
				url = base_url + "/" + class_name + "/";
				break;
			default:
				url = base_url + "/" + class_name + "/" + object_id;
				break;

		}

		var data ;
		// Ensure that we have the appropriate request data.
	    if (!options.data && model && (method == 'create' || method == 'update')) {
	      data = JSON.stringify(model.toJSON());
	    }
        else if (options.query && method == "read") {
            data = encodeURI("where=" + JSON.stringify(options.query));
        }   

		var request = {
            //data
            contentType: "application/json",
            processData: false,
            dataType: 'json',
            data: data,

            //action
            url: url,
            type: type,

            headers: {
                "X-Parse-Application-Id": application_id,
                "X-Parse-REST-API-Key": api_key
            }
        };

        return $.ajax(_.extend(options, request));
	};

})();