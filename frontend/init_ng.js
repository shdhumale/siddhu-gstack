const cp = require('child_process');
cp.execSync('node node_modules\\@angular\\cli\\bin\\ng.js new frontend --directory . --skip-git --skip-install --force --defaults', { stdio: 'inherit' });
