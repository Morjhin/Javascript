function interviewQuestion(job) {
    if ( job === 'officer'){
        return function (name) {
            console.log('Officer\'s question? ' + name);
        }
    } else if (job === 'blabla') {
        return function (name) {
            console.log('blabla\'s question? ' + name);
        }
    } else {
        return function (name) {
            console.log('What is your job ' + name + '?');
        }
    }
}

var  officerQuestion = interviewQuestion('officer');
var  blablaQuestion = interviewQuestion('blabla');
var  otherQuestion = interviewQuestion('mahmutella');

officerQuestion('Mete');
blablaQuestion('Müslüm');
otherQuestion('Servet');

interviewQuestion('officer' )('Aysel');