module.exports = {
  apps : [{
    name   : "dating-app",
    script : "./bin/www",
    watch: true,
    env: {
      "NODE_ENV": "production",
      "PORT": "5001",
    },
    ignore_watch: [
      "node_modules","public","logs"
    ]
    // args   : "limit"
  }]
}