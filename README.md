# backbone-parse

backbone-parse overrides the Backbone.Sync method to automatically persist your backbone models on Parse using their REST API. Saving you from all the manual plumbing.

## Installation

### Step 1:

Download backbone-parse.js and include it in your application after backbone.js e.g.

```<script src="backbone.js"></script>
<script src="backbone-parse.js"></script>```


### Step 2:
Open backbone-parse.js and set your credentials at the top:

```/********** PARSE API ACCESS CREDENTIALS **********/

var application_id = "CkWCHMSOgyqoNKoIc5hu09uvdZcJ9rpHJD4iwhxI";
var rest_api_key = "H5SIwarTRXqd07C0OIZPbcRTYTNLKsjFAJt5PrFY";
var api_version = "1";

/******************* END *************************/```


## How to use it:

Create a Backbone model and set the parse class name:

```var Item = new Backbone.Model({
	_parse_class_name: "Item";
});```

Similarly for Collections:

```var ItemsCollection = new Backbone.Collection({
	_parse_class_name: "Item";
});```

This class name will specify backbone-parse which class persists this model on the Parse server. It is case sensitive. Also if the class doesn't already exists on Parse, it'll automatically create one. 

If the class name is not specified, then the model will be persisted using the default Backbone Sync (i.e. you'll need to specify a url)

Feedback welcome.

## TODO:

- tests(!)
- extend Backbone.Model to tackle User objects on Parse