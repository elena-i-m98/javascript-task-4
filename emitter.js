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
 * проверить вход
 */
function checkArguments() {
    for (let arg = 0; arg < arguments.length; arg++) {
        if (!arguments[arg]) { // если поступившего аргумента нет, значит ввод неправильный
            throw new TypeError('Неверные входные данные');
        }
    }
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
            checkArguments(event, context, handler);
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
            checkArguments(event, context);
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
            while (event) {
                if (events[event]) {
                    events[event].forEach(st => {
                        st.function.call(st.name);
                    });
                }
                event = event.substring(0, event.indexOf('.'));
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
