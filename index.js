// Make our table and require our logger and console input for later
var Table = require('cli-table'), log = require('signale'), input = require('node-console-input').getConsoleInput, gui = new Table({
    colWidths: [5, 5, 5]
});


// All possible places (in strings instead of arrays because for some reason indexOf had some issues with it)
var possible = ['0,0', '0,1', '0,2', '1,0', '1,1', '1,2', '2,0', '2,1', '2,2'];

// The table is actually an array, so we just push our values to it.
gui.push(
    ['_', '_', '_'],
    ['_', '_', '_'],
    ['_', '_', '_']
);

// Use functions for everything so it is easily repeatable
const doneCheck = (nextup) => {
    if((gui[0][0] == 'x' && gui[1][1] == 'x' && gui[2][2] == 'x') || (gui[0][2] == 'x' && gui[1][1] == 'x' && gui[2][0] == 'x') || (gui[0][0] == 'x' && gui[1][0] == 'x' && gui[2][0] == 'x') || (gui[0][1] == 'x' && gui[1][1] == 'x' && gui[2][1] == 'x') || (gui[0][2] == 'x' && gui[1][2] == 'x' && gui[2][2] == 'x') || (gui[0][0] == 'x' && gui[0][1] == 'x' && gui[0][2] == 'x') || (gui[1][0] == 'x' && gui[1][1] == 'x' && gui[1][2] == 'x') || (gui[2][0] == 'x' && gui[2][1] == 'x' && gui[2][2] == 'x')) {
        log.success('You have won! \\o/')
        process.exit()
    } else if((gui[0][0] == 'o' && gui[1][1] == 'o' && gui[2][2] == 'o') || (gui[0][2] == 'o' && gui[1][1] == 'o' && gui[2][0] == 'o') || (gui[0][0] == 'o' && gui[1][0] == 'o' && gui[2][0] == 'o') || (gui[0][1] == 'o' && gui[1][1] == 'o' && gui[2][1] == 'o') || (gui[0][2] == 'o' && gui[1][2] == 'o' && gui[2][2] == 'o') || (gui[0][0] == 'o' && gui[0][1] == 'o' && gui[0][2] == 'o') || (gui[1][0] == 'o' && gui[1][1] == 'o' && gui[1][2] == 'o') || (gui[2][0] == 'o' && gui[2][1] == 'o' && gui[2][2] == 'o')) {
        log.fatal('You have lost. :(')
    } else if(possible == []) {
        log.success('It was a draw...')
    } else {
        if(nextup == true) {
            userGo();
        } else if(nextup == false) {
            computerGo();
        }
    }
}

const computerGo = () => {
    log.pending('It is the computers go.')
    var picked = possible[Math.floor(Math.random() * possible.length)].split(',');
    gui[picked[0]][picked[1]] = "o"
    possible.splice(possible.indexOf(picked.join(',')), 1);
    log.success('Computer picked ' + picked.toString() + '.')
    console.log(gui.toString());
    doneCheck(true);
}

const userGo = () => {
    log.pending('It is your go! Enter where you want to go in the format down,right');
    console.log(gui.toString());
    var p = input('> ', false), picked = p.split(',');
    while (possible.indexOf(p) == -1) {
        log.fatal('Already picked or doesn\'t exist, please try again.')
        var p = input('> ', false), picked = p.split(',');
    }
    gui[picked[0]][picked[1]] = "x"
    possible.splice(possible.indexOf(p), 1);
    log.success('You picked ' + picked.toString() + '.');
    doneCheck(false);
}

log.pending('Welcome to Noughts + Crosses! You are Crosses and the computer is Noughts, have fun! :)');
var go = Math.floor(Math.random() * Math.floor(2));
if (go == 0) {
    userGo();
} else {
    computerGo();
}