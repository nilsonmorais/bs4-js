'use strict';

class Dropdown {
    constructor(options) {
        this.id = _.uniqueId('dropdown_');
        this.options = _.assign({
            classNameDefault: "dropdown",
            className: "",
            buttonClassNameDefault: "btn btn-secondary btn-sm dropdown-toggle fa",
            buttonClassName: ""
        }, options);
        this.html = $("<div>").append(
            $("<button>").addClass(this.options.buttonClassNameDefault)
                .attr({
                    "data-toggle": "dropdown",
                    "type": "button",
                    "aria-haspopup": "true",
                    "aria-expanded": "false",
                    "id": this.id
                }),
            $("<div>").addClass("dropdown-menu dropdown-menu-right").attr("aria-labelledby", this.id)
        ).attr({
            "data-toggle": "tooltip",
            "data-placement": "top",
            "data-trigger": "hover",
            "title": this.options.title
        }).tooltip();

        this.setClass(this.options.className);
        this.setClassButton(this.options.buttonClassName);
        this.menu = this.html.find(".dropdown-menu");
    }
    setClass(className) {
        this.options.className = className;
        this.html.attr("class", "").addClass(this.options.classNameDefault).addClass(this.options.className);
    }
    setClassButton(className) {
        this.options.buttonClassName = className;
        this.html.find("button").attr("class", "").addClass(this.options.buttonClassNameDefault).addClass(this.options.buttonClassName);
    }
    reset() {
        this.menu.children().remove();
    }
    setIcon(icon) {
        this.setClassButton(icon);
    }
    addItem(item) {
        let _itemConfig = _.assign({
            href: "#",
            title: "Item",
            header: false,
            value: undefined
        }, item);
        let _item;
        if (_itemConfig.header) {
            _item = $("<h6>").addClass("dropdown-header").text(_itemConfig.title);
        } else {
            _item = $("<a>").addClass("dropdown-item").attr("href", _itemConfig.href).text(_itemConfig.title).attr('data-value', _itemConfig.value);
        }
        this.menu.append(_item);
        return _item;
    }
    addHeader(title) {
        let _title = title || "Header";
        let _item = this.addItem({ title: _title, header: true });
        return _item;
    }
    setDefault(selectedValue) {
        this.menu.children('a').each((key, element) => {
            // console.log(element.text, selectedValue);
            if ((element.text == selectedValue) || ($(element).attr("data-value") == selectedValue)) {
                $(element).append($("<i>").addClass("fa fa-check fa-fw text-muted"));
            }
        });
    }
}

class Card {
    constructor(options) {
        let defaults = {
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
            onShow: () => { },
            onHide: () => { },
            postCreateAction: () => { },
        }
        this.options = _.assign(defaults, options);
        this.id = _.uniqueId('card_');
        this.render();
    }

    render() {
        this.html = $("<div>").addClass(this.options.classNameDefault).addClass(this.options.className).css("max-width", "500px").attr("id", this.id);
        this.setBody(this.options.bodyContent);
        this.setSize(this.options.size);
    }
    postCreate() {
        this.options.postCreateAction(this);
    }
    addHeader() {
        this.header = $("<div>").addClass("card-header");
        if (!_.isEmpty(this.options.headerClass)) { this.header.addClass(this.options.headerClass); }
        this.html.prepend(this.header);
    }
    addFooter() {
        this.footer = $("<div>").addClass("card-footer");
        if (!_.isEmpty(this.options.footerClass)) { this.footer.addClass(this.options.footerClass); }
        this.html.append(this.footer);
    }
    addBody() {
        this.body = $("<div>").addClass("card-body");
        if (!_.isEmpty(this.options.bodyClass)) { this.body.addClass(this.options.bodyClass); }
        this.html.append(this.body);
    }
    setHeader(content) {
        if (_.isEmpty(this.header)) {
            this.addHeader();
        }
        this.header.html("").append(content);
    }
    setFooter(content) {
        if (_.isEmpty(this.footer)) {
            this.addFooter();
        }
        this.footer.html("").append(content);
    }
    setBody(content) {
        if (_.isEmpty(this.body)) { this.addBody(); }
        this.body.html("").append(content);
    }
    setHeaderClass(className) {
        this.header.attr("class", "").addClass("card-header").addClass(className);
    }
    setFooterClass(className) {
        this.footer.attr("class", "").addClass("card-footer").addClass(className);
    }
    setClass(className) {
        this.options.className = className;
        this.html.attr("class", "").addClass(this.options.classNameDefault).addClass(className);
    }
    getSize() {
        let s = this.html.css("max-width");
        let r = _.findKey(this.options.cardSizes, function (o) { return o == s });
        return r;
    }
    setSize(size) {
        let _size = size || "300px";
        this.options.size = _size;
        this.html.css({
            "max-width": _size,
            "width": _size
        });
    }
}

class Button {
    constructor(options) {
        var defaults = {
            href: "#",
            className: "btn-primary",
            title: undefined,
            label: "",
            classNameDefault: "btn pt-1",
            id: _.uniqueId('btn_')
        }
        this.options = _.assign(defaults, options);
        this.render();
    }

    render() {
        this.html = null;
        this.html = $("<a>").attr({
            id: this.options.id,
            href: this.options.href,
        });
        this.setClassName(this.options.className);
        if (!_.isEmpty(this.options.label)) {
            this.html.append(this.options.label);
        }
        if (!_.isEmpty(this.options.title)) {
            this.html.attr({
                "data-toggle": "tooltip",
                "data-placement": "top",
                "data-trigger": "hover",
                "title": this.options.title
            }).tooltip();
        }
        if (!_.isEmpty(this.options.icon)) {
            this.setIcon(this.options.icon);
        }
    }
    setIcon(icon) {
        this.options.icon = icon;
        this.html.find("i").remove();
        this.html.prepend($("<i>").addClass("fa fa-fw " + icon));
    }
    setClassName(className) {
        this.options.className = className;
        this.html.attr("class", "").addClass(this.options.classNameDefault).addClass(this.options.className);
    }
}