
const pure = new PureCounter();
new PureCounter();


// general js project js
$(function () {
    "use strict";
    const root = document.documentElement;
    $('body').toggleClass('rightbar-hide')

    // main sidebar menu toggle js
    $('.sidebar-toggle').on('click', function () {
        $('body').toggleClass('sidebar-hide');


    });
    $('.rightbar-toggle').on('click', function () {
        $('body').toggleClass('rightbar-hide');

        // para arreglar el resize de las tablas datatable jquery
        if (typeof table !== "undefined") {
            table.columns.adjust().draw();
        }

        // toggle para el menu flotante derecho en la pantalla de servicios - toma/modificacion
        if (document.getElementById("menuRight-sidebar") !== null) {
            if (document.getElementById("menuRight-sidebar").classList.contains("menuFloatRight")) {
                document.getElementById("menuRight-sidebar").classList.remove("menuFloatRight");
            } else {
                document.getElementById("menuRight-sidebar").classList.add("menuFloatRight");
            }
        }

    });

    // main theme color setting js
    $('.choose-skin li').on('click', function () {
        const $body = $('body');
        const $this = $(this);
        const existTheme = $('.choose-skin li.active').data('theme');
        $('.choose-skin li').removeClass('active');
        $this.addClass('active');
        $body.attr('data-bvite', 'theme-' + $this.data('theme'));
    });

    // card full screen js
    const DIV_CARD = 'div.card';
    $('.card-fullscreen').on('click', function (e) {
        const $card = $(this).closest(DIV_CARD);
        $card.toggleClass('fullscreen');
        e.preventDefault();
        return false;
    });

    /** Function for remove card */
    $('[data-toggle="card-remove"]').on('click', function (e) {
        var $card = $(this).closest(DIV_CARD);
        $card.remove();
        e.preventDefault();
        return false;
    });

    // Monochrome Mode
    $('.monochrome-toggle input:checkbox').on('click', function () {
        if ($(this).is(":checked")) {
            $('body').addClass("monochrome");
        } else {
            $('body').removeClass("monochrome");
        }
    });

    // gradient active
    $('.gradient-active input:checkbox').on('click', function () {
        if ($(this).is(":checked")) {
            $('body').addClass("gradient");
        } else {
            $('body').removeClass("gradient");
        }
    });

    // radius-0
    $('.radius-toggle input:checkbox').on('click', function () {
        if ($(this).is(":checked")) {
            $('body').addClass("radius-0");
        } else {
            $('body').removeClass("radius-0");
        }
    });

    // Layout section light/dark toggle js
    function toggleTheme(selector) {
        const element = $(selector);
        if (element.attr('data-bs-theme') === 'none') {
            element.attr('data-bs-theme', 'dark');
        } else {
            element.attr('data-bs-theme', 'none');
        }
    }
    $('.brand-toggle input:checkbox').on('click', function () { toggleTheme('.brand'); });
    $('.sidebar-toggle input:checkbox').on('click', function () { toggleTheme('.sidebar'); });
    $('.header-toggle input:checkbox').on('click', function () { toggleTheme('header'); });
    $('.pheader-toggle input:checkbox').on('click', function () { toggleTheme('.page-header'); });
    $('.rightbar-toggle input:checkbox').on('click', function () { toggleTheme('.rightbar'); });

    // layout option toggle js
    $('.layout-option input:radio').on('click', function () {
        var others = $("[name='" + this.name + "']").map(function () {
            return this.value
        }).get().join(" ")
        console.log(others)
        $('body').removeClass(others).addClass(this.value)
    });
    // svg icon stroke
    $('.svg-stroke input:radio').on('click', function () {
        var others = $("[name='" + this.name + "']").map(function () {
            return this.value
        }).get().join(" ")
        console.log(others)
        $('body').removeClass(others).addClass(this.value)
    });
    // main layout border toggle js
    $('.border-toggle input:checkbox').on('click', function () {
        $('body').toggleClass('layout-border')
    });
    // sidebar icon color
    $('.svg-icon-color input:checkbox').on('click', function () {
        $('.menu-list').toggleClass('icon-color')
    });
    // card box shadow
    $('.cb-shadow input:checkbox').on('click', function () {
        $('.card').toggleClass('shadow-active')
    });

});

// Light/Dark
/*!
* Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
* Copyright 2011-2022 The Bootstrap Authors
* Licensed under the Creative Commons Attribution 3.0 Unported License.
*/

(() => {
    'use strict'

    const storedTheme = localStorage.getItem('theme')
    const getPreferredTheme = () => {
        if (storedTheme) {
            return storedTheme
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    const setTheme = function (theme) {
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark')
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    }
    setTheme(getPreferredTheme())
    const showActiveTheme = theme => {
        const activeThemeIcon = document.querySelector('.theme-icon-active use')
        const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
        const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
            element.classList.remove('active')
        })

        btnToActive.classList.add('active')
        activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (storedTheme !== 'light' || storedTheme !== 'dark') {
            setTheme(getPreferredTheme())
        }
    })
    window.addEventListener('DOMContentLoaded', () => {
        showActiveTheme(getPreferredTheme())

        document.querySelectorAll('[data-bs-theme-value]')
            .forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const theme = toggle.getAttribute('data-bs-theme-value')
                    localStorage.setItem('theme', theme)
                    setTheme(theme)
                    showActiveTheme(theme)
                })
            })
    })
})()
