module.exports = {
  apps: [
    {
      name: "ncee-h5",
      script: '.output/server/index.mjs',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ],

  deploy: {
    production: {
      user: 'root',
      host: '43.136.71.77',
      ref: 'origin/main',
      repo: 'git@github.com:404CN/ncee-h5.git',
      path: '/www/wwwroot/ncee-h5',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
