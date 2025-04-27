import fg from 'fast-glob';

(async () => {
  const { default: Mocha } = await import('mocha');

  const mocha = new Mocha({ timeout: 5000 });

  const files = await fg('src/**/*.test.ts', { absolute: true });

  console.log('Matched test files:', files);

  if (files.length === 0) {
    console.error('❌ No test files found.');
    process.exit(1);
  }

  for (const file of files) {
    mocha.addFile(file);
  }

  mocha.run(failures => {
    process.exitCode = failures ? 1 : 0;
  });
})();