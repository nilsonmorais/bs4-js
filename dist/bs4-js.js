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

class Dropdown {
    constructor(options){
        this.id = _.uniqueId('dropdown_');
        this.html = $("<div>").addClass("dropdown")
            .append(
                $("<button>").addClass("btn btn-secondary btn-sm dropdown-toggle")
                .attr({
                    "data-toggle": "dropdown",
                    "type": "button",
                    "aria-haspopup": "true",
                    "aria-expanded": "false",
                    "id": this.id
                })
            )
            .append(
                $("<div>").addClass("dropdown-menu dropdown-menu-right").attr("aria-labelledby", this.id)
            );
    }
    reset() {
        $(this.html).find(".dropdown-menu").children().remove();
    }
    setIcon(icon) {
        $(this.html).find('button').addClass("fa " + icon);
    }
    addItem(item) {
        let itemDefaults = {
            href: "#",
            title: "Item",
            header: false
        };
        item = _.assign(itemDefaults, item);
        if (item.header) {
            let item = $("<h6>").addClass("dropdown-header").text(item.title);
        } else {
            let item = $("<a>").addClass("dropdown-item").attr("href", item.href).text(item.title);
        }
        $(this.html).find(".dropdown-menu").append(item);
        return item;
    }
}

class Card {
    constructor(options){
        let defaults = {
            headerClass: "",
            bodyClass: "",
            footerClass: "",
            className: "card mb-1",
            cardSizes: {
                "xs": "200px",
                "sm": "300px",
                "md": "500px",
                "lg": "800px",
                "max": "100%"
            },
            size: "sm",
            bodyContent: "",
            onShow: function(){},
            onHide: function(){},
        }
        this.options = _.assign(defaults, options);
        this.id = _.uniqueId('card_');
        this.render();
    }

    render() {
        this.html = $("<div>").addClass("card").css("max-width", "500px").attr("id", this.id);
        this.cardContainer = this.html;
        this.setBody(this.options.bodyContent);
        this.setSize(this.options.size);
    }
    addHeader() {
        this.header = $("<div>").addClass("card-header");
        if (!_.isEmpty(this.options.headerClass)) { this.header.addClass(this.options.headerClass); }
        $(this.html).prepend(this.header);
    }
    addFooter() {
        this.footer = $("<div>").addClass("card-footer");
        if (!_.isEmpty(this.options.footerClass)) { this.footer.addClass(this.options.footerClass); }
        $(this.html).append(this.footer);
    }
    addBody() {
        this.body = $("<div>").addClass("card-body");
        if (!_.isEmpty(this.options.bodyClass)) { this.body.addClass(this.options.bodyClass); }
        $(this.html).append(this.body);
    }
    setHeader(content) {
        if (_.isEmpty(this.header)) {
            _Card.addHeader();
        }
        $(this.header).html("").append(content);
    }
    setFooter(content) {
        if (_.isEmpty(this.footer)) {
            _Card.addFooter();
        }
        $(this.footer).html("").append(content);
    }
    setBody(content) {
        if (_.isEmpty(this.body)) { this.addBody(); }
        $(this.body).html("").append(content);
    }
    setHeaderClass(className) {
        this.header.attr("class", "").addClass("card-header").addClass(className);
    }
    setFooterClass(className) {
        this.footer.attr("class", "").addClass("card-footer").addClass(className);
    }
    setClass(className) {
        this.html.attr("class", "").addClass(this.options.className).addClass(className);
    }
    getSize() {
        let s = $(this.html).css("max-width");
        let r = _.findKey(this.options.cardSizes, function(o) { return o == s });
        return r;
    }
    setSize(size) {
        let _size = this.options.cardSizes[size] || "300px";
        this.options.size = _size;
        $(this.html).css({
            "max-width": _size,
            "width": _size
        });
    }
}


class Button {
    constructor(options){
        this.id = _.uniqueId('btn_');
        var defaults = {
            href: "#",
            className: "btn-primary",
            title: undefined,
            label: ""
        }
        this.options = _.assign(defaults, options);
        this.render();
    }
   
    render() {
        this.html = $("<a>").addClass('btn').addClass(this.options.className).attr({
            id: this.id,
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
        if (!_.isEmpty(this.options.icon)) {
            $(this.html).prepend($("<i>").addClass("fa fa-fw " + this.options.icon));
        }
    }

    text(text) {
        $(this.html).text(text);
    }
    setIcon(icon) {
        $(this.html).prepend($("<i>").addClass("fa fa-fw " + icon));
    }
}