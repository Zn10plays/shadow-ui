# UI for the shadow project

## Installation
The app is a simple next js app, the steps here are recommended, but other methods can work as well. 

#### Prerequisite
* Nginx
* node
* python
* git

#### Nginx
```bash
sudo dnf install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
# make sure to enable http and https by firewall
```

once it set up, make a config file for the service 
> sudo nano /etc/nginx/conf.d/invadev.net.conf
```conf
server {
    listen 80;
    server_name example.net www.example.net;

    location / {
        proxy_pass http://localhost:3000; # Assuming your Next.js app runs on port 3000
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

following commands to restart service
```bash
sudo nginx -t
sudo systemctl restart nginx
```

#### Setup
note this uses primsa so follow the sequence 

```bash 
git clone 
npm i 
npm db generate 
npm run build 

npx next start --hostname 0.0.0.0 # or whatever you need 
```

#### Certbot
To get ssl cert for the app
```bash
sudo dnf install epel-release -y # get linux enterprise

sudo dnf install certbot python3-certbot-nginx -y
sudo certbot --nginx -d invadev.net -d www.invadev.net 
# assuming nginx is setup
sudo systemctl list-timers | grep certbot # for auto renewal
```

### Tmux cheetsheet 
```bash
tmux new -s shadow

# to attach 
tmux a -t shadow

# to kill 
tmux kill-session -t shadow

# to deatch 
Ctrl + b => d
```