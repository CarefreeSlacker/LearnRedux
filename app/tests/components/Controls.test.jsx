var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Controls = require('Controls');

describe('Test Controls component', () => {
    it('Shoud exist', () => {
        expect(Controls).toExist();
    });

    describe('#rendert', () => {
        it('Should show Pause if status is started', () => {
            var component = TestUtils.renderIntoDocument(<Controls state={'started'}/>);
            var $el = $(ReactDOM.findDOMNode(component));
            var $controlButton = $el.find('button.button.alert');
            var $cancelButton = $el.find('button.button.secondary');

            expect($controlButton).toExist();
            expect($controlButton.text()).toBe('Pause');
            expect($cancelButton).toExist();
        })

        it('Should show Start if status is paused', () => {
            var component = TestUtils.renderIntoDocument(<Controls state={'paused'}/>);
            var $el = $(ReactDOM.findDOMNode(component));
            var $controlButton = $el.find('button.button.success');
            var $cancelButton = $el.find('button.button.secondary');

            expect($controlButton).toExist();
            expect($controlButton.text()).toBe('Start');
            expect($cancelButton).toExist();
        })
    });
})
