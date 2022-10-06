copy .\Dockerfile ..\..\
cd ..\..\
docker build -t ui-ooh .
docker stop ooh-site
docker run -d --rm --name="ooh-site" -p 3000:3000 ui-ooh