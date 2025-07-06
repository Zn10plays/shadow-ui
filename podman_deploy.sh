podman build -t shadow-ui .

podman run -d --name shadow-ui -p 3000:80 shadow-ui