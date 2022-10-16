minikube start
minikube addons enable ingress
cd Client
docker build -t client:01 -f Client/Dockerfile .
cd ..
cd Services/FacultyService
docker build -t faculty:01 -f Dockerfile .
cd ..
cd DisciplineSevice
docker build -t discipline:01 -f Dockerfile .
cd ..
cd TeacherService
docker build -t teacher:01 -f Dockerfile .
cd ..
cd SpecialtyService
docker build -t specialty:01 -f Dockerfile .
kubectl apply -f k8s/disciplines
kubectl apply -f k8s/faculties
kubectl apply -f k8s/specialties
kubectl apply -f k8s/teachers
kubectl apply -f k8s/client