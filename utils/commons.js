function logsHandler(error, message) {
  if (error) throw error;
  if (message) console.log(`${"#".repeat(40)}\n${message}`);
}

module.exports = {
    logsHandler
}