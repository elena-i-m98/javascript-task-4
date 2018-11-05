'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

/**
 * Возвращает массив событий (текущий + его отец)
 * в правильном порядке, например, [slide.fanny, slide]
 * @param {String} event
 * @returns {String[]}
 */

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
            // let eventNotForSub = [event];
            const eventsNotForSub = Object.keys(subscriptions)
                .filter(action => action.startsWith(`${event}.`) || action === event);

            eventsNotForSub.forEach(eventToDecr => {
                if (Array.isArray(events[eventToDecr]) &&
                 events[eventToDecr].length > 0) {

                    events[eventToDecr] = events[eventToDecr]
                        .filter(student => student.context !== context);
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
                    events[event].forEach(st => {
                        st.function.call(st.name);
                    });
                    event = event.substring(0, event.indexOf('.'));
                }
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
