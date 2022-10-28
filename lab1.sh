minikube start
minikube addons enable ingress
& minikube -p minikube docker-env --shell powershell | Invoke-Expression
cd .\Client
docker build -t client:01 -f Dockerfile .
cd ..
cd .\Servicesc\FacultyService
docker build -t faculties:01 -f Dockerfile .
cd ..
cd .\DisciplineSevice
docker build -t disciplines:01 -f Dockerfile .
cd ..
cd .\TeacherService
docker build -t teachers:01 -f Dockerfile .
cd ..
cd .\SpecialtyService
docker build -t specialties:01 -f Dockerfile .
cd ../..
kubectl apply -f k8s/disciplines
kubectl apply -f k8s/faculties
kubectl apply -f k8s/specialties
kubectl apply -f k8s/teachers
kubectl apply -f k8s/client
