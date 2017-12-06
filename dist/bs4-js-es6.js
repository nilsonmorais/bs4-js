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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dropdown = function () {
    function Dropdown(options) {
        _classCallCheck(this, Dropdown);

        this.id = _.uniqueId('dropdown_');
        this.html = $("<div>").addClass("dropdown").append($("<button>").addClass("btn btn-secondary btn-sm dropdown-toggle").attr({
            "data-toggle": "dropdown",
            "type": "button",
            "aria-haspopup": "true",
            "aria-expanded": "false",
            "id": this.id
        })).append($("<div>").addClass("dropdown-menu dropdown-menu-right").attr("aria-labelledby", this.id));
    }

    _createClass(Dropdown, [{
        key: 'reset',
        value: function reset() {
            $(this.html).find(".dropdown-menu").children().remove();
        }
    }, {
        key: 'setIcon',
        value: function setIcon(icon) {
            $(this.html).find('button').addClass("fa " + icon);
        }
    }, {
        key: 'addItem',
        value: function addItem(item) {
            var itemDefaults = {
                href: "#",
                title: "Item",
                header: false
            };
            item = _.assign(itemDefaults, item);
            if (item.header) {
                var _item = $("<h6>").addClass("dropdown-header").text(_item.title);
            } else {
                var _item2 = $("<a>").addClass("dropdown-item").attr("href", _item2.href).text(_item2.title);
            }
            $(this.html).find(".dropdown-menu").append(item);
            return item;
        }
    }]);

    return Dropdown;
}();

var Card = function () {
    function Card(options) {
        _classCallCheck(this, Card);

        var defaults = {
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
            onShow: function onShow() {},
            onHide: function onHide() {}
        };
        this.options = _.assign(defaults, options);
        this.id = _.uniqueId('card_');
        this.render();
    }

    _createClass(Card, [{
        key: 'render',
        value: function render() {
            this.html = $("<div>").addClass("card").css("max-width", "500px").attr("id", this.id);
            this.cardContainer = this.html;
            this.setBody(this.options.bodyContent);
            this.setSize(this.options.size);
        }
    }, {
        key: 'addHeader',
        value: function addHeader() {
            this.header = $("<div>").addClass("card-header");
            if (!_.isEmpty(this.options.headerClass)) {
                this.header.addClass(this.options.headerClass);
            }
            $(this.html).prepend(this.header);
        }
    }, {
        key: 'addFooter',
        value: function addFooter() {
            this.footer = $("<div>").addClass("card-footer");
            if (!_.isEmpty(this.options.footerClass)) {
                this.footer.addClass(this.options.footerClass);
            }
            $(this.html).append(this.footer);
        }
    }, {
        key: 'addBody',
        value: function addBody() {
            this.body = $("<div>").addClass("card-body");
            if (!_.isEmpty(this.options.bodyClass)) {
                this.body.addClass(this.options.bodyClass);
            }
            $(this.html).append(this.body);
        }
    }, {
        key: 'setHeader',
        value: function setHeader(content) {
            if (_.isEmpty(this.header)) {
                _Card.addHeader();
            }
            $(this.header).html("").append(content);
        }
    }, {
        key: 'setFooter',
        value: function setFooter(content) {
            if (_.isEmpty(this.footer)) {
                _Card.addFooter();
            }
            $(this.footer).html("").append(content);
        }
    }, {
        key: 'setBody',
        value: function setBody(content) {
            if (_.isEmpty(this.body)) {
                this.addBody();
            }
            $(this.body).html("").append(content);
        }
    }, {
        key: 'setHeaderClass',
        value: function setHeaderClass(className) {
            this.header.attr("class", "").addClass("card-header").addClass(className);
        }
    }, {
        key: 'setFooterClass',
        value: function setFooterClass(className) {
            this.footer.attr("class", "").addClass("card-footer").addClass(className);
        }
    }, {
        key: 'setClass',
        value: function setClass(className) {
            this.html.attr("class", "").addClass(this.options.className).addClass(className);
        }
    }, {
        key: 'getSize',
        value: function getSize() {
            var s = $(this.html).css("max-width");
            var r = _.findKey(this.options.cardSizes, function (o) {
                return o == s;
            });
            return r;
        }
    }, {
        key: 'setSize',
        value: function setSize(size) {
            var _size = this.options.cardSizes[size] || "300px";
            this.options.size = _size;
            $(this.html).css({
                "max-width": _size,
                "width": _size
            });
        }
    }]);

    return Card;
}();

var Button = function () {
    function Button(options) {
        _classCallCheck(this, Button);

        this.id = _.uniqueId('btn_');
        var defaults = {
            href: "#",
            className: "btn-primary",
            title: undefined,
            label: ""
        };
        this.options = _.assign(defaults, options);
        this.render();
    }

    _createClass(Button, [{
        key: 'render',
        value: function render() {
            this.html = $("<a>").addClass('btn').addClass(this.options.className).attr({
                id: this.id,
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
                $(this.html).prepend($("<i>").addClass("fa fa-fw " + this.options.icon));
            }
        }
    }, {
        key: 'text',
        value: function text(_text) {
            $(this.html).text(_text);
        }
    }, {
        key: 'setIcon',
        value: function setIcon(icon) {
            $(this.html).prepend($("<i>").addClass("fa fa-fw " + icon));
        }
    }]);

    return Button;
}();
