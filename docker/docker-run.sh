docker run -d \
  --name quant-fe \
  --network lytic-network \
  --restart always \
  -p 80:80 \
  -v $(pwd)/quant-fe/nginx.conf:/etc/nginx/nginx.conf \
  -v $(pwd)/quant-fe/mime.types:/etc/nginx/mime.types \
  -v $(pwd)/quant-fe/static:/static \
  nginx