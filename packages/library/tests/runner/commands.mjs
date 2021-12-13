export function checkRunSnapshots() {
  return {
    name: 'check-run-snapshots',

    executeCommand({ command, session }) {
      if (command === 'run-snapshots') {
        if (session.browser.type === 'playwright') {
          return true;
        }
      }

      return false;
    }
  };
}
