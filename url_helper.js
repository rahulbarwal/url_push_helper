function get_previously_set_args() {
    /*
    *Returns the arguments in following format:
    * --> [ { arg_name: name, arg_value: value } ]
    * --> undefined (if there is no option present)
    */
    var value_pairs = [];
    if (this.index_arg_separator > -1) {
        var url_args = this.url_tuple[1];
        url_args = url_args.split("&");
        for (var i = 0; i < url_args.length; i++) {
            values = url_args[i].split("=");
            value_pairs.push({ arg_name: values[0], arg_value: values[1] });
        }
        return value_pairs;
    }
}

function add_parameters_to_url(url_parameters) {
    /*
     * Takes input an object of parameters that you want to set in url and sets it to url. Input is to be in following format:
     * [ { arg_name: name, arg_value: value } ]
     * returns the modified url back
     * Previous args are handled within.
     */
    var value_pairs = get_previously_set_args();

    for (var i = 0; i < url_parameters.length; i++) {
        var j;
        for (j = 0; j < value_pairs.length; j++) {
            if (url_parameters[i].arg_name == value_pairs[j].arg_name) {
                value_pairs[j].arg_value = url_parameters[i].arg_value;
                break;
            }
        }
        if( j == value_pairs.length){
            value_pairs.push(url_parameters[i]);
        }
    }
    var modified_url = this.base_url.concat("?")
    for (var i = 0; i < value_pairs.length; i++) {
        modified_url = modified_url.concat(value_pairs[i].arg_name + "=" + value_pairs[i].arg_value + "&");
    }
    //remove the '&' concatenated at the end
    modified_url = modified_url.substring(0, modified_url.length - 1);
    return modified_url;
}

function set_url(title, url){
    if (typeof (history.pushState) != "undefined") {
        var state = { Title: title, Url: url };
        history.pushState(state, state.Title, state.Url);
    }
}

function initialize_url_modifier(){
    cur_url : String(window.location);
    var index = cur_url.indexOf("?");
    var url = cur_url.split("?");
    url_modifier = {
        current_url : cur_url
        , index_arg_separator :  index
        , url_tuple : url
        , base_url : url[0]
        , get_args : get_previously_set_args
        , add_parameters : add_parameters_to_url
        , push_url : set_url
    }
    return url_modifier;
}