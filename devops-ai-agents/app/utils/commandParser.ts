/**
 * Parse a command string into its components
 */
export const parseCommand = (input: string) => {
  const parts = input.trim().toUpperCase().split(' ');
  const command = parts[0];
  const subCommand = parts[1] || '';
  const args = parts.slice(2);

  return { command, subCommand, args };
};

export const getCommandHelp = (command: string): string[] => {
  const commandUpper = command.toUpperCase();

  switch (commandUpper) {
    case 'EC2':
      return [
        'EC2 Commands:',
        'EC2 LIST - List EC2 instances',
        'EC2 START <id> - Start EC2 instance',
        'EC2 STOP <id> - Stop EC2 instance'
      ];
    case 'DEPLOY':
      return [
        'Deployment Commands:',
        'DEPLOY GITHUB-TO-EC2 <repo> <instance> - Deploy from GitHub'
      ];
    default:
      return [
        'Available commands:',
        'HELP - Show this help',
        'CLEAR - Clear screen',
        'VERSION - System info',
        'EC2 - AWS EC2 operations',
        'DEPLOY - Deployment operations',
        'EXIT - Close terminal'
      ];
  }
};
