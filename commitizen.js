const steps = [
	{
		type: 'list',
		name: 'team',
		message: 'Select your team',
		choices: ['Burton', 'Rocket', 'Playmobile'],
		filter: (team) => {
			if (team === 'Burton') {return 'BURT';}
			if (team === 'Rocket') {return 'ROCK';}
			if (team === 'Playmobile') {return 'PLAY';}
			return '';
		}
	},
	{
		type: 'input',
		name: 'ticket',
		message: 'Input your ticket number (blank for no ticket)',
		validate: (value) => (value === '' || Number.isInteger(Number(value))) ?
			true : 'Input a number or leave blank',
		transformer: (input, answers) => `${answers.team}-${input}`
	},
	{
		type: 'list',
		name: 'type',
		message: "Select the type of change that you're committing",
		choices: [
			{value: 'feat', name: 'feat:     A new feature'},
			{value: 'fix', name: 'fix:      A bug fix'},
			{value: 'docs', name: 'docs:     Documentation only changes'},
			{value: 'style', name: 'style:    Changes that do not affect the meaning of the code'},
			{value: 'refactor',
				name: 'refactor: A code change that neither fixes a bug nor adds a feature'},
			{value: 'perf',		name: 'perf:     A code change that improves performance'},
			{value: 'test',		name: 'test:     Adding missing tests'},
			{value: 'chore',		name: 'chore:    Changes to the build process or auxiliary tools'},
			{value: 'revert',		name: 'revert:   Revert to a commit'},
			{value: 'WIP',			name: 'WIP:      Work in progress'}
		  ]
	},
	{
		type: 'input',
		message: 'Enter the scope of the change (filename, component...) (optional)',
		name: 'scope'
	},
	{
		type: 'input',
		name: 'commit',
		message: 'Enter your commit message',
		validate: (value) => value !== '' ? true : 'Commit message must not be empty',
		transformer: (input, answers) => {
			const ticket = `${`${answers.team}${answers.ticket && `-${answers.ticket}`}`}`;
			const scope = `${answers.type}${answers.scope && `(${answers.scope})`}`;
			return `${ticket} | ${scope} | ${input}`;
		}
	}
];

module.exports = {
	prompter(cz, commit) {
		cz.prompt(steps).then(function(answers) {
			const ticket = `${`${answers.team}${answers.ticket && `-${answers.ticket}`}`}`;
			const scope = `${answers.type}${answers.scope && `(${answers.scope})`}`;

			commit(`${ticket} | ${scope} | ${answers.commit}`);
		});
	}
};
