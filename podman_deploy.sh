podman build -t shadow-ui .

podman run --rm -d --name shadow-ui -p 3000:3000 shadow-ui