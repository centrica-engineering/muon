export function checkRunSnapshots(run) {
  return {
    name: 'check-run-snapshots',

    executeCommand({ command, session }) {
      if (command === 'run-snapshots') {
        if (typeof run === 'boolean') {
          return { run, browser: session.browser.type};
        } else if (session.browser.type === 'selenium') {
          return { run: false, browser: session.browser.type };
        } else if (session.browser.type === 'playwright') {
          return { run: true, browser: session.browser.type };
        }
      }

      return { run: false, browser: session.browser.type };
    }
  };
}
