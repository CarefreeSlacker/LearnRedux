var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Countdown = require('Countdown');

describe('Test Countdown component', () => {
    it('Shoud exist', () => {
        expect(Countdown).toExist();
    });

    describe('#setSecondsCount', () => {
        it('Should set #secondsCount and change #countdownStatus', (done) => {
            var component = TestUtils.renderIntoDocument(<Countdown/>);
            component.setSecondsCount(11);

            expect(component.state.secondsCount).toBe(11);
            expect(component.state.countdownStatus).toBe('started');

            setTimeout(() => {
                expect(component.state.secondsCount).toBe(10);
                done();
            }, 1001);
        })

        it('Should set #secondsCount to 0 after finishing', (done) => {
            var component = TestUtils.renderIntoDocument(<Countdown/>);
            component.setSecondsCount(1);

            setTimeout(() => {
                expect(component.state.secondsCount).toBe(0);
                expect(component.state.countdownStatus).toBe('cancelled');
                done();
            }, 3001);
        });

        it('Should pause contdown', (done) => {
            var component = TestUtils.renderIntoDocument(<Countdown/>);
            component.setSecondsCount(3);
            component.changeStatus('paused');

            setTimeout(() => {
                expect(component.state.secondsCount).toBe(3);
                expect(component.state.countdownStatus).toBe('paused');
                done();
            }, 2001);
        });

        it('Should cancel contdown', (done) => {
            var component = TestUtils.renderIntoDocument(<Countdown/>);
            component.setSecondsCount(10);
            component.changeStatus('cancelled');

            setTimeout(() => {
                expect(component.state.secondsCount).toBe(0);
                expect(component.state.countdownStatus).toBe('cancelled');
                done();
            }, 2001);
        });
    });
})
