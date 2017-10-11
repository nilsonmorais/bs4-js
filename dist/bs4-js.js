'use strict';

/* 

bs4-js: Bootstrap 4 elements created in js.
Dependencies: lodash, fontawesome, jquery-ui and jquery.

Create new objects:
var b = new Button();
var d = new Dropdown();

Call object methods:
b.setIcon("fa-window");

Access object DOM with:
$('body').append(b.html);

*/

/**
 * @class widgetBase
 */
function widgetBase() {
    this.addClass = function(className) {
        $(this.html).addClass(className);
    };
    return this;
}
/**
 * @class Dropdown
 */
function Dropdown() {
    widgetBase.call(this);
    var id = _.uniqueId('dropdown_');
    this.html = $("<div>").addClass("dropdown")
        .append(
            $("<button>").addClass("btn btn-secondary btn-sm dropdown-toggle")
            .attr({
                "data-toggle": "dropdown",
                "type": "button",
                "aria-haspopup": "true",
                "aria-expanded": "false",
                "id": id
            })
        )
        .append(
            $("<div>").addClass("dropdown-menu dropdown-menu-right").attr("aria-labelledby", id)
        );
    this.reset = function() {
        $(this.html).find(".dropdown-menu").children().remove();
    };
    this.setIcon = function(icon) {
        $(this.html).find('button').addClass("fa " + icon);
    };
    this.addItem = function(item) {
        var itemDefaults = {
            href: "#",
            title: "Item",
            header: false
        };
        item = _.assign(itemDefaults, item);
        if (item.header) {
            var item = $("<h6>").addClass("dropdown-header").text(item.title);
        } else {
            var item = $("<a>").addClass("dropdown-item").attr("href", item.href).text(item.title);
        }
        $(this.html).find(".dropdown-menu").append(item);
        return item;
    };
    return this;
}
Dropdown.prototype = _.create(widgetBase.prototype, { 'constructor': Dropdown });

/**
 * @class Card
 */
function Card() {
    widgetBase.call(this);
    const _card = this;
    var defaults = {
        headerClass: "",
        bodyClass: "",
        footerClass: "",
        cardClass: "",
        cardSizes: {
            "xs": "200px",
            "sm": "300px",
            "md": "500px",
            "lg": "800px"
        },
        size: "sm"
    };
    var id = _.uniqueId('card_');
    this.options = _.assign(this.options, defaults);

    this.render = function() {
        this.html = $("<div>").addClass("card").css("max-width", "500px").attr("id", id);
    };
    this.addHeader = function() {
        var header = $("<div>").addClass("card-header");
        if (!_.isEmpty(this.options.headerClass)) { header.addClass(this.options.headerClass); }
        $(this.html).prepend(header);
        return header;
    };
    this.addFooter = function() {
        var footer = $("<div>").addClass("card-footer");
        if (!_.isEmpty(this.options.footerClass)) { footer.addClass(this.options.footerClass); }
        $(this.html).append(footer);
        return footer;
    };
    this.addBody = function() {
        var body = $("<div>").addClass("card-body");
        if (!_.isEmpty(this.options.bodyClass)) { body.addClass(this.options.bodyClass); }
        $(this.html).append(body);
        return body;
    };
    this.setHeader = function(content) {
        var header = $(this.html).find(".card-header");
        if (_.isEmpty(header)) {
            header = _card.addHeader();
        }
        $(header).html("").append(content);
    };
    this.setFooter = function(content) {
        var footer = $(this.html).find(".card-footer");
        if (_.isEmpty(footer)) {
            footer = _card.addFooter();
        }
        $(footer).html("").append(content);
    };
    this.setBody = function(content) {
        var body = $(this.html).find(".card-body");
        if (_.isEmpty(body)) {
            body = _card.addBody();
        }
        $(body).html("").append(content);
    };
    this.setHeaderClass = function(className) {
        $(this.html).find(".card-header").attr("class", "").addClass("card-header").addClass(className);
    };
    this.setFooterClass = function(className) {
        $(this.html).find(".card-footer").attr("class", "").addClass("card-footer").addClass(className);
    };
    this.setClass = function(className) {
        $(this.html).attr("class", "").addClass("card").addClass(className);
    };
    this.getSize = function() {
        var s = $(this.html).css("max-width");
        var r = _.findKey(this.options.cardSizes, function(o) { return o == s });
        return r;
    };
    this.setSize = function(size) {
        var size = this.options.cardSizes[size] || "300px";
        this.options.size = size;
        $(this.html).css({
            "max-width": size,
            "width": size
        });
    };
    this.render();
    this.addBody();
    this.setSize(this.options.size);

    return this;
}
Card.prototype = _.create(widgetBase.prototype, { 'constructor': Card });


/**
 * @class Button
 * 
 * @param {Object} options 
 * @param {String} options.href Button href property, default: "#".
 * @param {String} options.eleClass Button class property, default: "btn-primary".
 * @param {String} options.title Button title property, default: none.
 */
function Button(options) {
    widgetBase.call(this);
    var id = _.uniqueId('btn_');
    var defaults = {
        href: "#",
        eleClass: "btn-primary",
        title: undefined,
        label: ""
    };
    this.options = _.assign(this.options, defaults);
    this.options = _.assign(this.options, options);

    this.render = function() {
        this.html = $("<a>").addClass('btn').addClass(this.options.eleClass).attr({
            id: id,
            href: this.options.href,
        });
        if (!_.isEmpty(this.options.label)) {
            $(this.html).append(this.options.label);
        }
        if (!_.isEmpty(this.options.title)) {
            $(this.html).attr({
                "data-toggle": "tooltip",
                "data-placement": "top",
                "title": this.options.title
            }).tooltip();
        }
    };
    this.text = function(text) {
        $(this.html).text(text);
    };
    this.setIcon = function(icon) {
        $(this.html).prepend($("<i>").addClass("fa fa-fw " + icon));
    };
    this.render();
    return this;
}
Button.prototype = _.create(widgetBase.prototype, { 'constructor': Button });