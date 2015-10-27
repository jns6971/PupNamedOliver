//
(function ( _ ) {
    _.templateSettings = {
        'evaluate'    : /\{\{([\s\S]+?)\}\}/g,
        'interpolate' : /\{\{=([\s\S]+?)\}\}/g,
        'escape'      : /\{\{-([\s\S]+?)\}\}/g,
        'variable': 'data'
    };
    //return _;
})( _ );