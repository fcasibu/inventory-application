module.exports =
  (cb) =>
  (...args) =>
    cb(...args).catch(args[2]);
