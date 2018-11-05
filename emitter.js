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
function getParentEvent(event) {
    let result = [];
    const parent = event.split('.')[0];
    if (event !== undefined) {
        result.push(event);
    }
    if (event !== undefined && parent !== undefined && parent !== event) {
        result.push(parent);
    }

    return result;
}

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
        if (events[event] === undefined) {
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
            let eventNotForSub = [event];
            for (let key of Object.keys(events)) {
                if (key.startsWith(event + '.')) {
                    eventNotForSub.push(key);
                }
            }
            for (let ev of eventNotForSub) {
                events[ev] = events[ev].filter(e => e.name !== context);
            }

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {object}
         */
        emit: function (event) {
            const studentToNotify = getParentEvent(event)
                .filter(e => events[e] !== undefined)
                .map(e => events[e]);
            studentToNotify.map(e => e.map(st => st.function.call(st.name)));

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
