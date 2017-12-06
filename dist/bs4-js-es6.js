'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dropdown = function () {
    function Dropdown(options) {
        _classCallCheck(this, Dropdown);

        this.id = _.uniqueId('dropdown_');
        this.options = _.assign({
            classNameDefault: "dropdown",
            className: "",
            buttonClassNameDefault: "btn btn-secondary btn-sm dropdown-toggle fa",
            buttonClassName: ""
        }, options);
        this.html = $("<div>").append($("<button>").addClass(this.options.buttonClassNameDefault).attr({
            "data-toggle": "dropdown",
            "type": "button",
            "aria-haspopup": "true",
            "aria-expanded": "false",
            "id": this.id
        }), $("<div>").addClass("dropdown-menu dropdown-menu-right").attr("aria-labelledby", this.id));
        this.setClass(this.options.className);
        this.setClassButton(this.options.buttonClassName);
        this.menu = this.html.find(".dropdown-menu");
    }

    _createClass(Dropdown, [{
        key: 'setClass',
        value: function setClass(className) {
            this.options.className = className;
            this.html.attr("class", "").addClass(this.options.classNameDefault).addClass(this.options.className);
        }
    }, {
        key: 'setClassButton',
        value: function setClassButton(className) {
            this.options.buttonClassName = className;
            this.html.find("button").attr("class", "").addClass(this.options.buttonClassNameDefault).addClass(this.options.buttonClassName);
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.menu.children().remove();
        }
    }, {
        key: 'setIcon',
        value: function setIcon(icon) {
            this.setClassButton(icon);
        }
    }, {
        key: 'addItem',
        value: function addItem(item) {
            var itemDefaults = {
                href: "#",
                title: "Item",
                header: false
            };
            var _item = _.assign(itemDefaults, item);
            if (_item.header) {
                _item = $("<h6>").addClass("dropdown-header").text(_item.title);
            } else {
                _item = $("<a>").addClass("dropdown-item").attr("href", _item.href).text(_item.title);
            }
            this.menu.append(_item);
            return _item;
        }
    }, {
        key: 'addHeader',
        value: function addHeader(title) {
            var _title = title || "Header";
            var _item = this.addItem({ title: _title, header: true });
            return _item;
        }
    }, {
        key: 'setDefault',
        value: function setDefault(title) {
            this.menu.children().each(function (element) {
                if ($(element).text() == title) {
                    $(element).append($("<i>").addClass("fa fa-check fa-fw text-muted"));
                }
            });
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
            classNameDefault: "card mb-1",
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
            this.html = $("<div>").addClass(this.options.classNameDefault).addClass(this.options.className).css("max-width", "500px").attr("id", this.id);
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
            this.options.className = className;
            this.html.attr("class", "").addClass(this.options.classNameDefault).addClass(className);
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
            var _size = size || "300px";
            this.options.size = _size;
            this.html.css({
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

        var defaults = {
            href: "#",
            className: "btn-primary",
            title: undefined,
            label: "",
            classNameDefault: "btn pt-1",
            id: _.uniqueId('btn_')
        };
        this.options = _.assign(defaults, options);
        this.render();
    }

    _createClass(Button, [{
        key: 'render',
        value: function render() {
            this.html = null;
            this.html = $("<a>").attr({
                id: this.options.id,
                href: this.options.href
            });
            this.setClassName(this.options.className);
            if (!_.isEmpty(this.options.label)) {
                this.html.append(this.options.label);
            }
            if (!_.isEmpty(this.options.title)) {
                this.html.attr({
                    "data-toggle": "tooltip",
                    "data-placement": "top",
                    "title": this.options.title
                }).tooltip();
            }
            if (!_.isEmpty(this.options.icon)) {
                this.setIcon(this.options.icon);
            }
        }
    }, {
        key: 'setIcon',
        value: function setIcon(icon) {
            this.options.icon = icon;
            this.html.find("i").remove();
            this.html.prepend($("<i>").addClass("fa fa-fw " + icon));
        }
    }, {
        key: 'setClassName',
        value: function setClassName(className) {
            this.options.className = className;
            this.html.attr("class", "").addClass(this.options.classNameDefault).addClass(this.options.className);
        }
    }]);

    return Button;
}();
