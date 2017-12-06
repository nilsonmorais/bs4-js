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
 * @class Dropdown
 */

function Dropdown() {
    var id = _.uniqueId('dropdown_');
    this.html = $("<div>").addClass("dropdown").append($("<button>").addClass("btn btn-secondary btn-sm dropdown-toggle").attr({
        "data-toggle": "dropdown",
        "type": "button",
        "aria-haspopup": "true",
        "aria-expanded": "false",
        "id": id
    })).append($("<div>").addClass("dropdown-menu dropdown-menu-right").attr("aria-labelledby", id));
    this.reset = function () {
        $(this.html).find(".dropdown-menu").children().remove();
    };
    this.setIcon = function (icon) {
        $(this.html).find('button').addClass("fa " + icon);
    };
    this.addItem = function (item) {
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

/**
 * @class Card
 */
function Card(options) {
    var _Card = this;
    var defaults = {
        headerClass: "",
        bodyClass: "",
        footerClass: "",
        className: "mb-1",
        cardSizes: {
            "xs": "200px",
            "sm": "300px",
            "md": "500px",
            "lg": "800px",
            "max": "100%"
        },
        size: "sm",
        bodyContent: "",
        onShow: function onShow() {},
        onHide: function onHide() {}
    };
    this.options = _.assign(defaults, this.options);
    this.options = _.assign(this.options, options);

    this.render = function () {
        var id = _.uniqueId('card_');
        _Card.html = $("<div>").addClass("card").css("max-width", "500px").attr("id", id);
        _Card.cardContainer = _Card.html;
        _Card.setBody(_Card.options.bodyContent);
        _Card.setSize(_Card.options.size);
    };
    this.addHeader = function () {
        _Card.header = $("<div>").addClass("card-header");
        if (!_.isEmpty(this.options.headerClass)) {
            header.addClass(this.options.headerClass);
        }
        $(this.html).prepend(_Card.header);
    };
    this.addFooter = function () {
        _Card.footer = $("<div>").addClass("card-footer");
        if (!_.isEmpty(this.options.footerClass)) {
            footer.addClass(this.options.footerClass);
        }
        $(this.html).append(_Card.footer);
    };
    this.addBody = function () {
        _Card.body = $("<div>").addClass("card-body");
        if (!_.isEmpty(this.options.bodyClass)) {
            body.addClass(this.options.bodyClass);
        }
        $(this.html).append(_Card.body);
    };
    this.setHeader = function (content) {
        var header = $(this.html).find(".card-header");
        if (_.isEmpty(header)) {
            header = _Card.addHeader();
        }
        $(header).html("").append(content);
    };
    this.setFooter = function (content) {
        var footer = $(this.html).find(".card-footer");
        if (_.isEmpty(footer)) {
            footer = _Card.addFooter();
        }
        $(footer).html("").append(content);
    };
    this.setBody = function (content) {
        if (_Card.body == undefined) {
            _Card.addBody();
        }
        $(_Card.body).html("").append(content);
    };
    this.setHeaderClass = function (className) {
        $(this.html).find(".card-header").attr("class", "").addClass("card-header").addClass(className);
    };
    this.setFooterClass = function (className) {
        $(this.html).find(".card-footer").attr("class", "").addClass("card-footer").addClass(className);
    };
    this.setClass = function (className) {
        $(this.html).attr("class", "").addClass("card").addClass(className);
    };
    this.getSize = function () {
        var s = $(this.html).css("max-width");
        var r = _.findKey(this.options.cardSizes, function (o) {
            return o == s;
        });
        return r;
    };
    this.setSize = function (size) {
        var size = this.options.cardSizes[size] || "300px";
        this.options.size = size;
        $(this.html).css({
            "max-width": size,
            "width": size
        });
    };
    this.render();

    return this;
}

/**
 * @class Button
 * 
 * @param {Object} options 
 * @param {String} options.href Button href property, default: "#".
 * @param {String} options.className Button class property, default: "btn-primary".
 * @param {String} options.title Button title property, default: none.
 */
function Button(options) {
    var _Button = this;
    var id = _.uniqueId('btn_');
    var defaults = {
        href: "#",
        className: "btn-primary",
        title: undefined,
        label: ""
    };
    this.options = _.assign(this.options, defaults);
    this.options = _.assign(this.options, options);

    this.render = function () {
        this.html = $("<a>").addClass('btn').addClass(this.options.className).attr({
            id: id,
            href: this.options.href
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
        if (!_.isEmpty(this.options.icon)) {
            $(this.html).prepend($("<i>").addClass("fa fa-fw " + _Button.options.icon));
        }
    };
    this.text = function (text) {
        $(this.html).text(text);
    };
    this.setIcon = function (icon) {
        $(this.html).prepend($("<i>").addClass("fa fa-fw " + icon));
    };
    this.render();
    return this;
}
//# sourceMappingURL=bs4-js-es6.js.map
