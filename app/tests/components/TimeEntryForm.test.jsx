var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jQuery');

var TimeEntryForm = require('TimeEntryForm');

describe('TimeEntryForm', () => {
    it('Exist', () => {
        expect(TimeEntryForm).toExist()
    });

    describe('#onFormSubmit test', () => {
        it('Call method if valid data', () => {
            var spy = expect.createSpy();
            var seconds = '109';
            var countdownForm = TestUtils.renderIntoDocument(<TimeEntryForm setSecondsCount={spy}/>);
            var $el = $(ReactDOM.findDOMNode(countdownForm));

            countdownForm.refs.seconds.value = seconds;
            TestUtils.Simulate.submit($el.find('form')[0]);

            expect(spy).toHaveBeenCalledWith(parseInt(seconds, 10))
        });

        it('Not to call method if invalid data', () => {
            var spy = expect.createSpy();
            var seconds = '109a';
            var countdownForm = TestUtils.renderIntoDocument(<TimeEntryForm setSecondsCount={spy}/>);
            var $el = $(ReactDOM.findDOMNode(countdownForm));

            countdownForm.refs.seconds.value = seconds;
            TestUtils.Simulate.submit($el.find('form')[0]);

            expect(spy).toNotHaveBeenCalled()
        });
    });


});
