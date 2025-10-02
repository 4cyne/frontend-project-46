import { program } from 'commander'

program
  .name('gendiff')
  .usage('[gendiff] option')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'display help for command')

program.parse()
