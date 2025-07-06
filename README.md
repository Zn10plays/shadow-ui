# UI for the shadow project
> deploy with tmux 

note this uses primsa so follow the sequence 

```bash 
git clone 
npm i 
npm db generate 
npm run build 

npx start --hostname=0.0.0.0 -p=80 # or whatever you need 
```

### Tmux cheetsheet 
```bash
tmux new -s shadow

# to attach 
tmux a -t shaodw

# to kill 
tmux kill-session -t shadow

# to deatch 
Ctrl + b => d
```