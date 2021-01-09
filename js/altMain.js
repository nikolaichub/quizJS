'use strict';

import { lib } from './library.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('welcum to my console');

    // application settings
    const app = {
        plays: 0, // number of games
        library : lib, // library of questions
        timer: 1000, // time between questions
        done: false, // game flag
        form: document.getElementById('form'),
        options: document.querySelectorAll('.quiz__input'),
        count: document.getElementById('count'),
        question: document.getElementById('question'),
    }


    initQuiz(app);
    app.form.addEventListener('submit', event => {
        event.preventDefault();
        const {library, options, timer} = app;

        if (!app.done) {
            //console.log('submitted');
            let isChecked = false;
            let choice;
            let correctIfWrong;

            options.forEach(option => {
                if (option.checked) {
                    isChecked = true;
                    choice = option;
                    option.checked = false;
                }
            });

            // runs if user checked
            if (isChecked) {
                if (library[app.plays].answer == choice.value) {
                    // correct
                    choice.parentElement.classList.add('quiz__answere--correct'); // highlights correct one
                } else {
                    // wrong
                    options.forEach(option => {
                        if (library[app.plays].answer == option.value) {
                            correctIfWrong = option;
                        }
                    });
                    correctIfWrong.parentElement.classList.add('quiz__answere--correct'); // highlights correct one
                    choice.parentElement.classList.add('quiz__answere--wrong'); // highlights wrong one
                }
                setTimeout(() => {
                    // updates quiz
                    options.forEach(option => option.parentElement.classList.remove('quiz__answere--correct', 'quiz__answere--wrong'));
                    if (app.plays == library.length - 1) {
                        app.done = true;
                        return;
                    } else {
                        app.plays++;
                        initQuiz(app);
                    }
                }, timer);
                
            } else {
                alert('Choose an option first!');
            }

        } else {
            alert('End!');
        }
    })
});

function initQuiz(app) {
    const {plays, count, question, options, library} = app;

    count.textContent = plays + 1;
    question.textContent = library[plays].question;
    options.forEach((option, index) => {
        const inputValue = option;
        const label = option.nextElementSibling;
        const content = library[plays].options[index];
        label.textContent = content;
        inputValue.value = content;
    });
}