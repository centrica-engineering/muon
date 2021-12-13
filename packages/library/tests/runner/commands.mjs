export function checkRunSnapshots(run) {
  return {
    name: 'check-run-snapshots',

    executeCommand({ command, session }) {
      if (command === 'run-snapshots') {
        if (typeof run === 'boolean') {
          return run;
        }

        if (session.browser.type === 'playwright') {
          return true;
        }
      }

      return false;
    }
  };
}
