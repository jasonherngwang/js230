(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['photo'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<li>\n  <figure class='relative group block w-full aspect-w-10 aspect-h-7'>\n    <img\n      src='"
    + alias4(((helper = (helper = lookupProperty(helpers,"src") || (depth0 != null ? lookupProperty(depth0,"src") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src","hash":{},"data":data,"loc":{"start":{"line":4,"column":11},"end":{"line":4,"column":18}}}) : helper)))
    + "'\n      alt=''\n      class='object-cover group-hover:opacity-90 border-solid border-2 border-white rounded-lg'\n    />\n    <figcaption\n      class='h-fit absolute top-[105%] p-2 rounded-lg text-white bg-slate-900/70 opacity-0 group-hover:opacity-100 z-10 transition opacity delay-1000'\n    >"
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":10,"column":5},"end":{"line":10,"column":20}}}) : helper)))
    + "</figcaption>\n  </figure>\n</li>";
},"useData":true});
})();