'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    const events = {};

    /**
     * Производит подписку объекта (студент) на событие
     * @param {String} event
     * @param {object} student
     */
    function subscribeStudentOnEvent(event, student) {
        if (!events[event]) {
            events[event] = [student];
        } else {
            events[event].push(student);
        }
    }

    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (event, context, handler) {
            const student = { name: context, function: handler };
            subscribeStudentOnEvent(event, student);

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            let eventsForUnsubcribe = [event];
            Object.keys(events).forEach(key => {
                if (key.startsWith(event + '.')) {
                    eventsForUnsubcribe.push(key);
                }
            });
            eventsForUnsubcribe.forEach(eventNotSub => {
                if (Array.isArray(events[eventNotSub]) &&
                 events[eventNotSub].length > 0) {
                    events[eventNotSub] = events[eventNotSub].filter(e => e.name !== context);
                }
            });

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {object}
         */
        emit: function (event) {
            while (event) {
                if (events[event]) {
                    events[event].forEach(student => student.function.call(student.name));
                }
                event = event.substr(0, event.lastIndexOf('.'));
            }


            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
