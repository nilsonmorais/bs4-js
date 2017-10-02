'use strict';

/* 

bs4-js: Bootstrap 4 elements created in js.
Dependencies: lodash, fontawesome and jquery.

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
    this.addClass = function(className) {
        $(this.html).addClass(className);
    };
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

/**
 * @class Card
 */
function Card() {
    var id = _.uniqueId('card_');
    this.html = $("<div>").addClass("card").css("max-width", "500px").attr("id", id);
    this.cardSizes = {
        "sm": "300px",
        "md": "500px",
        "lg": "800px"
    };
    this.addHeader = function() {
        var header = $("<div>").addClass("card-header");
        $(this.html).append(header);
        return header;
    };
    this.getSize = function() {
        var s = $(this.html).css("max-width");
        var r = _.findKey(this.cardSizes, function(o) { return o == s });
        return r;
    };
    this.setSize = function(size) {
        var size = this.cardSizes[size] || "300px";
        $(this.html).css("max-width", size);
    };
    this.addClass = function(className) {
        $(this.html).addClass(className);
    };
    return this;
}

/**
 * @class Button
 * 
 * @param {Object} options 
 * @param {String} options.href Button href property, default: "#".
 * @param {String} options.eleClass Button class property, default: "btn-primary".
 * @param {String} options.title Button title property, default: none.
 */
function Button(options) {
    var id = _.uniqueId('btn_');
    var defaults = {
        href: "#",
        eleClass: "btn-primary",
        title: undefined
    };
    var options = _.assign(defaults, options);

    this.html = $("<a>").addClass('btn').addClass(options.eleClass).attr({
        id: id,
        href: options.href,
    });
    if (options.title !== undefined) {
        $(this.html).attr({
            "data-toggle": "tooltip",
            "data-placement": "top",
            "title": options.title
        });
        $(this.html).tooltip();
    }
    this.text = function(text) {
        $(this.html).text(text);
    };
    this.setIcon = function(icon) {
        $(this.html).append($("<i>").addClass("fa fa-fw " + icon));
    };
    this.addClass = function(className) {
        $(this.html).addClass(className);
    };
    return this;
}